(function () {
    angular.module('areaApp').component('areaList', {
        //templateUrl: './angular/components/area-list/areaList.html',
        template: `<div class="row area-list" ng-repeat="area in $ctrl.areas | orderBy: '-area.createdAt' track by area.id">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="row area-item">
            <div class="col-md-6 col-sm-6 col-xs-6">
                <div class="area-name pull-right">
                    {{area.name}}
                </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6">
                <div class="pull-left">
                    <button class="btn btn-primary" ng-click="$ctrl.editArea(area.id)">Edit</button>
                    <button class="btn btn-danger" ng-click="$ctrl.deleteArea(area.id)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>`,
        controller: AreaListController,
        bindings: {
            data: '<',
            onDeleteAreaClick: '&',
            onEditAreaClick: '&'
        }
    });

    function AreaListController() {
        var ctrl = this;

        ctrl.deleteArea = function (areaId) {
            if (typeof ctrl.onDeleteAreaClick === 'function') {
                ctrl.onDeleteAreaClick({
                    areaId: areaId
                });
            }
        };

        ctrl.editArea = function (areaId) {
            if (typeof ctrl.onEditAreaClick === 'function') {
                ctrl.onEditAreaClick({
                    areaId: areaId
                });
            }
        };

        ctrl.$onInit = function () {
            ctrl.areas = ctrl.data.areas;
        };

        ctrl.$onChanges = function (changesObj) {
            console.log('Changes', changesObj);
        };

        ctrl.$doCheck = function () {
            console.log('Digesting');
        }
    }
})();