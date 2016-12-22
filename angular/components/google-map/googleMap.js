(function () {
    angular.module('areaApp').component('googleMap', {
        template: '<div id="map"></div>',
        controller: ['lazyLoadApi', GoogleMapController],
        bindings: {
            onCreatedRectangle: '&',
            mapApi: '=',
            data: '<'
                // display rectangles 
                // deletion
                // on edita
                // focus on Edit butn click
        }
    });

    function GoogleMapController(lazyLoadApi) {
        var ctrl = this,
            lastDrawnRectangle = null,
            map = null,
            rectangles = [];

        ctrl.$onInit = function () {
            ctrl.mapApi = {};

            ctrl.mapApi.deleteLastDrawnRectangle = function () {
                if (lastDrawnRectangle) {
                    lastDrawnRectangle.setMap(null);
                }
            };

            ctrl.mapApi.deleteRectangleWithAreaId = function (areaId) {
                var foundIndex = -1;

                for (var i = 0; i < rectangles.length; i++) {
                    if (rectangles[i].areaId === areaId) {
                        foundIndex = i;
                        break;
                    }
                }
                if (foundIndex > -1) {
                    rectangles[i].rectangle.setMap(null);
                    rectangles.splice(foundIndex, 1);
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
                        editable: true,
                        draggable: true
                    }
                });
                drawingManager.setMap(map);

                // Events
                google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
                    window.rect = rectangle; // DEBUG
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
                    }
                }
            }
        };
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