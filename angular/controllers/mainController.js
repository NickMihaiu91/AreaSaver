(function () {

    var areaApp = angular.module('areaApp', ['areaServiceModule']);

    areaApp.controller('MainController', ['$scope', 'areaService', '$timeout', function ($scope, areaService, $timeout) {
        var ctrl = this;

        ctrl.data = {};
        ctrl.data.areas = areaService.getAreas();

        ctrl.addArea = function (coordinates) {
            ctrl.areaCoordinates = coordinates;
            $('#setAreaNameModal').modal();
        };

        ctrl.deleteArea = function (areaId) {
            areaService.deleteArea(areaId);
            ctrl.mapApi.deleteRectangleWithAreaId(areaId);
        };

        ctrl.editArea = function (areaId) {
            ctrl.mapApi.editRectangleWithAreaId(areaId);
        };

        ctrl.editedArea = function (areaId, newCoordinates) {
            areaService.editArea(areaId, newCoordinates);
        };

        // set area name modal 
        ctrl.saveArea = function () {
            ctrl.areaNameForm.$setSubmitted();
            ctrl.saveAreaNameError = null;

            if (ctrl.areaName) {
                var result = areaService.addArea(ctrl.areaName, ctrl.areaCoordinates);

                if (result.error)
                    return ctrl.saveAreaNameError = result.error;

                ctrl.mapApi.saveLastDrawnRectangle(result.areaId);
                $('#setAreaNameModal').modal('hide');
                ctrl.areaName = null;
                ctrl.areaCoordinates = null;
            }
        };

        ctrl.dropArea = function () {
            ctrl.areaName = null;
            ctrl.areaCoordinates = null;
            ctrl.saveAreaNameError = null;
            ctrl.areaNameForm.$setPristine();
            ctrl.areaNameForm.areaName.$setUntouched();
            ctrl.mapApi.deleteLastDrawnRectangle();
        };
    }]);
})();