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

                $rootScope.images = [];

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
                    $rootScope.scoreCost = 0;
                    $rootScope.scoreUtilization = 0;
                    $rootScope.scoreCreativity = 0;
                    $rootScope.scoreSafety = 0;
                    $rootScope.scoreQuality = 0;
                    $scope.empCost = 0;
                    $scope.empUtilization = 0;
                    $scope.empCreativity = 0;
                    $scope.empSafety = 0;
                    $scope.empQuality = 0;
                    $rootScope.rangeValueCost = 0;
                    $rootScope.utilization = 0;
                    $rootScope.creativity = 0;
                    $rootScope.safety = 0;
                    $rootScope.quality = 0;

                    $rootScope.totalScore = 0;
                    $scope.empTotalScore = 0;
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
                    var id = -1;

                    $scope.model.managerkaizen.indexNo = $rootScope.kaizenIndex;
                    $scope.model.managerkaizen.managerCost = $rootScope.scoreCost;
                    $scope.model.managerkaizen.managerUtilization = $rootScope.scoreUtilization;
                    $scope.model.managerkaizen.managerCreativity = $rootScope.scoreCreativity;
                    $scope.model.managerkaizen.managerSafety = $rootScope.scoreSafety;
                    $scope.model.managerkaizen.managerQuality = $rootScope.scoreQuality;

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

                };

                //--------------------pop up modal funtions-------------------
                $scope.ui.modalOpenCost = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/kaizen/cost-popup.html',
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
                        templateUrl: 'app/transaction/kaizen/utilization-popup.html',
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
                        templateUrl: 'app/transaction/kaizen/creativity-popup.html',
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
                        templateUrl: 'app/transaction/kaizen/safety-popup.html',
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
                        templateUrl: 'app/transaction/kaizen/quality-popup.html',
                        controller: 'KaizenManagerViewController',
                        size: 'lg',
                        windowClass: 'zindex'
                    });
                };

                $scope.ui.modalPictures = function () {
                    angular.forEach($scope.model.documents, function (value) {
                        if (value.kaizen === $rootScope.kaizenIndex) {
                            $rootScope.images.push(value);
//                            $uibModal.open({
//                                animation: true,
//                                ariaLabelledBy: 'modal-title',
//                                ariaDescribedBy: 'modal-body',
//                                templateUrl: 'app/transaction/kaizen/pictures-popup.html',
//                                controller: 'KaizenManagerViewController',
//                                size: 'xs'
//                            });
                        }
                    });


                };


                console.log($rootScope.images);


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
                            $scope.ui.employeeScore();
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


//                $scope.ui.convertImage = function (blob) {
//                    console.log(blob);
//                    return 'data:image/png;base64,' + blob;
//                };

                $scope.ui.init = function () {


                    //laod kaizen
                    kaizenManagerViewFactory.loadKaizen(function (data) {
                        $scope.model.kaizenList = data;
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
                };

                $scope.ui.init();

            });
}());