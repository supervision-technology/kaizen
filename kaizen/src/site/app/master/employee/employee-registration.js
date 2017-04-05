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
            .controller("employeeController", function (systemConfig, $scope, employeeFactory, Notification) {

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
                    email : null
                };

                //validate model
                $scope.validateInput = function () {
                    if ($scope.model.name && $scope.model.type
                            && $scope.model.epfNo && $scope.model.department && $scope.model.email) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //--------------http funtion------------

                //save employee 
                $scope.http.saveEmployee = function () {

                    var url = systemConfig.apiUrl + "/api/employee/save-employee";

                    var formData = new FormData();
                    var file = document.getElementById('file-upload').files[0];
                    var json = $scope.model;

                    formData.append("file", file);
                    formData.append("ad", JSON.stringify(json));//important: convert to JSON!

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", url);
                    xhr.send(formData);
                    
                    Notification.success("added Successfully..");
                    $scope.model = null;
                    $scope.imagemodel = null;
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

                // upload file
                $scope.imageUpload = function (event) {
                    //FileList object
                    var files = event.target.files;

                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        var reader = new FileReader();
                        reader.onload = $scope.imageIsLoaded;
                        reader.readAsDataURL(file);
                    }
                };

                $scope.imageIsLoaded = function (e) {
                    $scope.$apply(function () {
                        $scope.imagemodel = e.target.result;
                    });
                };

                $scope.showMore = function () {
                    console.log("work");
                    $scope.numLimit += 5;
                    console.log('show more triggered');
                };


                $scope.init = function () {
                    $scope.numLimit = 15;
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