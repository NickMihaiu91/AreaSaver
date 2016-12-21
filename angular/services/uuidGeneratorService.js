(function () {
    var uuidGeneratorServiceModule = angular.module('uuidGeneratorServiceModule', []);

    uuidGeneratorServiceModule.factory('uuidGeneratorService', ['$log', function ($log) {
        // improbable collision for this example -> with 3.26x10^15 version 4 RFC4122 UUIDs you have a 1-in-a-million chance of collision.
        // based on http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        function generateUUID() {
            var d = new Date().getTime();
            if (window.performance && typeof window.performance.now === "function") {
                d += performance.now(); //use high-precision timer if available
            }
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }

        return {
            generateUUID: generateUUID
        };
    }]);
})();