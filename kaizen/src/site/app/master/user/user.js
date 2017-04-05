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
            .controller("userController", function ($scope, userFactory, Notification) {

                //data models 
                $scope.model = {
                    name: null,
                    password: null,
                    role: null,
                    department: null
                };

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                $scope.userList = [];

                //-------------------http funtion-------------
                $scope.http.save = function () {
                    $scope.model.department = $scope.model.department.indexNo;
                    console.log($scope.model);
                    var JSONDetail = JSON.stringify($scope.model);

                    userFactory.saveUser(
                            JSONDetail,
                            function (data) {
                                $scope.model = null;
                                Notification.success(data.indexNo + " User Save Successfully..");
                                $scope.userList.push(data);
                            });
                };

                //delete user
                $scope.http.deleteUser = function (indexNo) {
                    userFactory.deleteUser(indexNo
                            , function () {
                                var id = -1;
                                for (var i = 0; i < $scope.userList.length; i++) {
                                    if ($scope.userList[i].indexNo === indexNo) {
                                        id = i;
                                    }
                                }
                                $scope.userList.splice(id, 1);
                                Notification.success(indexNo + " - " + "User Delete Successfully.");
                            },
                            function (data) {
                            });
                };


                $scope.ui.save = function () {
                    $scope.http.save();
                };

                $scope.ui.edit = function (index, user) {
                    console.log(user);
//                     angular.forEach($scope.departmentList, function (value) {
//                        if (value.indexNo === user.department) {
//                            $scope.model.department = value.name;
//                         }
//                    });
                    $scope.model = user;
                    $scope.userList.splice(index, 1);
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
                    console.log("work");
                    $scope.numLimit += 5;
                    console.log('show more triggered');
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

