(function () {
    'use strict';

    //----------http factory-----------
    angular.module("AppModule")
            .factory("kaizenCommitteeViewFactory", function ($http, systemConfig) {
                var factory = {};


                //load kaizen
                factory.loadKaizen = function (callback) {
                    var url = systemConfig.apiUrl + "/api/kaizen";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

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

                //load document
                factory.loadDocument = function (callback) {
                    var url = systemConfig.apiUrl + "/api/document";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };



                //save kaizen
                factory.saveKaizen = function (summary, callback, errorCallback) {
                    var url = systemConfig.apiUrl + "/api/kaizen/update-committee-kaizen";

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
            .controller("KaizenCommitteeViewController", function ($http, systemConfig, kaizenCommitteeViewFactory, $scope, $filter, $rootScope, $uibModal, $uibModalStack, Notification) {

                //data models 
                $scope.model = {};


                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};


                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.model.kaizenList = [];

                $scope.ui.beforeImages = [];

                $scope.ui.documentFile = [];

                $scope.ui.afterDocumentFile = [];

                $scope.ui.afterImages = [];

                $scope.urlX = systemConfig.apiUrl + "/api/document/download-image/";

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
                    $scope.model.managerkaizen = {
                        indexNo: null,
                        managerCost: 0,
                        managerUtilization: 0,
                        managerCreativity: 0,
                        managerSafety: 0,
                        managerQuality: 0
                    };
                    $scope.model.committeekaizen = {
                        indexNo: null,
                        committeeCost: 0,
                        committeeUtilization: 0,
                        committeeCreativity: 0,
                        committeeSafety: 0,
                        committeeQuality: 0
                    };
                    $rootScope.CommitteeScoreCost = 0;
                    $rootScope.CommitteeScoreUtilization = 0;
                    $rootScope.CommitteeScoreCreativity = 0;
                    $rootScope.CommitteeScoreSafety = 0;
                    $rootScope.CommitteeScoreQuality = 0;
                    $scope.empCost = 0;
                    $scope.empUtilization = 0;
                    $scope.empCreativity = 0;
                    $scope.empSafety = 0;
                    $scope.empQuality = 0;
                    $scope.mangCost = 0;
                    $scope.mangUtilization = 0;
                    $scope.mangCreativity = 0;
                    $scope.mangSafety = 0;
                    $scope.mangQuality = 0;

                    $scope.empTotalScore = 0;
                    $scope.mangTotalScore = 0;
                    $rootScope.CommitteeTotalScore = 0;
                };

//                $scope.ui.resetRootScope = function () {
//                    $rootScope.CommitteeScoreCost = 0;
//                    $rootScope.CommitteeScoreUtilization = 0;
//                    $rootScope.CommitteeScoreCreativity = 0;
//                    $rootScope.CommitteeScoreSafety = 0;
//                    $rootScope.CommitteeScoreQuality = 0;
//                };

                //validate model
                $scope.validateInput = function () {
                    if (!$rootScope.kaizenIndex) {
                        Notification.error("please select kaizen..");
                    } else {
                        return true;
                    }
                };


                //--------------http funtion---------------
                //save model
                $scope.http.saveKaizen = function () {
                    var id = -1;

                    $scope.model.committeekaizen.indexNo = $rootScope.kaizenIndex;
                    $scope.model.committeekaizen.committeeCost = $rootScope.CommitteeScoreCost;
                    $scope.model.committeekaizen.committeeUtilization = $rootScope.CommitteeScoreUtilization;
                    $scope.model.committeekaizen.committeeCreativity = $rootScope.CommitteeScoreCreativity;
                    $scope.model.committeekaizen.committeeSafety = $rootScope.CommitteeScoreSafety;
                    $scope.model.committeekaizen.committeeQuality = $rootScope.CommitteeScoreQuality;

                    var details = $scope.model.committeekaizen;
                    var detailJSON = JSON.stringify(details);
                    kaizenCommitteeViewFactory.saveKaizen(
                            detailJSON,
                            function (data) {
                                Notification.success(data.indexNo + " - " + " finshed Successfully.");

                                for (var i = 0; i < $scope.model.kaizenList.length; i++) {
                                    if ($scope.model.kaizenList[i].indexNo === data.indexNo) {
                                        id = i;
                                    }
                                }
                                $scope.model.kaizenList.splice(id, 1);
                                $rootScope.kaizenIndex = null;
                                $scope.model.reset();
                            },
                            function (data) {
                                Notification.error(data.message);
                            }
                    );
                };


                //----------------ui funtion--------------
                // range slider funtion
                $scope.ui.costChange = function (score) {
                    $rootScope.CommitteeScoreCost = score;
                    $scope.ui.CommitteeTotalScore();
                };

                $scope.ui.utilizationChange = function (score) {
                    $rootScope.CommitteeScoreUtilization = score;
                    $scope.ui.CommitteeTotalScore();
                };

                $scope.ui.creativityChange = function (score) {
                    $rootScope.CommitteeScoreCreativity = score;
                    $scope.ui.CommitteeTotalScore();
                };

                $scope.ui.safetyChange = function (score) {
                    $rootScope.CommitteeScoreSafety = score;
                    $scope.ui.CommitteeTotalScore();
                };

                $scope.ui.qualityChange = function (score) {
                    $rootScope.CommitteeScoreQuality = score;
                    $scope.ui.CommitteeTotalScore();
                };

                $scope.ui.CommitteeTotalScore = function () {
                    $rootScope.rangeValueCost = 30 / 5 * $rootScope.CommitteeScoreCost;
                    $rootScope.utilization = 15 / 5 * $rootScope.CommitteeScoreUtilization;
                    $rootScope.creativity = 20 / 5 * $rootScope.CommitteeScoreCreativity;
                    $rootScope.safety = 20 / 5 * $rootScope.CommitteeScoreSafety;
                    $rootScope.quality = 15 / 5 * $rootScope.CommitteeScoreQuality;

                    $rootScope.CommitteeTotalScore = $rootScope.utilization + $rootScope.creativity + $rootScope.rangeValueCost + $rootScope.safety + $rootScope.quality;
                };

                $scope.ui.modalOpenCost = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/committee/dialog/cost-popup.html',
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
                        templateUrl: 'app/transaction/committee/dialog/utilization-popup.html',
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
                        templateUrl: 'app/transaction/committee/dialog/creativity-popup.html',
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
                        templateUrl: 'app/transaction/committee/dialog/safety-popup.html',
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
                        templateUrl: 'app/transaction/committee/dialog/quality-popup.html',
                        controller: 'KaizenCommitteeViewController',
                        size: 'lg',
                        windowClass: 'zindex'
                    });
                };

                $scope.ui.modalPictures = function () {
                    $scope.ui.beforeImages = [];
                    $scope.ui.afterImages = [];
                    $scope.ui.documentFile = [];
                    $scope.ui.afterDocumentFile = [];
                    angular.forEach($scope.model.documents, function (value) {
                        if (value.kaizen === $rootScope.kaizenIndex) {

                            var url = systemConfig.apiUrl + "/api/document/kaizen-image/" + value.path;
                            var temp = new Array();
                            temp = url.split(".");

                            if (value.type === 'before') {
                                if (temp[1] === "xlsx") {
                                    $scope.img = "/images/xl.png";
                                    var item = {'icon': $scope.img, 'url': url};
                                    $scope.ui.documentFile.push(item);
                                } else if (temp[1] === "xls") {
                                    $scope.img2 = "/images/xl.png";
                                    var item2 = {'icon': $scope.img2, 'url': url};
                                    $scope.ui.documentFile.push(item2);
                                } else if (temp[1] === "docx") {
                                    $scope.img3 = "/images/word.ico";
                                    var item3 = {'icon': $scope.img3, 'url': url};
                                    $scope.ui.documentFile.push(item3);
                                } else if (temp[1] === "pdf") {
                                    $scope.img4 = "/images/pdf.png";
                                    var item4 = {'icon': $scope.img4, 'url': url};
                                    $scope.ui.documentFile.push(item4);
                                } else {
                                    $scope.ui.beforeImages.push(url);
                                }

                            } else {
                                if (temp[1] === "xlsx") {
                                    $scope.img = "/images/xl.png";
                                    var p1 = {'icon': $scope.img, 'url': url};
                                    $scope.ui.afterDocumentFile.push(p1);
                                } else if (temp[1] === "xls") {
                                    $scope.img2 = "/images/xl.png";
                                    var p2 = {'icon': $scope.img2, 'url': url};
                                    $scope.ui.afterDocumentFile.push(p2);
                                } else if (temp[1] === "docx") {
                                    $scope.img3 = "/images/word.ico";
                                    var p3 = {'icon': $scope.img3, 'url': url};
                                    $scope.ui.afterDocumentFile.push(p3);
                                } else if (temp[1] === "pdf") {
                                    $scope.img4 = "/images/pdf.png";
                                    var p5 = {'icon': $scope.img4, 'url': url};
                                    $scope.ui.afterDocumentFile.push(p5);
                                } else {
                                    $scope.ui.afterImages.push(url);
                                }

                            }


//                            $http.get(url, {responseType: "arraybuffer"})
//                                    .success(function (data, status, headers) {
//                                        var data = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));
//                                        if (value.type === 'before') {
//                                            $scope.ui.beforeImages.push('data:image/png;base64,' + data);
//                                        } else {
//                                            $scope.ui.afterImages.push('data:image/png;base64,' + data);
//                                        }
//                                    })
//                                    .error(function (data, status, headers) {
//                                    });

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

                            $scope.model.kaizen.actualCost = value.actualCost;

                            $scope.model.managerkaizen.managerCost = value.managerCost;
                            $scope.model.managerkaizen.managerUtilization = value.managerUtilization;
                            $scope.model.managerkaizen.managerCreativity = value.managerCreativity;
                            $scope.model.managerkaizen.managerSafety = value.managerSafety;
                            $scope.model.managerkaizen.managerQuality = value.managerQuality;

                            if (value.committeeComplete === 'COMMITTEE_COMPLETE') {
                                $rootScope.CommitteeScoreCost = value.committeeCost;
                                $rootScope.CommitteeScoreUtilization = value.committeeUtilization;
                                $rootScope.CommitteeScoreCreativity = value.committeeCreativity;
                                $rootScope.CommitteeScoreSafety = value.committeeSafety;
                                $rootScope.CommitteeScoreQuality = value.committeeQuality;
                            } else {
                                $rootScope.CommitteeScoreCost = value.managerCost;
                                $rootScope.CommitteeScoreUtilization = value.managerUtilization;
                                $rootScope.CommitteeScoreCreativity = value.managerCreativity;
                                $rootScope.CommitteeScoreSafety = value.managerSafety;
                                $rootScope.CommitteeScoreQuality = value.managerQuality;
                            }


                            $scope.ui.CommitteeTotalScore();
                            $scope.ui.employeeScore();
                            $scope.ui.managerScore();

                        }
                    });
                };

                $scope.ui.selectComplete = function () {
                    $scope.model.kaizenList = [];
                    $scope.model.reset();
                    document.getElementById("saveBtn").disabled = true;
                    kaizenCommitteeViewFactory.loadKaizen(function (data) {
                        angular.forEach(data, function (value) {
                            if (value.committeeComplete === "COMMITTEE_COMPLETE") {
                                console.log(data)
                                $scope.model.kaizenList.push(value);
                            }
                        });

                    });
                };

                $scope.ui.selectPending = function () {
                    document.getElementById("saveBtn").disabled = false;
                    $scope.model.kaizenList = [];
                    $scope.model.reset();
                    kaizenCommitteeViewFactory.loadKaizen(function (data) {
                        angular.forEach(data, function (value) {
                            if (value.reviewStatus === "MANAGER_VIEW" && value.committeeComplete !== "COMMITTEE_COMPLETE") {
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
                            var url = systemConfig.apiUrl + "/api/document/download-image/" + value.epfNo + "/";
                            $scope.imageUrl = url;
                            employee = value;
                            return;
                        }
                    });
                    return employee;
                };

                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveKaizen();
                    }
                };

                $scope.ui.filterValue = function (obj) {
                    return $filter('date')(obj.introduceDate, 'MM/yyyy') === $filter('date')($scope.model.date, 'MM/yyyy');
                };

                $scope.onSelect = function ($item, $model, $label) {
                    var url = systemConfig.apiUrl + "/api/kaizen/department-kaizen/" + $model.indexNo;

                    $http.get(url)
                            .success(function (data) {
                                $scope.model.kaizenList = [];
                                angular.forEach(data, function (value) {
                                    if (value.reviewStatus === "MANAGER_VIEW") {
                                        $scope.model.kaizenList.push(value);
                                    }
                                });
                            });
                };

                $scope.$watch('model.department', function (val) {
                    if (val === "") {
                        $scope.model.kaizenList = [];
                        kaizenCommitteeViewFactory.loadKaizen(function (data) {
                            angular.forEach(data, function (value) {
                                if (value.reviewStatus === "MANAGER_VIEW") {
                                    $scope.model.kaizenList.push(value);
                                }
                            });
                        });
                    }
                }, true);

                //load scroll
                $scope.showMore = function () {
                    $scope.numLimit += 5;
                };


                $scope.ui.init = function () {
                    $scope.numLimit = 10;
                    //set date
                    $scope.model.date = new Date();

                    //laod kaizen
                    kaizenCommitteeViewFactory.loadKaizen(function (data) {
                        angular.forEach(data, function (value) {
                            if (value.reviewStatus === "MANAGER_VIEW" && value.committeeComplete !== "COMMITTEE_COMPLETE") {
                                $scope.model.kaizenList.push(value);
                            }
                        });
                    });

                    //load employee
                    kaizenCommitteeViewFactory.loadEmployee(function (data) {
                        $scope.model.employeeList = data;
                    });

                    //load department
                    kaizenCommitteeViewFactory.loadDepartment(function (data) {
                        $scope.model.departmentList = data;
                    });

                    //load document
                    kaizenCommitteeViewFactory.loadDocument(function (data) {
                        $scope.model.documents = data;
                    });

                    if (!$rootScope.CommitteeTotalScore) {
                        $rootScope.CommitteeTotalScore = 0;
                    }
                    if (!$rootScope.CommitteeScoreCost) {
                        $rootScope.CommitteeScoreCost = 0;
                    }
                    if (!$rootScope.CommitteeScoreUtilization) {
                        $rootScope.CommitteeScoreUtilization = 0;
                    }
                    if (!$rootScope.CommitteeScoreCreativity) {
                        $rootScope.CommitteeScoreCreativity = 0;
                    }
                    if (!$rootScope.CommitteeScoreSafety) {
                        $rootScope.CommitteeScoreSafety = 0;
                    }
                    if (!$rootScope.CommitteeScoreQuality) {
                        $rootScope.CommitteeScoreQuality = 0;
                    }

                    $scope.model.type = "Implemented";
                    $scope.empTotalScore = 0;
                    $scope.mangTotalScore = 0;
                };

                $scope.ui.init();

            });


}());


