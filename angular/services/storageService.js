(function () {
    var storageServiceModule = angular.module('storageServiceModule', []);

    storageServiceModule.factory('storageService', ['$log', function ($log) {
        function getData(keyName) {
            var data;

            if (!keyName) {
                $log.error('Storage service - no key name provided');
                return null;
            }

            data = localStorage.getItem(keyName);
            return JSON.parse(data);
        }

        function setData(keyName, data) {
            if (!keyName) {
                return $log.error('Storage service - no key name provided');
            }

            localStorage.setItem(keyName, JSON.stringify(data));
        }

        return {
            get: getData,
            set: setData
        };
    }]);
})();