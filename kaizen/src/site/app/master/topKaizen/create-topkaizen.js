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

                factory.allTopKaizen = function (company, callback) {
                    var url = systemConfig.apiUrl + "/all-top-kaizen/" + company;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                factory.loadEmployee = function (company, callback) {
                    var url = systemConfig.apiUrl + "/api/employee/" + company;
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
            .controller("TopkaizenController", function ($filter, $uibModalStack, $uibModal, Notification, systemConfig, $rootScope, $scope, TopkaizenFactory) {

                $scope.model = {};

                $scope.ui = {};

                $scope.http = {};

                $scope.topKaizenList = [];


                // ---------------- http funtion -------------------

                $scope.http.saveTopkaizen = function () {
                    if ($scope.model.date && $scope.model.epfNo) {
                        $scope.model.company = $rootScope.company;
                        $scope.model.name = $rootScope.name;
                        $scope.model.branch = $rootScope.branch;
                        $scope.model.department = $rootScope.department;
                        var json = JSON.stringify($scope.model);
                        console.log(json);
                        TopkaizenFactory.saveTopKaizen(
                                json,
                                function (data) {
                                    if (data) {
                                        Notification.success(data.indexNo + " Employee Save Successfully");
                                        $scope.imageUrl = null;
                                        $scope.topKaizenList.unshift(data);
                                        $scope.model = null;
                                        $rootScope.branch = null;
                                        $rootScope.department = null;
                                        $rootScope.name = null;
                                    } else {
                                        Notification.error("Top kaizen has been already selected for this month");
                                    }
                                });
                    } else {
                        Notification.error("Please input value");
                    }

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

                $scope.getEmployeeImage = function (epfNo, branch) {
                    var imageUrl;
                    var url = systemConfig.apiUrl + "/api/document/download-image/" + epfNo + "/" + branch;
                    $scope.imageUrl = url;
                    $scope.imagemodel = url;
                    return  imageUrl = url;
                };


                //create new top kaizen 
                $scope.keyEvent = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.ui.EmployeeByEpfNo($scope.model.epfNo);
                    }
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
                    var id = -1;
                    for (var i = 0; i < $scope.topKaizenList.length; i++) {
                        if ($scope.topKaizenList[i].indexNo === employee.indexNo) {
                            id = i;
                        }
                    }
                    $scope.topKaizenList.splice(id, 1);
                };

                //select employee
                $scope.ui.EmployeeByEpfNo = function (epfNo) {
                    $rootScope.empList = [];
                    angular.forEach($scope.employeeList, function (value) {
                        if (value.epfNo === epfNo) {
                            $rootScope.empList.push(value);
                        }
                    });

                    if ($rootScope.empList.length > 1) {
                        $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'app/master/topKaizen/employee.html',
                            controller: 'TopkaizenController',
                            scope: $scope,
                            size: 'lg',
                            windowClass: 'zindex'
                        });
                    }
                    if ($rootScope.empList.length === 1) {
                        angular.forEach($scope.employeeList, function (value) {
                            if (value.epfNo === epfNo) {
                                $scope.getEmployeeImage(epfNo, value.branch.id);
                                $rootScope.name = value.name;
                                $rootScope.branch = value.branch.indexNo;
                                $rootScope.department = value.department.name;
                            }
                        });
                    }

                };


                $scope.ui.close = function () {
                    $uibModalStack.dismissAll();
                };


                $scope.selectMoreEmployee = function (employee) {
                    $scope.getEmployeeImage(employee.epfNo, employee.branch.id);
                    $scope.ui.selectedDataIndex = employee.indexNo;
                    $rootScope.name = employee.name;
                    $rootScope.branch = employee.branch.indexNo;
                    $rootScope.department = employee.department.name;
                };


                $scope.init = function () {
//                    for (var j = new Date().getFullYear(); j > 2005; j--)
//                    {
//                        $scope.yearList.push(j);
//                    }
                    $rootScope.name = null;
                    $rootScope.department = null;
                    $rootScope.branch = null;

                    TopkaizenFactory.loadEmployee($rootScope.company,
                            function (data) {
                                $scope.employeeList = data;
                            });

                    TopkaizenFactory.allTopKaizen($rootScope.company,
                            function (data) {
                                $scope.topKaizenList = data;
                            });

                };

                $scope.init();

            });



}());


