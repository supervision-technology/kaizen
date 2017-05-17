(function () {
    angular.module("AppModule")
            .factory("TopkaizenFactory", function (systemConfig, $http) {
                var factory = {};


                factory.saveTopKaizen = function (employee, callback) {
                    var url = systemConfig.apiUrl + "/save-top-kaizen";
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

                // delete top kaizen
                factory.deleteTopKaizen = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/delete-top-kaizen/" + indexNo;
                    $http.delete(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;
            });

    angular.module("AppModule")
            .controller("TopkaizenController", function ($filter, Notification, systemConfig, $rootScope, $scope, TopkaizenFactory) {

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
                                if (data) {
                                    Notification.success(data.indexNo + " Employee Save Successfully");
                                    $scope.imageUrl = null;
                                    $scope.topKaizenList.push(data);
                                    $scope.model = null;
                                } else {
                                    Notification.error("Top kaizen has been already selected for this month");
                                }
                            });

                };

                //delete top kaizen
                $scope.http.deleteTopKaizen = function (indexNo) {
                    TopkaizenFactory.deleteTopKaizen(indexNo
                            , function () {
                                var id = -1;
                                for (var i = 0; i < $scope.topKaizenList.length; i++) {
                                    if ($scope.topKaizenList[i].indexNo === indexNo) {
                                        id = i;
                                    }
                                }
                                Notification.success(indexNo + " - " + "Delete Successfully.");
                                $scope.topKaizenList.splice(id, 1);
                            },
                            function (data) {
//                                Notification.error(data);
                            });
                };

                //------------------ ui funtion-----------------

                $scope.getEmployeeImage = function (epfNo) {
                    var imageUrl;
                    var url = systemConfig.apiUrl + "/api/document/download-image/" + epfNo + "/";
                    $scope.imageUrl = url;
                    $scope.imagemodel = url;
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

                $scope.clear = function () {
                    $scope.model = null;
                    $scope.imageUrl = null;
                };

                $scope.edit = function (employee, imageModel) {
                    $scope.model = employee;
                    $scope.imageUrl = imageModel;
                    $scope.model.date = new Date(employee.date);
                    console.log($scope.model.date);
                    var id = -1;
                    for (var i = 0; i < $scope.topKaizenList.length; i++) {
                        if ($scope.topKaizenList[i].indexNo === employee.indexNo) {
                            id = i;
                        }
                    }
                    $scope.topKaizenList.splice(id, 1);
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
//                                console.log(data)
//                                $scope.topKaizenList = data;
                            });

                };

                $scope.init();

            });



}());


