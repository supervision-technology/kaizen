(function () {
    'use strict';


    //----------http factory-----------
    angular.module("AppModule")
            .factory("kaizenManagerViewFactory", function ($http, systemConfig) {
                var factory = {};


                //load kaizen
                factory.loadKaizen = function (callback) {
                    var url = systemConfig.apiUrl + "/kaizen";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

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

                //load document
                factory.loadDocument = function (callback) {
                    var url = systemConfig.apiUrl + "/document";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //save kaizen
                factory.saveKaizen = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/kaizen/update-kaizen";

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
            .controller("KaizenManagerViewController", function (kaizenManagerViewFactory, $base64, $scope, $rootScope, $uibModal, $uibModalStack, Notification) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.ui.images = [];

                $scope.model.kaizenList = [];

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

                //manager kaizen model
                $scope.model.managerkaizen = {
                    indexNo: null,
                    managerCost: 0,
                    managerUtilization: 0,
                    managerCreativity: 0,
                    managerSafety: 0,
                    managerQuality: 0
                };


                // ------------------model funtions-------------------

                $scope.model.reset = function () {
                    $scope.model.managerkaizen = {
                        indexNo: null,
                        managerCost: 0,
                        managerUtilization: 0,
                        managerCreativity: 0,
                        managerSafety: 0,
                        managerQuality: 0
                    };
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
                    $rootScope.ManagerScoreCost = 0;
                    $rootScope.ManagerScoreUtilization = 0;
                    $rootScope.ManagerScoreCreativity = 0;
                    $rootScope.ManagerScoreSafety = 0;
                    $rootScope.ManagerScoreQuality = 0;
                    $scope.empCost = 0;
                    $scope.empUtilization = 0;
                    $scope.empCreativity = 0;
                    $scope.empSafety = 0;
                    $scope.empQuality = 0;
                    $rootScope.managerTotalScore = 0;
                    $scope.empTotalScore = 0;
                };

                $scope.ui.resetRootScope = function () {
                    $rootScope.ManagerScoreCost = 0;
                    $rootScope.ManagerScoreUtilization = 0;
                    $rootScope.ManagerScoreCreativity = 0;
                    $rootScope.ManagerScoreSafety = 0;
                    $rootScope.ManagerScoreQuality = 0;
                };

                //validate model
                $scope.validateInput = function () {
                    if ($rootScope.kaizenIndex != null
                            && $rootScope.managerTotalScore > 70) {
                        return true;
                    } else {
                        return false;
                    }
                };


                //--------------http funtion---------------
                //save model
                $scope.http.saveKaizen = function () {
                    var id = -1;

                    $scope.model.managerkaizen.indexNo = $rootScope.kaizenIndex;
                    $scope.model.managerkaizen.managerCost = $rootScope.ManagerScoreCost;
                    $scope.model.managerkaizen.managerUtilization = $rootScope.ManagerScoreUtilization;
                    $scope.model.managerkaizen.managerCreativity = $rootScope.ManagerScoreCreativity;
                    $scope.model.managerkaizen.managerSafety = $rootScope.ManagerScoreSafety;
                    $scope.model.managerkaizen.managerQuality = $rootScope.ManagerScoreQuality;

                    var details = $scope.model.managerkaizen;
                    var detailJSON = JSON.stringify(details);
                    console.log(detailJSON);
                    kaizenManagerViewFactory.saveKaizen(
                            detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + " Saved Successfully.");
                                for (var i = 0; i < $scope.model.kaizenList.length; i++) {
                                    if ($scope.model.kaizenList[i].indexNo === data.indexNo) {
                                        id = i;
                                    }
                                }
                                $scope.model.kaizenList.splice(id, 1);
                                $scope.model.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };

                //------------------ui funtion------------------------

                // range slider funtion
                $scope.ui.costChange = function (score) {
                    $rootScope.ManagerScoreCost = score;
                    $scope.ui.managerTotalScore();
                };

                $scope.ui.utilizationChange = function (score) {
                    $rootScope.ManagerScoreUtilization = score;
                    $scope.ui.managerTotalScore();
                };

                $scope.ui.creativityChange = function (score) {
                    $rootScope.ManagerScoreCreativity = score;
                    $scope.ui.managerTotalScore();
                };

                $scope.ui.safetyChange = function (score) {
                    $rootScope.ManagerScoreSafety = score;
                    $scope.ui.managerTotalScore();
                };

                $scope.ui.qualityChange = function (score) {
                    $rootScope.ManagerScoreQuality = score;
                    $scope.ui.managerTotalScore();
                };

                $scope.ui.managerTotalScore = function () {
                    $rootScope.rangeValueCost = 30 / 5 * $rootScope.ManagerScoreCost;
                    $rootScope.utilization = 15 / 5 * $rootScope.ManagerScoreUtilization;
                    $rootScope.creativity = 20 / 5 * $rootScope.ManagerScoreCreativity;
                    $rootScope.safety = 20 / 5 * $rootScope.ManagerScoreSafety;
                    $rootScope.quality = 15 / 5 * $rootScope.ManagerScoreQuality;

                    $rootScope.managerTotalScore = $rootScope.utilization + $rootScope.creativity + $rootScope.rangeValueCost + $rootScope.safety + $rootScope.quality;

                };

                //--------------------pop up modal funtions-------------------
                $scope.ui.modalOpenCost = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/manager/dialog/cost-popup.html',
                        controller: 'KaizenManagerViewController',
                        size: 'lg',
                        windowClass: 'zindex'
                    });
                };

                $scope.ui.modalOpenUtilization = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/manager/dialog/utilization-popup.html',
                        controller: 'KaizenManagerViewController',
                        size: 'lg',
                        windowClass: 'zindex'
                    });
                };

                $scope.ui.modalOpenCreativity = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/manager/dialog/creativity-popup.html',
                        controller: 'KaizenManagerViewController',
                        size: 'lg',
                        windowClass: 'zindex'
                    });
                };

                $scope.ui.modalOpenSafety = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/manager/dialog/safety-popup.html',
                        controller: 'KaizenManagerViewController',
                        size: 'lg',
                        windowClass: 'zindex'
                    });
                };

                $scope.ui.modalOpenQuality = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/manager/dialog/quality-popup.html',
                        controller: 'KaizenManagerViewController',
                        size: 'lg',
                        windowClass: 'zindex'
                    });
                };

                $scope.ui.modalPictures = function () {
                    angular.forEach($scope.model.documents, function (value) {
                        if (value.kaizen === $rootScope.kaizenIndex) {
                            $scope.ui.images.push(value);
                        }
                    });
                };


                $scope.ui.close = function () {
                    $uibModalStack.dismissAll();
                };

                $scope.ui.selectkaizen = function (indexNo) {
                    $scope.ui.selectedDataIndex = indexNo;
                    angular.forEach($scope.model.kaizenList, function (value) {
                        if (value.indexNo === indexNo) {
                            $rootScope.kaizenIndex = indexNo;
                            $scope.model.kaizen.description = value.description;
                            $scope.model.kaizen.employeeCost = value.employeeCost;
                            $scope.model.kaizen.employeeUtilization = value.employeeUtilization;
                            $scope.model.kaizen.employeeCreativity = value.employeeCreativity;
                            $scope.model.kaizen.employeeSafety = value.employeeSafety;
                            $scope.model.kaizen.employeeQuality = value.employeeQuality;

                            if (value.managerCost === null) {
                                $scope.ui.resetRootScope();
                            } else {
                                $rootScope.ManagerScoreCost = value.managerCost;
                                $rootScope.ManagerScoreUtilization = value.managerUtilization;
                                $rootScope.ManagerScoreCreativity = value.managerCreativity;
                                $rootScope.ManagerScoreSafety = value.managerSafety;
                                $rootScope.ManagerScoreQuality = value.managerQuality;
                                $scope.ui.managerTotalScore();
                            }


                            $scope.ui.employeeScore();
                        }
                    });
                };

                $scope.ui.selectComplete = function () {
                    $scope.model.kaizenList = [];
                    kaizenManagerViewFactory.loadKaizen(function (data) {
                        angular.forEach(data, function (value) {
                            if (value.managerComplete === "MANAGER_COMPLETE") {
                                $scope.model.kaizenList.push(value);
                            }
                        });

                    });
                };

                $scope.ui.selectPending = function () {
                    $scope.model.kaizenList = [];
                    $scope.ui.resetRootScope();

                    kaizenManagerViewFactory.loadKaizen(function (data) {
                        angular.forEach(data, function (value) {
                            if (value.reviewStatus === "PENDING") {
                                $scope.model.kaizenList.push(value);
                            }
                        });

                    });
                };

                $scope.ui.employeeScore = function () {
                    $scope.empCost = 30 / 5 * $scope.model.kaizen.employeeCost;
                    $scope.empUtilization = 15 / 5 * $scope.model.kaizen.employeeUtilization;
                    $scope.empCreativity = 20 / 5 * $scope.model.kaizen.employeeCreativity;
                    $scope.empSafety = 20 / 5 * $scope.model.kaizen.employeeSafety;
                    $scope.empQuality = 15 / 5 * $scope.model.kaizen.employeeQuality;

                    $scope.empTotalScore = $scope.empCost + $scope.empUtilization + $scope.empCreativity + $scope.empSafety + $scope.empQuality;

                };


                $scope.ui.getEmployee = function (indexNo) {
                    var employee = null;
                    angular.forEach($scope.model.employeeList, function (value) {
                        if (value.indexNo === indexNo) {
                            employee = value;
                            return;
                        }
                    });
                    return employee;
                };

                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveKaizen();
                    } else {
                        Notification.error("Please input details");
                    }
                };

                $scope.ui.init = function () {
                    //laod kaizen
                    kaizenManagerViewFactory.loadKaizen(function (data) {
                        angular.forEach(data, function (value) {
                            if (value.reviewStatus === "PENDING") {
                                $scope.model.kaizenList.push(value);
                            }
                        });

                    });

                    //load employee
                    kaizenManagerViewFactory.loadEmployee(function (data) {
                        $scope.model.employeeList = data;
                    });

                    //load document
                    kaizenManagerViewFactory.loadDocument(function (data) {
                        $scope.model.documents = data;
                    });

                    $scope.model.type = "Implemented";
                    $scope.empTotalScore = 0;

                    if (!$rootScope.managerTotalScore) {
                        $rootScope.managerTotalScore = 0;
                    }
                    if (!$rootScope.ManagerScoreCost) {
                        $rootScope.ManagerScoreCost = 0;
                    }
                    if (!$rootScope.ManagerScoreUtilization) {
                        $rootScope.ManagerScoreUtilization = 0;
                    }

                    if (!$rootScope.ManagerScoreCreativity) {
                        $rootScope.ManagerScoreCreativity = 0;
                    }

                    if (!$rootScope.ManagerScoreSafety) {
                        $rootScope.ManagerScoreSafety = 0;
                    }

                    if (!$rootScope.ManagerScoreQuality) {
                        $rootScope.ManagerScoreQuality = 0;
                    }
                };

                $scope.ui.init();

            });
}());