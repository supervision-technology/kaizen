(function () {
    angular.module("AppModule")
            .factory("TopkaizenFactory", function (systemConfig, $http) {
                var factory = {};


                //load top 5 kaizen 
                factory.loadTop5Kaizen = function (year, month, callback) {
                    var url = systemConfig.apiUrl + "/top-kaizen/" + year + "/" + month;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                factory.saveTopKaizen = function (employee, callback) {
                    var url = systemConfig.apiUrl + "/api/save-topkaizen";
                    $http.post(url, employee)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                factory.allTopKaizen = function (callback) {
                    var url = systemConfig.apiUrl + "/all-top-kaizen";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                factory.loadEmployee = function (callback) {
                    var url = systemConfig.apiUrl + "/api/employee";
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
            .controller("TopkaizenController", function (Notification, systemConfig,$rootScope, $scope, TopkaizenFactory) {

                $scope.model = {};

                $scope.http = {};

                $scope.topKaizenList = [];


                // ---------------- http funtion -------------------

                $scope.http.saveTopkaizen = function () {
                    var json = JSON.stringify($scope.model);
                    console.log(json);
                    TopkaizenFactory.saveTopKaizen(
                            json,
                            function (data) {
                                Notification.success(data.indexNo + " Employee Save Successfully");
                                $scope.topKaizenList.push($scope.model);
                                $scope.imagemodel = null;
                                $scope.model = null;
                            });

                };

                //------------------ ui funtion-----------------

                $scope.getEmployeeImage = function (epfNo) {
                    var imageUrl;
                    var url = systemConfig.apiUrl + "/api/document/download-image/" + epfNo + "/";
                    $scope.imageUrl = url;
                    return  imageUrl = url;
                };


                //create new top kaizen 
                $scope.keyEvent = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.EmployeeByEpfNo($scope.model.epfNo);
                    }
                };

                $scope.EmployeeByEpfNo = function (epfNo) {
                    angular.forEach($scope.employeeList, function (value) {
                        if (value.epfNo === epfNo) {
                            $scope.getEmployeeImage(epfNo);
                            $scope.model.name = value.name;
                            $scope.model.department = value.department.name;
                        }
                    });
                };

                $scope.saveTopKaizen = function () {
                    $scope.http.saveTopkaizen();
                };



                $scope.init = function () {
//                    for (var j = new Date().getFullYear(); j > 2005; j--)
//                    {
//                        $scope.yearList.push(j);
//                    }

                    TopkaizenFactory.loadEmployee(
                            function (data) {
                                $scope.employeeList = data;
                            });

                    TopkaizenFactory.allTopKaizen(
                            function (data) {
                                console.log(data)
//                                $scope.employeeList = data;
                            });

                };

                $scope.init();

            });



}());


