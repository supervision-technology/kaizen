(function () {
    angular.module("AppModule")
            .factory("currencyFactory", function (systemConfig, $http) {
                var factory = {};

                //load summary
                factory.loadCurrency = function (callback) {
                    var url = systemConfig.apiUrl + "/all-currency";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save curency
                factory.saveCurrency = function (value,callback) {
                    var url = systemConfig.apiUrl + "/save-currency/"+value;
                    $http.post(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;
            });

    angular.module("AppModule")
            .controller("currencyController", function (Notification, $scope, $window, currencyFactory) {

                $scope.model = {
                    value :null
                };

                $scope.http = {};

                // ---------------- http funtion -------------------

                //save currency
                $scope.http.saveCurrency = function () {
//                    var json = JSON.stringify($scope.model.value);
//                    console.log(json)
                    currencyFactory.saveCurrency(
                            $scope.model.value,
                            function (data) {
                                Notification.success("Update Successfully");
                            });
                };

                $scope.init = function () {
                    currencyFactory.loadCurrency(
                            function (data) {
                                $scope.currencyList = data;
                                console.log($scope.currencyList)
                            });

                };

                $scope.init();

            });



}());


