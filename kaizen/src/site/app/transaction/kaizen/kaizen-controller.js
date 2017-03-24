(function () {
    'use strict';

    //----------http factory-----------
    angular.module("AppModule")
            .factory("kaizenFactory", function ($http, systemConfig) {
                var factory = {};


                //load employee
                factory.loadEmployee = function (callback) {
                    var url = systemConfig.apiUrl + "/api/employee";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save kaizen
                factory.saveKaizen = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/kaizen/save-kaizen";

                    $http.post(url, summary)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {
                                if (errorCallback) {
                                    errorCallback(data);
                                }
                            });
                };

                factory.uploadFile = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/document/save-image";

                    $http.post(url, summary)
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


    //-----------http controller---------
    angular.module("AppModule")
            .controller("KaizenController", function (kaizenFactory, systemConfig, $base64, $scope, $rootScope, $uibModal, $uibModalStack, Notification) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                $scope.imageModel = [];

                $scope.afterImageModel = [];

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                //kaizen model
                $scope.model.kaizen = {
                    title: null,
                    description: null,
                    type: null,
                    employee: null,
                    employeeCost: 0,
                    employeeUtilization: 0,
                    employeeCreativity: 0,
                    employeeSafety: 0,
                    employeeQuality: 0
                };
                $scope.model.document = {
                    indexNo: null,
                    path: null,
                    kaizen: null
                };

                //employee model
                $scope.model.employee = {
                    name: null,
                    epfNo: null,
                    department: null,
                    type: null
                };

                //----------------model function------------------

                //reset model
                $scope.model.reset = function () {
                    $scope.model.kaizen = {
                        title: null,
                        description: null,
                        type: null,
                        employee: null,
                        employeeCost: 0,
                        employeeUtilization: 0,
                        employeeCreativity: 0,
                        employeeSafety: 0,
                        employeeQuality: 0
                    };
                    $rootScope.scoreCost = 0;
                    $rootScope.scoreUtilization = 0;
                    $rootScope.scoreCreativity = 0;
                    $rootScope.scoreSafety = 0;
                    $rootScope.scoreQuality = 0;
                    $rootScope.totalScore = 0;
                    $scope.model.employee.epfNo = null;

                };

                $scope.model.resetEmployee = function () {
                    $scope.model.employee = {
                        name: null,
                        epfNo: null,
                        department: null,
                        type: null
                    };
                    $scope.model.kaizen.employee = null;
                };

                $scope.$watch('model.employee.epfNo', function (val) {
                    if (val === "") {
                        $scope.model.resetEmployee();
                    }
                }, true);

                $scope.$watch('model.kaizen.employee', function (val) {
                    if (val === "") {
                        $scope.model.resetEmployee();
                    }
                }, true);


                //validate model
                $scope.validateInput = function () {
                    if ($scope.model.kaizen.title
                            && $scope.model.kaizen.description) {
                        return true;
                    } else {
                        return false;
                    }
                };


                //--------------http funtion---------------
                //save model
                $scope.http.saveKaizen = function () {
                    $scope.model.kaizen.employeeCost = $rootScope.scoreCost;
                    $scope.model.kaizen.employeeUtilization = $rootScope.scoreUtilization;
                    $scope.model.kaizen.employeeCreativity = $rootScope.scoreCreativity;
                    $scope.model.kaizen.employeeSafety = $rootScope.scoreSafety;
                    $scope.model.kaizen.employeeQuality = $rootScope.scoreQuality;
                    $scope.model.kaizen.employee = $rootScope.employee;
                    $scope.model.kaizen.type = $rootScope.type;

                    var details = $scope.model.kaizen;
                    var detailJSON = JSON.stringify(details);
                    kaizenFactory.saveKaizen(
                            detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + "Kaizen Saved Successfully.");
                                $scope.uploadForm(data.indexNo);
                                $scope.imageModel = [];
                                $scope.model.reset();

                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };


                //----------------ui funtion--------------
//                $scope.ui.setImplemented = function (name) {
//                    $rootScope.type = name;
//                };
//
//                $scope.ui.setSuggestion = function (name) {
//                    $rootScope.type = name;
//                };


                //save function 
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveKaizen();
                    } else {
                        Notification.error("Please input details");
                    }
                };


                $scope.fileArray = function (files, status) {
                    if (angular.isUndefined($rootScope.fileList)) {
                        $rootScope.fileList = [[]];
                        $rootScope.fileList.push(([files, status]));
                    } else {
                        $rootScope.fileList.push(([files, status]));
                    }
                };


                //before file upload
                $scope.imageUpload = function (event, status) {
                    console.log(status);
                    //FileList object
                    var files = event.target.files;

                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        $scope.fileArray(file, status);
                        var reader = new FileReader();
                        reader.onload = $scope.imageIsLoaded;
                        reader.readAsDataURL(file);
                    }
                };

                $scope.imageIsLoaded = function (e) {
                    $scope.$apply(function () {
                        $scope.imageModel.push(e.target.result);
                    });
                };

                //after file upload
//                $scope.afterImageUpload = function (event, status) {
//                    console.log(status +  "sss" );
//                    //FileList object
//                    var files = event.target.files;
//                    console.log(files);
//
//                    for (var i = 0; i < files.length; i++) {
//                        var file = files[i];
//                        $scope.fileArray(file, status);
//                        var reader = new FileReader();
//                        reader.onload = $scope.afterUpload;
//                        reader.readAsDataURL(file);
//                    }
//                };

//                $scope.afterUpload = function (e) {
//                    $scope.$apply(function () {
//                        $scope.afterImageModel.push(e.target.result);
//                    });
//                };


                $scope.uploadForm = function (index) {
                    $rootScope.indexNo = index;
                    for (var i = 0; i < $rootScope.fileList.length; i++) {
                        var url = systemConfig.apiUrl + "/api/document/upload-image/" + $rootScope.indexNo + "/" + $rootScope.fileList[i][1];
                        var formData = new FormData();
                        formData.append("file", $rootScope.fileList[i][0]);

                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", url);
                        xhr.send(formData);

                    }
                };

                $scope.removeImage = function (indexNo) {
                    $scope.imageModel.splice(indexNo, 1);

                    var id2 = -1;
                    for (var i = 0; i < $rootScope.fileList.length; i++) {
                        if ($rootScope.fileList[i].indexNo === indexNo) {
                            id2 = i;
                        }
                    }
                    $rootScope.fileList.splice(id2, 1);

                    console.log($rootScope.fileList);
                    console.log($scope.imageModel);
                };


                // range slider funtion
                $scope.ui.costChange = function (score) {
                    $rootScope.scoreCost = score;
                    $scope.ui.totalScore();
                };

                $scope.ui.utilizationChange = function (score) {
                    $rootScope.scoreUtilization = score;
                    $scope.ui.totalScore();
                };

                $scope.ui.creativityChange = function (score) {
                    $rootScope.scoreCreativity = score;
                    $scope.ui.totalScore();
                };

                $scope.ui.safetyChange = function (score) {
                    $rootScope.scoreSafety = score;
                    $scope.ui.totalScore();
                };

                $scope.ui.qualityChange = function (score) {
                    $rootScope.scoreQuality = score;
                    $scope.ui.totalScore();
                };

                $scope.ui.totalScore = function () {
                    $rootScope.cost = 30 / 5 * $rootScope.scoreCost;
                    $rootScope.utilization = 15 / 5 * $rootScope.scoreUtilization;
                    $rootScope.creativity = 20 / 5 * $rootScope.scoreCreativity;
                    $rootScope.safety = 20 / 5 * $rootScope.scoreSafety;
                    $rootScope.quality = 15 / 5 * $rootScope.scoreQuality;

                    $rootScope.totalScore = $rootScope.utilization + $rootScope.creativity + $rootScope.cost + $rootScope.safety + $rootScope.quality;
                };

                $scope.ui.modalOpenCost = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/kaizen/dialog/cost-popup.html',
                        controller: 'KaizenController',
                        size: 'lg',
                        windowClass: 'zindex'
                    });
                };

                $scope.ui.modalOpenUtilization = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/kaizen/dialog/utilization-popup.html',
                        controller: 'KaizenController',
                        size: 'lg',
                        windowClass: 'zindex'
                    });
                };

                $scope.ui.modalOpenCreativity = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/kaizen/dialog/creativity-popup.html',
                        controller: 'KaizenController',
                        size: 'lg',
                        windowClass: 'zindex'
                    });
                };

                $scope.ui.modalOpenSafety = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/kaizen/dialog/safety-popup.html',
                        controller: 'KaizenController',
                        size: 'lg',
                        windowClass: 'zindex'
                    });
                };

                $scope.ui.modalOpenQuality = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/kaizen/dialog/quality-popup.html',
                        controller: 'KaizenController',
                        size: 'lg',
                        windowClass: 'zindex'
                    });
                };

                $scope.ui.close = function () {
                    $uibModalStack.dismissAll();
                };

                $scope.ui.selectEmployee = function (employee) {
                    $rootScope.employee = employee.indexNo;
                    $scope.model.employee.epfNo = employee.epfNo;
                    $scope.model.employee.name = employee.name;
                    $scope.model.employee.department = employee.department.name + " " + "Department";
                    $scope.model.employee.type = "(" + employee.type + ")";
                };

                $scope.ui.keyEvent = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.ui.EmployeeByEpfNo($scope.model.employee.epfNo);
                    }
                };

                $scope.ui.EmployeeByEpfNo = function (epfNo) {
                    angular.forEach($scope.model.employeeList, function (value) {
                        if (value.epfNo === epfNo) {
                            $scope.model.employee.epfNo = value.epfNo;
                            $scope.model.employee.name = value.name;
                            $scope.model.kaizen.employee = value.name;
                            $scope.model.employee.department = value.department.name + " " + "Department";
                            $scope.model.employee.type = "(" + value.type + ")";
                        }
                    });
                };

                $scope.ui.init = function () {

                    //load employee
                    kaizenFactory.loadEmployee(function (data) {
                        $scope.model.employeeList = data;
                    });

                    if (!$rootScope.totalScore) {
                        $rootScope.totalScore = 0;
                    }
                    if (!$rootScope.scoreCost) {
                        $rootScope.scoreCost = 0;
                    }
                    if (!$rootScope.scoreUtilization) {
                        $rootScope.scoreUtilization = 0;
                    }
                    if (!$rootScope.scoreCreativity) {
                        $rootScope.scoreCreativity = 0;
                    }
                    if (!$rootScope.scoreSafety) {
                        $rootScope.scoreSafety = 0;
                    }
                    if (!$rootScope.scoreQuality) {
                        $rootScope.scoreQuality = 0;
                    }

                    if (!$rootScope.type) {
                        $rootScope.type = "Implemented";
                    }
                };

                $scope.ui.init();

            });
}());