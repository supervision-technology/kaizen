(function () {
    'use strict';

    //----------http factory-----------
    angular.module("AppModule")
            .factory("kaizenCommitteeViewFactory", function ($http, systemConfig) {
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



                //save kaizen
                factory.saveKaizen = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/kaizen/update-committee-kaizen";

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

    angular.module("AppModule")
            .controller("KaizenCommitteeViewController", function (kaizenCommitteeViewFactory, $scope, $rootScope, $uibModal, $uibModalStack, Notification) {

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

                //manager kaizen model
                $scope.model.managerkaizen = {
                    indexNo: null,
                    managerCost: 0,
                    managerUtilization: 0,
                    managerCreativity: 0,
                    managerSafety: 0,
                    managerQuality: 0
                };

                //committee kaizen model
                $scope.model.committeekaizen = {
                    indexNo: null,
                    committeeCost: 0,
                    committeeUtilization: 0,
                    committeeCreativity: 0,
                    committeeSafety: 0,
                    committeeQuality: 0
                };



                //-----------model function--------------
                $scope.model.reset = function () {

                };

                //validate model
                $scope.validateInput = function () {
                    if ($rootScope.kaizenIndex != null
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
                    $scope.model.committeekaizen.indexNo = $rootScope.kaizenIndex;
                    $scope.model.committeekaizen.committeeCost = $rootScope.scoreCost;
                    $scope.model.committeekaizen.committeeUtilization = $rootScope.scoreUtilization;
                    $scope.model.committeekaizen.committeeCreativity = $rootScope.scoreCreativity;
                    $scope.model.committeekaizen.committeeSafety = $rootScope.scoreSafety;
                    $scope.model.committeekaizen.committeeQuality = $rootScope.scoreQuality;

                    var details = $scope.model.committeekaizen;
                    var detailJSON = JSON.stringify(details);
                    console.log(detailJSON);
                    kaizenCommitteeViewFactory.saveKaizen(
                            detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + " finshed Successfully.");
//                                $scope.model.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };


                //----------------ui funtion--------------

                $scope.ui.selectkaizen = function (indexNo) {
                    $scope.ui.selectedDataIndex = indexNo;
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
                        controller: 'KaizenCommitteeViewController',
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
                        controller: 'KaizenCommitteeViewController',
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
                        controller: 'KaizenCommitteeViewController',
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
                        controller: 'KaizenCommitteeViewController',
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
                        controller: 'KaizenCommitteeViewController',
                        size: 'lg',
                        windowClass: 'zindex'
                    });
                };

                $scope.ui.modalPictures = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/kaizen/pictures-popup.html',
                        controller: 'KaizenCommitteeViewController',
                        size: 'xs'
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
                            $scope.model.managerkaizen.managerCost = value.managerCost;
                            $scope.model.managerkaizen.managerUtilization = value.managerUtilization;
                            $scope.model.managerkaizen.managerCreativity = value.managerCreativity;
                            $scope.model.managerkaizen.managerSafety = value.managerSafety;
                            $scope.model.managerkaizen.managerQuality = value.managerQuality;
                            $scope.ui.employeeScore();
                            $scope.ui.managerScore();
                        }
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

                $scope.ui.managerScore = function () {
                    $scope.mangCost = 30 / 5 * $scope.model.managerkaizen.managerCost;
                    $scope.mangUtilization = 15 / 5 * $scope.model.managerkaizen.managerUtilization;
                    $scope.mangCreativity = 20 / 5 * $scope.model.managerkaizen.managerCreativity;
                    $scope.mangSafety = 20 / 5 * $scope.model.managerkaizen.managerSafety;
                    $scope.mangQuality = 15 / 5 * $scope.model.managerkaizen.managerQuality;

                    $scope.mangTotalScore = $scope.mangCost + $scope.mangUtilization + $scope.mangCreativity + $scope.mangSafety + $scope.mangQuality;
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
                    kaizenCommitteeViewFactory.loadKaizen(function (data) {
                        $scope.model.kaizenList = data;
                    });

                    //load employee
                    kaizenCommitteeViewFactory.loadEmployee(function (data) {
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

                    $scope.model.type = "Implemented";
                    $scope.empTotalScore = 0;
                    $scope.mangTotalScore = 0;
                };

                $scope.ui.init();

            });


}());


