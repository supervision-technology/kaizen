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

                $scope.yearList = [];

//                $timeout(function () {
//                    $window.print();
//                    $scope.printMode = 'false';
//                }, 3000);

                $scope.print = function (summary) {
                    $scope.printMode = 'true';

                    console.log($scope.printMode);
                    $timeout(function () {
                        $window.print();
//                        var win = window.open();
//                        self.focus();
//                        win.document.open();
//                        win.document.write('<' + 'html' + '><' + 'body' + '>');
//                        win.document.write(summary);
//                        win.document.write('<' + '/body' + '><' + '/html' + '>');
//                        win.document.close();
//                        win.print();
//                        win.close();
                        $scope.printMode = 'false';
                    }, 500);

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

                };

                $scope.init();

            });



}());


