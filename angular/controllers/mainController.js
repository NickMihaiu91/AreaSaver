(function () {

    var areaApp = angular.module('areaApp', ['areaServiceModule']);

    areaApp.controller('MainController', ['$scope', 'areaService', function ($scope, areaService) {
        this.addArea = function(coordinates){
            areaService.addArea('test', coordinates);
            console.log('Added', coordinates);
        };
    }]);
})();