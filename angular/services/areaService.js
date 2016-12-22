(function () {
    var areaServiceModule = angular.module('areaServiceModule', ['uuidGeneratorServiceModule', 'storageServiceModule']);

    areaServiceModule.factory('areaService', ['$log', 'uuidGeneratorService', 'storageService', function ($log, uuidGeneratorService, storageService) {
        var _areas = [],
            STORAGE_KEY = 'area-list-storage';

        // helper function 
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
            if(!_areas || !_areas.length)
                _areas = storageService.get(STORAGE_KEY) || [];
                
            return _areas;
        }

        function addArea(name, coordinates) {
            var id = uuidGeneratorService.generateUUID(),
                newArea = {
                    id: id,
                    name: name,
                    coordinates: coordinates,
                    createdAt: new Date()
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
            storageService.set(STORAGE_KEY, _areas);
        }

        function editArea(id, newCoordinates) {
            var foundIndex = findSingleIndex(_areas, 'id', id);

            if (foundIndex > -1) {
                _areas[foundIndex].coordinates = newCoordinates;
                storageService.set(STORAGE_KEY, _areas);
            } else {
                $log.error('Edit area - invalid area id');
            }
        }

        function editAreaName(id, newName) {
            var foundIndex = findSingleIndex(_areas, 'id', id);

            if (foundIndex > -1) {
                _areas[foundIndex].name = newName;
                storageService.set(STORAGE_KEY, _areas);
            } else {
                $log.error('Edit area name - invalid area id');
            }
        }

        function deleteArea(id) {
            var foundIndex = findSingleIndex(_areas, 'id', id);

            if (foundIndex > -1) {
                _areas.splice(foundIndex, 1);
                storageService.set(STORAGE_KEY, _areas);
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