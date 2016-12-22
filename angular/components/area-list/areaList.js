(function () {
    angular.module('areaApp').component('areaList', {
        templateUrl: './angular/components/area-list/areaList.html',
        controller: ['areaService', AreaListController],
        bindings: {
        
        }
    });

    function AreaListController(areaService) {
        var ctrl = this;

        ctrl.areas = areaService.getAreas();

        ctrl.deleteArea = function (areaId) {
            areaService.deleteArea(areaId);
        };
    }
})();