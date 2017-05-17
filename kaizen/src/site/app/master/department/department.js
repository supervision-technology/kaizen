(function () {
    angular.module("AppModule")
            .factory("departmentFactory", function ($http, systemConfig) {
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

                // save department
                factory.saveDepartment = function (employee, callback) {
                    var url = systemConfig.apiUrl + "/api/employee/save-department";
                    $http.post(url, employee)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                // delete deprtment
                factory.deleteDepartment = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/employee/delete-department/" + indexNo;
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
            .controller("departmentController", function (ConfirmPane, $scope, departmentFactory, Notification) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};


                //validate model
                $scope.validateInput = function () {
                    if ($scope.model.name) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //--------------http funtion------------

                //save department 
                $scope.http.saveDepartment = function () {
                    var json = JSON.stringify($scope.model);
                    departmentFactory.saveDepartment(
                            json,
                            function (data) {
                                if (data) {
                                    Notification.success(data.indexNo + " Department Save Successfully");
                                    $scope.departmentList.unshift(data);
                                    $scope.model = null;
                                } else {
                                    Notification.error("Department Name Duplicate..");
                                }
                            });

//                    }
                };



                //delete department
                $scope.http.deleteDepartment = function (indexNo) {
                    ConfirmPane.primaryConfirm("Are you sure you want to delete?")
                            .confirm(function () {
                                departmentFactory.deleteDepartment(indexNo
                                        , function () {
                                            var id = -1;
                                            for (var i = 0; i < $scope.departmentList.length; i++) {
                                                if ($scope.departmentList[i].indexNo === indexNo) {
                                                    id = i;
                                                }
                                            }
                                            Notification.success(indexNo + " - " + "Employee Delete Successfully.");
                                            $scope.departmentList.splice(id, 1);
                                        });
                            });
                };


                //---------------ui funtion--------------

                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveDepartment();
                    } else {
                        Notification.error("Please Input Value");
                    }
                };

                $scope.ui.clear = function () {
                    $scope.model = null;
                };

                $scope.ui.edit = function (user) {
                    var id = -1;
                    for (var i = 0; i < $scope.departmentList.length; i++) {
                        if ($scope.departmentList[i].indexNo === user.indexNo) {
                            id = i;
                        }
                    }
                    $scope.departmentList.splice(id, 1);
                    $scope.model = user;
                };


                $scope.init = function () {
                    //load department
                    departmentFactory.loadDepartment(function (data) {
                        $scope.departmentList = data;
                    });

                };

                $scope.init();

            });


}());