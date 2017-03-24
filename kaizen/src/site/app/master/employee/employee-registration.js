(function () {
    angular.module("AppModule")
            .factory("employeeFactory", function ($http, systemConfig) {
                var factory = {};

                //load kaizen
                factory.loadEmployee = function (callback) {
                    var url = systemConfig.apiUrl + "/api/employee";
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

                factory.saveEmployee = function (employee, callback) {
                    var url = systemConfig.apiUrl + "/api/employee/save-employee";
                    $http.post(url, employee)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;

            });


    angular.module("AppModule")
            .controller("employeeController", function ($scope, employeeFactory, Notification) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //employee model
                $scope.model = {
                    name: "",
                    type: "",
                    epfNo: "",
                    department: null,
                    picture: null
                };

                //validate model
                $scope.validateInput = function () {
                    if ($scope.model.name && $scope.model.type
                            && $scope.model.epfNo && $scope.model.department) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //--------------http funtion------------
                
                //save employee 
                $scope.http.saveEmployee = function () {
                    var model = $scope.model;
                    var DetailJSON = JSON.stringify(model);

                    employeeFactory.saveEmployee(
                            DetailJSON,
                            function (data) {
                                Notification.success("Save Successfuly..");
                                $scope.model = null;
                            });
                };
                
                 //delete employee
                $scope.http.deleteEmployee = function (indexNo) {
                    employeeFactory.deleteEmployee(indexNo
                            , function () {
                                var id = -1;
                                for (var i = 0; i < $scope.employeeList.length; i++) {
                                    if ($scope.employeeList[i].indexNo === indexNo) {
                                        id = i;
                                    }
                                }
                                Notification.success(indexNo + " - " + "Employee Delete Successfully.");
                                $scope.employeeList.splice(id, 1);
                            },
                            function (data) {
                                Notification.error(data);
                            });
                };


                //---------------ui funtion--------------

                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveEmployee();
                    } else {
                        Notification.error("Please Input Value");
                    }
                };


                $scope.init = function () {
                    
                    //load employee
                    employeeFactory.loadEmployee(function (data) {
                        $scope.employeeList = data;
                    });
                    
                    //load department
                    employeeFactory.loadDepartment(function (data) {
                        $scope.departmentList = data;
                        console.log($scope.departmentList);
                    });
                    
                };

                $scope.init();

            });


}());