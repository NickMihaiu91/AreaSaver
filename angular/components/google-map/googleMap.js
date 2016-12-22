(function () {
    angular.module('areaApp').component('googleMap', {
        template: '<div id="map"></div>',
        controller: ['lazyLoadApi', GoogleMapController],
        bindings: {
            onCreatedRectangle: '&',
            onEditedRectangle: '&',
            mapApi: '=',
            data: '<'
        }
    });

    function GoogleMapController(lazyLoadApi) {
        var ctrl = this,
            lastDrawnRectangle = null,
            map = null,
            rectangles = [];

        ctrl.$onInit = function () {
            ctrl.mapApi = {};

            ctrl.mapApi.saveLastDrawnRectangle = function (areaId) {
                if (lastDrawnRectangle) {
                    rectangles.push({
                        rectangle: lastDrawnRectangle,
                        areaId: areaId
                    });
                    addEditListener(lastDrawnRectangle, areaId);

                    lastDrawnRectangle = null;
                }
            };

            ctrl.mapApi.deleteLastDrawnRectangle = function () {
                if (lastDrawnRectangle) {
                    lastDrawnRectangle.setMap(null);
                    lastDrawnRectangle = null;
                }
            };

            ctrl.mapApi.deleteRectangleWithAreaId = function (areaId) {
                var foundIndex = rectangles.findIndex(r => r.areaId === areaId);

                if (foundIndex > -1) {
                    rectangles[foundIndex].rectangle.setMap(null);
                    rectangles.splice(foundIndex, 1);
                }
            };

            ctrl.mapApi.editRectangleWithAreaId = function (areaId) {
                var foundIndex = rectangles.findIndex(r => r.areaId === areaId);

                if (foundIndex > -1) {
                    var rectangle = rectangles[foundIndex].rectangle,
                        editable = rectangle.getEditable();

                    rectangle.setEditable(!editable);

                    // focus
                    map.fitBounds(rectangle.getBounds());
                }
            };

            ctrl.areas = ctrl.data.areas;
        };

        ctrl.$postLink = function () {
            lazyLoadApi.then(initializeMap);
            // Initialize the map
            function initializeMap() {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: {
                        lat: -34.397,
                        lng: 150.644
                    },
                    zoom: 10
                });

                // DEBUG 
                window.map = map;

                // Try HTML5 geolocation.
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        map.setCenter(pos);
                    }, function () {
                        console.log('Blocked');
                    });
                } else {
                    // Browser doesn't support Geolocation
                    console.log('Browser doesn\'t support Geolocation');
                }

                // Drawing manager
                var drawingManager = new google.maps.drawing.DrawingManager({
                    drawingMode: google.maps.drawing.OverlayType.MARKER,
                    drawingControl: true,
                    drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: ['rectangle']
                    },
                    rectangleOptions: {
                        // editable: true,
                        // draggable: true
                    }
                });

                drawingManager.setMap(map);

                // Events
                google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
                    lastDrawnRectangle = rectangle;
                    ctrl.onCreatedRectangle({
                        coordinates: rectangle.getBounds().toJSON()
                    });
                });

                // Draw rectangles
                if (ctrl.areas && ctrl.areas.length) {
                    console.log('Drawing', ctrl.areas);
                    for (var i = 0; i < ctrl.areas.length; i++) {
                        var rectangle = new google.maps.Rectangle({
                            map: map,
                            bounds: {
                                north: ctrl.areas[i].coordinates.north,
                                south: ctrl.areas[i].coordinates.south,
                                east: ctrl.areas[i].coordinates.east,
                                west: ctrl.areas[i].coordinates.west
                            }
                        });
                        rectangles.push({
                            rectangle: rectangle,
                            areaId: ctrl.areas[i].id
                        });

                        // Register edit event
                        addEditListener(rectangle, ctrl.areas[i].id);
                    }
                }
            }
        };

        function addEditListener(rectangle, areaId) {
            google.maps.event.addListener(rectangle, 'bounds_changed', function () {
                console.log('Bounds changed.', rectangle, areaId);
                ctrl.onEditedRectangle({
                    areaId: areaId,
                    newCoordinates: rectangle.getBounds().toJSON()
                });
            });
        }
    }

    angular.module('areaApp').service('lazyLoadApi', function lazyLoadApi($window, $q) {
        function loadScript() {
            console.log('loadScript');
            var s = document.createElement('script');
            s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAgZ4DG8AIfKnWz95fjpgjJqk0A2vepCG4&libraries=drawing&callback=initMap';
            document.body.appendChild(s)
        }
        var deferred = $q.defer();

        $window.initMap = function () {
            deferred.resolve();
        };

        if ($window.attachEvent) {
            $window.attachEvent('onload', loadScript);
        } else {
            $window.addEventListener('load', loadScript, false);
        }

        return deferred.promise;
    });
})();