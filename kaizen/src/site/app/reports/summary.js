(function () {
    angular.module("AppModule")
            .factory("SummaryFactory", function (systemConfig, $http) {
                var factory = {};

                //load summary
                factory.loadSummary = function (callback) {
                    var url = systemConfig.apiUrl + "/summary";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;
            });

    angular.module("AppModule")
            .controller("SummaryController", function ($timeout, $scope, $window, SummaryFactory) {


//                $timeout(function () {
//                    $window.print();
//                    $scope.printMode = 'false';
//                }, 3000);

                $scope.print = function () {
                    $scope.printMode = 'true';

                    console.log($scope.printMode);
                    $timeout(function () {
                        $window.print();
                        $scope.printMode = 'false';
                    }, 500);

                };


                $scope.init = function () {
                    for (i = new Date().getFullYear(); i > 2005; i--)
                    {
                        $('#yearpicker').append($('<option />').val(i).html(i));
                    }



                    SummaryFactory.loadSummary(
                            function (data) {
                                $scope.summaryList = data;
                            });

                };

                $scope.init();

            });



}());


