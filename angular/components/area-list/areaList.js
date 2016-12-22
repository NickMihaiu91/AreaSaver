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
                    <button class="btn btn-primary">Edit</button>
                    <button class="btn btn-danger" ng-click="$ctrl.deleteArea(area.id)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>`,
        controller: ['$scope', AreaListController],
        bindings: {
            areas: '<',
            onDeleteAreaClick: '&'
        }
    });

    function AreaListController($scope) {
        var ctrl = this;

        ctrl.deleteArea = function (areaId) {
            if (typeof ctrl.onDeleteAreaClick === 'function') {
                ctrl.onDeleteAreaClick({
                    areaId: areaId
                });
            }
        };

        ctrl.$onChanges = function (changesObj) {
            console.log('Changes', changesObj);
        };

        ctrl.$doCheck = function () {
            console.log('Digesting');
        }

        $scope.$watch('$ctrl.areas', function(newValue) {
            console.log('watch', newValue);
          if (angular.isArray(newValue)) {
          }
        });

        // setInterval(function () {
        //     console.log('AHHAHA', ctrl.areas);
        // }, 3000)
    }
})();