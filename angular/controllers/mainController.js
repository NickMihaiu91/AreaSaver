(function () {

    var areaApp = angular.module('areaApp', ['areaServiceModule']);

    areaApp.controller('MainController', ['$scope', 'areaService', '$timeout', function ($scope, areaService, $timeout) {
        var ctrl = this;

        ctrl.areas = areaService.getAreas();

        ctrl.addArea = function (coordinates) {
            areaService.addArea('test' + Math.random().toString(), coordinates);
            console.log('Added', coordinates);
        };

        ctrl.deleteArea = function (areaId) {
            console.log('ddddelete', areaId);
            areaService.deleteArea(areaId);
        };

        // $timeout(function(){
        //     console.log('ceva', ctrl.data);
        //     ctrl.data.name ='addadada';
        //     ctrl.ceva = 'ddd';
        // }, 5000)
    }]);
})();