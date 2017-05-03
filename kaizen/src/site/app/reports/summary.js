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

                //load manager view and eveluated kaizen details
                factory.loadEveluatedDetails = function (callback) {
                    var url = systemConfig.apiUrl + "/view-count";
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
            .controller("SummaryController", function ($timeout, $scope, $window, SummaryFactory, $filter) {

                $scope.yearList = [];
                $scope.monthList = [];

                $scope.countList = [];

                $scope.print = function (summary) {
                    $scope.printMode = 'true';

                    console.log($scope.printMode);
                    $timeout(function () {
                        $window.print();
                        $scope.printMode = 'false';
                    }, 500);

                };

                $scope.changeMonth = function (month) {
                    $scope.tempList = [];
                    angular.forEach($scope.countList, function (data) {
                        var month1 = $filter('date')(data[0], 'MM');
                        if (month1 === month) {
                            $scope.tempList.push(data);
                        }
                    });

                };


                $scope.init = function () {
                    for (var i = new Date().getFullYear(); i > 2005; i--)
                    {
                        $scope.yearList.push(i);
                    }

                    SummaryFactory.loadSummary(
                            function (data) {
                                $scope.summaryList = data;
                                console.log($scope.summaryList)
                            });
                    SummaryFactory.loadEveluatedDetails(
                            function (data) {
                                $scope.countList = data;
                            });

                };

                $scope.init();

            });



}());


