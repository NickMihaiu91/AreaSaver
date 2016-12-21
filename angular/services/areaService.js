(function () {
    var areaServiceModule = angular.module('areaServiceModule', ['uuidGeneratorServiceModule']);

    areaServiceModule.factory('areaService', ['$log', 'uuidGeneratorService', function ($log, uuidGeneratorService) {
        var _areas = [{
            id: 1,
            name: 'Area 1'
        }, {
            id: 2,
            name: 'Area 2'
        }];

        // --------
        function findSingleIndex(arr, propertyName, value) {
            var foundIndex = -1;

            for (var i = 0; i < arr.length; i++) {
                if (arr[i][propertyName] === value) {
                    foundIndex = i;
                    break;
                }
            }

            return foundIndex;
        }

        function getAreas() {
            // read from local storage
            return _areas;
        }

        function addArea(name, coordinates) {
            var id = uuidGeneratorService.generateUUID(),
                newArea = {
                    id: id,
                    name: name,
                    coordinates: coordinates
                },
                foundIndex;

            // validate 
            foundIndex = findSingleIndex(_areas, 'name', name);

            if (foundIndex > -1) {
                return {
                    error: 'Duplicate name'
                };
            }

            _areas.push(newArea);
        }

        function editArea(id, newCoordinates) {
            var foundIndex = findSingleIndex(_areas, 'id', id);

            if (foundIndex > -1) {
                _areas[foundIndex].coordinates = newCoordinates;
            } else {
                $log.error('Edit area - invalid area id');
            }
        }

        function editAreaName(id, newName) {
            var foundIndex = findSingleIndex(_areas, 'id', id);

            if (foundIndex > -1) {
                _areas[foundIndex].name = newName;
            } else {
                $log.error('Edit area name - invalid area id');
            }
        }

        function deleteArea(id) {
            var foundIndex = findSingleIndex(_areas, 'id', id);

            if (foundIndex > -1) {
                _areas.splice(foundIndex, 1);
            } else {
                $log.error('Delete area - invalid area id');
            }
        }

        return {
            getAreas: getAreas,
            addArea: addArea,
            editArea: editArea,
            editAreaName: editAreaName,
            deleteArea: deleteArea
        };
    }]);
})();