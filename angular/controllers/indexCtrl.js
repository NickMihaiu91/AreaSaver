var myApp = angular.module('myApp', ['areaServiceModule']);

myApp.controller('IndexController', ['$scope', 'areaService', function ($scope, areaService) {
    $scope.areas = areaService.getAreas();

    $scope.deleteArea = function (areaId) {
        areaService.deleteArea(areaId);
    };
}]);