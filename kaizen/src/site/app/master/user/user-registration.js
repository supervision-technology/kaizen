(function () {
    'use strict';

    angular.module("AppModule")
            .factory("userFactory", function ($http, systemConfig) {
                var factory = {};

                //load users
                factory.loadUsers = function (callback) {
                    var url = systemConfig.apiUrl + "/all-user";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

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

                // save user
                factory.saveUser = function (user, callback) {
                    var url = systemConfig.apiUrl + "/save-user";
                    $http.post(url, user)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                // delete user
                factory.deleteUser = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/delete-user/" + indexNo;
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
            .controller("userController", function ($filter, $scope, userFactory, Notification, ConfirmPane, $uibModalStack, $rootScope) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                $scope.userList = [];

                //convert lovercase to uppercase 
//                $scope.$watch('model.searchName', function (val) {
//                    $scope.model.searchName = $filter('uppercase')(val);
//                }, true);

                $scope.routeLabel = function (indexNo) {
                    var label;
                    angular.forEach($scope.departmentList, function (value) {
                        if (value.indexNo === indexNo) {
                            label = value.indexNo + "-" + value.name;
                            return;
                        }
                    });
                    return label;
                };

                //-------------------http funtion-------------
                $scope.http.save = function () {
                    var JSONDetail = JSON.stringify($scope.model);

                    userFactory.saveUser(
                            JSONDetail,
                            function (data) {
                                console.log(data);
                                if (data) {
                                    $scope.model = {};
                                    Notification.success(data.indexNo + " User Save Successfully..");
                                    $scope.userList.unshift(data);

                                } else {
                                    Notification.error("User Name and Password Duplicate..");
                                }
                            });
                };

                //delete user
                $scope.http.deleteUser = function (user) {
                    ConfirmPane.primaryConfirm("Are you sure you want to delete?")
                            .confirm(function () {
                                userFactory.deleteUser(user.indexNo
                                        , function (indexNo) {
                                            var id = -1;
                                            for (var i = 0; i < $scope.userList.length; i++) {
                                                if ($scope.userList[i].indexNo === indexNo) {
                                                    id = i;
                                                }
                                            }
                                            $scope.userList.splice(id, 1);
                                            Notification.success(user.indexNo + " - " + "User Delete Successfully.");
                                        }
                                );
                            });
                };

                $scope.close = function () {
                    $uibModalStack.dismissAll();
                };

                $scope.ui.save = function () {
                    $scope.http.save();
                };

                $scope.ui.clear = function () {
                    $scope.model = null;
                };

                $scope.ui.edit = function (user) {
                    $scope.model = user;
                    var id = -1;
                    for (var i = 0; i < $scope.userList.length; i++) {
                        if ($scope.userList[i].indexNo === user.indexNo) {
                            id = i;
                        }
                    }
                    $scope.userList.splice(id, 1);
                };

                $scope.ui.getDepartment = function (indexNo) {
                    var department = null;
                    angular.forEach($scope.departmentList, function (value) {
                        if (value.indexNo === indexNo) {
                            department = value;
                            return;
                        }
                    });
                    return  department;
                };



                $scope.showMore = function () {
                    $scope.numLimit += 10;
                };

                $scope.init = function () {
                    $scope.numLimit = 20;
                    //load users
                    userFactory.loadUsers(function (data) {
                        $scope.userList = data;
                    });

                    userFactory.loadDepartment(function (data) {
                        $scope.departmentList = data;
                    });
                };

                $scope.init();


            });



}());

