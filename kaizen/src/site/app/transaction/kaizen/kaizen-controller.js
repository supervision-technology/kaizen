(function () {
    'use strict';

    //----------http factory-----------
    angular.module("AppModule")
            .factory("kaizenFactory", function ($http, systemConfig) {
                var factory = {};


                //load employee
                factory.loadEmployee = function (callback) {
                    var url = systemConfig.apiUrl + "/employee";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save kaizen
                factory.saveKaizen = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/kaizen/save-kaizen";

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
                    var url = systemConfig.apiUrl + "/document/save-image";

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
            .controller("KaizenController", function (kaizenFactory, $base64, $scope, $rootScope, $uibModal, $uibModalStack, Notification) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

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
                    $rootScope.rangeValueCost = 0;
                    $rootScope.utilization = 0;
                    $rootScope.creativity = 0;
                    $rootScope.safety = 0;
                    $rootScope.quality = 0;

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
                            && $scope.model.kaizen.description
                            && $rootScope.scoreCost > 0
                            && $rootScope.scoreCreativity > 0
                            && $rootScope.scoreQuality > 0
                            && $rootScope.scoreSafety > 0
                            && $rootScope.scoreUtilization > 0
                            ) {
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
                                $scope.model.reset();

                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };


                //----------------ui funtion--------------
                $scope.ui.setImplemented = function (name) {
                    $rootScope.type = name;
                };

                $scope.ui.setSuggestion = function (name) {
                    $rootScope.type = name;
                };


                //save function 
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveKaizen();
                    } else {
                        Notification.error("Please input details");
                    }
                };

                // upload file
                $scope.uploadFile = function (files) {
                    var imageData = $base64.encode(files);
                    console.log(imageData);
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
                    $rootScope.rangeValueCost = 30 / 5 * $rootScope.scoreCost;
                    $rootScope.utilization = 15 / 5 * $rootScope.scoreUtilization;
                    $rootScope.creativity = 20 / 5 * $rootScope.scoreCreativity;
                    $rootScope.safety = 20 / 5 * $rootScope.scoreSafety;
                    $rootScope.quality = 15 / 5 * $rootScope.scoreQuality;

                    $rootScope.totalScore = $rootScope.utilization + $rootScope.creativity + $rootScope.rangeValueCost + $rootScope.safety + $rootScope.quality;

                    console.log($rootScope.totalScore);
                };

                $scope.ui.modalOpenCost = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/kaizen/cost-popup.html',
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
                        templateUrl: 'app/transaction/kaizen/utilization-popup.html',
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
                        templateUrl: 'app/transaction/kaizen/creativity-popup.html',
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
                        templateUrl: 'app/transaction/kaizen/safety-popup.html',
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
                        templateUrl: 'app/transaction/kaizen/quality-popup.html',
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
                    if (!$rootScope.rangeValueCost) {
                        $rootScope.rangeValueCost = 0;
                    }
                    if (!$rootScope.scoreUtilization) {
                        $rootScope.scoreUtilization = 0;
                    }
                    if (!$rootScope.utilization) {
                        $rootScope.utilization = 0;
                    }
                    if (!$rootScope.scoreCreativity) {
                        $rootScope.scoreCreativity = 0;
                    }
                    if (!$rootScope.creativity) {
                        $rootScope.creativity = 0;
                    }
                    if (!$rootScope.scoreSafety) {
                        $rootScope.scoreSafety = 0;
                    }
                    if (!$rootScope.safety) {
                        $rootScope.safety = 0;
                    }
                    if (!$rootScope.quality) {
                        $rootScope.quality = 0;
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