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

                // save employee
                factory.saveEmployee = function (employee, callback) {
                    var url = systemConfig.apiUrl + "/api/employee/upload-employee";
                    $http.post(url, employee)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                // delete employee
                factory.deleteEmployee = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/employee/delete-employee/" + indexNo;
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
            .controller("employeeController", function (ConfirmPane,systemConfig, $scope, employeeFactory, Notification) {

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
                    email: ""
                };

                $scope.employeeList = [];

                $scope.resetModel = function () {
                    $scope.model = {
                        name: "",
                        type: "",
                        epfNo: "",
                        department: null,
                        email: ""
                    };

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

//                    var file = document.getElementById('file-upload').files[0];
                    var json = JSON.stringify($scope.model);

//                    if (file) {
//                        var url = systemConfig.apiUrl + "/api/employee/save-employee";
//                        var formData = new FormData();
//                        formData.append("file", file);
//                        formData.append("ad", json);
//                        var xhr = new XMLHttpRequest();
//                        xhr.open("POST", url);
//                        xhr.send(formData);
//
//                        Notification.success("Employee Save Successfully");
//                        $scope.employeeList.push($scope.model);
//                        $scope.model = null;
//                        $scope.imagemodel = null;
//                    } else {
                    employeeFactory.saveEmployee(
                            json,
                            function (data) {
                                if (data) {
                                    Notification.success(data.indexNo + " Employee Save Successfully");
                                    $scope.employeeList.unshift(data);
                                    $scope.imagemodel = null;
                                    $scope.model = null;
                                } else {
                                    Notification.error("Employee Name and EPF No Duplicate..");
                                }
                            });

//                    }
                };



                //delete employee
                $scope.http.deleteEmployee = function (indexNo) {
                    ConfirmPane.primaryConfirm("Are you sure you want to delete?")
                            .confirm(function () {
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
                                        });
                            });

                };

                //get employee image
                $scope.http.getPictures = function (path) {
                    var url = systemConfig.apiUrl + "/api/document/download-image/" + path + "/";
                    $scope.imagemodel = url;
                };

                //---------------ui funtion--------------

                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveEmployee();
                    } else {
                        Notification.error("Please Input Value");
                    }
                };

                $scope.ui.clear = function () {
                    $scope.resetModel();
//                    $scope.model = null; TODO
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
                    $scope.numLimit += 5;
                };

                $scope.ui.edit = function (user) {
                    var id = -1;
                    for (var i = 0; i < $scope.employeeList.length; i++) {
                        if ($scope.employeeList[i].indexNo === user.indexNo) {
                            id = i;
                        }
                    }
                    $scope.employeeList.splice(id, 1);

                    $scope.model = user;
                    $scope.http.getPictures(user.epfNo);
                };

//                $scope.routeLabel = function (indexNo) {
//                    var label;
//                    angular.forEach($scope.departmentList, function (value) {
//                        if (value.indexNo === indexNo) {
//                            label = value.indexNo + "-" + value.name;
//                            return;
//                        }
//                    });
//                    return label;
//                };

                $scope.init = function () {
                    $scope.numLimit = 15;
                    //load employee
                    employeeFactory.loadEmployee(function (data) {
                        $scope.employeeList = data;
                    });

                    //load department
                    employeeFactory.loadDepartment(function (data) {
                        $scope.departmentList = data;
                    });

                };

                $scope.init();

            });


}());