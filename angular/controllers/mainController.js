(function () {

    var areaApp = angular.module('areaApp', ['areaServiceModule']);

    areaApp.controller('MainController', ['$scope', 'areaService', '$timeout', function ($scope, areaService, $timeout) {
        var ctrl = this;

        ctrl.data = {};
        ctrl.data.areas = areaService.getAreas();

        ctrl.addArea = function (coordinates) {
            ctrl.areaCoordinates = coordinates;
            $('#setAreaNameModal').modal();
            console.log('Added', coordinates);
        };

        ctrl.deleteArea = function (areaId) {
            areaService.deleteArea(areaId);
        };

        // modal 
        ctrl.saveArea = function () {
            ctrl.areaNameForm.$setSubmitted();
            
            if (ctrl.areaName) {
                areaService.addArea(ctrl.areaName, ctrl.areaCoordinates);
                $('#setAreaNameModal').modal('hide');
                ctrl.areaName = null;
                ctrl.areaCoordinates = null;
            }
        };

        ctrl.dropArea = function () {
            ctrl.areaName = null;
            ctrl.areaCoordinates = null;
            ctrl.areaNameForm.$setPristine();
            ctrl.areaNameForm.areaName.$setUntouched();
            ctrl.mapApi.deleteLastDrawnRectangle();
        };

        // $timeout(function(){
        //     console.log('ceva', ctrl.data);
        //     ctrl.data.name ='addadada';
        //     ctrl.ceva = 'ddd';
        // }, 5000)
    }]);
})();