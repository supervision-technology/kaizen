(function () {
    'use strict';

    angular.module("AppModule")
            .factory("targetFactory", function ($http, systemConfig) {
                var factory = {};


                //load department
                factory.loadDepartment = function (callback) {
                    var url = systemConfig.apiUrl + "/api/employee/all-department";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                factory.loadTargetKaizen = function (callback) {
                    var url = systemConfig.apiUrl + "/api/kaizen/kaizen-target";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save target
                factory.saveTarget = function (details, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/kaizen/save-kaizen-target";

                    $http.post(url, details)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorCallback) {
                                    errorCallback(data);
                                }
                            });
                };


                return factory;

            });


    angular.module("AppModule")
            .controller("targetController", function ($rootScope, $filter, $scope, targetFactory, Notification) {

                //data models 
                $scope.model = {
                    targetYear: null,
                    target: null,
                    department: {}
                };

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                $scope.targetKaizenList = [];
                $scope.departmentList = [];
                $scope.yearList = [];

                //validate model
                $scope.validateInput = function () {
                    if ($scope.year !== null && $scope.model.target !== null
                            && $rootScope.selectedDataIndex) {
                        return true;
                    } else {
                        return false;
                    }
                };



                //-------------------http funtion-------------
                $scope.http.save = function () {
                    $scope.model.targetYear = ($filter('date')(new Date().setYear($scope.year), 'yyyy-MM-dd'));
                    var details = $scope.model;

                    var detailJSON = JSON.stringify(details);
                    targetFactory.saveTarget(
                            detailJSON,
                            function (data) {
                                $rootScope.selectedDataIndex = null;
                                $scope.model.target = null;
                                Notification.success(data.indexNo + " - " + " Saved Successfully.");
                                $scope.departments.splice($rootScope.departmentIndex, 1);
                                $scope.targetKaizenList.push(data);
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                $scope.ui.selectDepartment = function (department, index) {
                    $scope.model.department = department;
                    $rootScope.selectedDataIndex = department.indexNo;
                    $rootScope.departmentIndex = index;
                };


                //-----------------ui  funtion-----------------
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.save();
                    } else {
                        Notification.error("please input data..");
                    }
                };

                $scope.ui.edit = function (index, user) {
                    $scope.targetKaizenList.splice(index, 1);
                    $scope.model = user;
                    $rootScope.selectedDataIndex = user.department.indexNo;
//                    console.log($scope.model)
                };

                $scope.ui.changeTargetYear = function (year) {
                    $scope.departments = [];
                    $scope.targetKaizenList = [];
                    
                    targetFactory.loadTargetKaizen(function (data) {
                        $scope.targetKaizen = data;
                    });

                    targetFactory.loadDepartment(function (data) {
                        $scope.departmentList = data;
                    });

                    angular.forEach($scope.targetKaizen, function (value) {
                        var year2 = $filter('date')(new Date(value.targetYear), 'yyyy');
                        if (year2 === year) {
                            $scope.targetKaizenList.push(value);
                            angular.forEach($scope.departmentList, function (value2, key) {
                                if (value.department.name === value2.name) {
                                    $scope.departmentList.splice(key, 1);
                                } else {
//                                    $scope.departments.push(value2);
//                                    console.log(value2)
                                }
                            });
                        }

                    });
                    $scope.departments = $scope.departmentList;
                };

                $scope.showMore = function () {
                    $scope.numLimit += 5;
                };

                $scope.init = function () {
                    $scope.numLimit = 20;

                    for (var i = new Date().getFullYear(); i > 2005; i--) {
                        $scope.yearList.push(i);
                    }

                    targetFactory.loadDepartment(function (data) {
                        $scope.departmentList = data;
                    });
                    targetFactory.loadTargetKaizen(function (data) {
                        $scope.targetKaizen = data;
                    });
                };

                $scope.init();


            });



}());

