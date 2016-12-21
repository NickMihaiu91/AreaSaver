var areaServiceModule = angular.module('areaServiceModule', []);

areaServiceModule.factory('areaService', ['$log', function ($log) {
    var _areas = [{
        id: 1,
        name: 'Area 1'
    }, {
        id: 2,
        name: 'Area 2'
    }];

    function getAreas() {
        // read from local storage
        return _areas;
    }

    function addArea() {
        throw ('Not impl');
    }

    function editArea() {
        throw ('Not impl');
    }

    function deleteArea(areaId) {
        var foundIndex = -1;

        for (var i = 0; i < _areas.length; i++) {
            if (_areas[i].id === areaId) {
                foundIndex = i;
                break;
            }
        }

        if (foundIndex > -1) {
            _areas.splice(foundIndex, 1);
        }
    }

    return {
        getAreas: getAreas,
        addArea: addArea,
        editArea: editArea,
        deleteArea: deleteArea
    };
}]);