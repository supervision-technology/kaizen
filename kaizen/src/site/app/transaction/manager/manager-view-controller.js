(function () {
    'use strict';


    //----------http factory-----------
    angular.module("AppModule")
            .factory("kaizenManagerViewFactory", function ($http, systemConfig) {
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
                    var url = systemConfig.apiUrl + "/api/kaizen/update-kaizen";

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
            .controller("KaizenManagerViewController", function ($window, $http, systemConfig, kaizenManagerViewFactory, $base64, $scope, $filter, $rootScope, $uibModal, $uibModalStack, Notification) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                $scope.ui.beforeImages = [];

                $scope.ui.afterImages = [];

                $scope.ui.documentFile = [];

                $scope.ui.afterDocumentFile = [];

                $scope.model.kaizenList = [];

                $scope.emailModel = {
                    email: null,
                    message: null,
                    subject: null,
                    indexNo: null,
                    managerCost: 0,
                    managerUtilization: 0,
                    managerCreativity: 0,
                    managerSafety: 0,
                    managerQuality: 0
                };

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
                    employeeQuality: 0,
                    actualCost: null
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


                //validate model
                $scope.validateInput = function () {
                    if (!$rootScope.kaizenIndex) {
                        Notification.error("please select kaizen..");
                    } else if ($rootScope.managerTotalScore < 70) {
                        Notification.error("Manager score not enough..");
                    } else {
                        return true;
                    }

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
                    $scope.ui.documentFile = [];
                    $scope.ui.afterDocumentFile = [];
                    $scope.ui.beforeImages = [];
                    $scope.ui.afterImages = [];
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
//                                        var data1 = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));
//                                        if (value.type === 'before') {
//                                            $scope.ui.beforeImages.push('data:image/png;base64,' + data1);
//                                        } else {
//                                            $scope.ui.afterImages.push('data:image/png;base64,' + data1);
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

                            if (value.managerComplete === 'MANAGER_COMPLETE') {
                                $rootScope.ManagerScoreCost = value.managerCost;
                                $rootScope.ManagerScoreUtilization = value.managerUtilization;
                                $rootScope.ManagerScoreCreativity = value.managerCreativity;
                                $rootScope.ManagerScoreSafety = value.managerSafety;
                                $rootScope.ManagerScoreQuality = value.managerQuality;
                            } else {
                                $rootScope.ManagerScoreCost = value.employeeCost;
                                $rootScope.ManagerScoreUtilization = value.employeeUtilization;
                                $rootScope.ManagerScoreCreativity = value.employeeCreativity;
                                $rootScope.ManagerScoreSafety = value.employeeSafety;
                                $rootScope.ManagerScoreQuality = value.employeeQuality;
                            }
                            $scope.ui.managerTotalScore();
                            $scope.ui.employeeScore();
                        }
                    });

                };

                $scope.ui.selectComplete = function () {
                    $scope.numLimit = 10;
                    $scope.model.kaizenList = [];
                    document.getElementById("appreciationBtn").disabled = true;
                    document.getElementById("suggestionBtn").disabled = true;
                    document.getElementById("submitBtn").disabled = true;
                    $scope.model.reset();
                    $scope.ui.selectedDataIndex = null;

                    var url = systemConfig.apiUrl + "/api/kaizen/department-kaizen/" + $rootScope.departmentIndex;

                    $http.get(url)
                            .success(function (data) {
                                angular.forEach(data, function (value) {
                                    if (value.managerComplete === "MANAGER_COMPLETE") {
                                        $scope.model.kaizenList.push(value);
                                    }
                                });
                            });

                };

                $scope.ui.selectPending = function () {
                    $scope.numLimit = 10;
                    $scope.model.kaizenList = [];
                    document.getElementById("appreciationBtn").disabled = false;
                    document.getElementById("suggestionBtn").disabled = false;
                    document.getElementById("submitBtn").disabled = false;
                    $scope.ui.selectedDataIndex = null;
                    $scope.model.reset();

                    $scope.onSelect($rootScope.departmentIndex);
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
                            var url = systemConfig.apiUrl + "/api/document/download-image/" + value.epfNo + "/";
                            $scope.imageUrl = url;
                            employee = value;
                            $rootScope.employeeName = employee.name;
                            $scope.emailModel.email = employee.email;
                            return;
                        }
                    });
                    return employee;
                };

                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
//                        $scope.http.saveKaizen();
                        $scope.sendAppreciationMail(1);
                    }
                };

                $scope.ui.filterValue = function (obj) {
//                    return $filter('date')(obj.introduceDate, 'MM/yyyy') === $filter('date')($scope.model.date, 'MM/yyyy');
                    var date = $filter('date')(obj.introduceDate, 'MM/yyyy') === $filter('date')($scope.model.date, 'MM/yyyy');
                    return date;
                };


                $scope.onSelect = function (indexNo) {
                    var url = systemConfig.apiUrl + "/api/kaizen/department-kaizen/" + indexNo;

                    $http.get(url)
                            .success(function (data) {
                                $scope.model.kaizenList = [];
                                angular.forEach(data, function (value) {
                                    if (value.reviewStatus === "PENDING") {
                                        $scope.model.kaizenList.push(value);
                                    }
                                });
                            });
                };


                $scope.sendAppreciationMail = function (a) {
                    if ($scope.ui.selectedDataIndex) {
                        if (a === 1) {
                            if ($scope.emailModel.email) {
                                $rootScope.sendMode = "loading2";
                                var date = $filter('date')(new Date(), 'yyyy-MM-dd');
                                $scope.emailModel.message = "Hi (" + $rootScope.employeeName + "),\n\nTHANK YOU !!! for your effort towards improving the continues improvement culture in Linea Aqua.\n\nWe have considered your Kaizen in the " + date + " kaizen forum and found it as a valuable idea for Linea Aqua.\n\n\We hope you will keep doing Kaizens to bring Linea Aqua to the next level.\n\nThanks & Regards,\nKaizen Committee";
                                $scope.emailModel.subject = "Kaizen Appreciation";
                                $scope.emailModel.indexNo = $rootScope.kaizenIndex;
                                $scope.emailModel.managerCost = $rootScope.ManagerScoreCost;
                                $scope.emailModel.managerCreativity = $rootScope.ManagerScoreCreativity;
                                $scope.emailModel.managerQuality = $rootScope.ManagerScoreQuality;
                                $scope.emailModel.managerSafety = $rootScope.ManagerScoreSafety;
                                $scope.emailModel.managerUtilization = $rootScope.ManagerScoreUtilization;


                                var url = systemConfig.apiUrl + "/api/kaizen/send-mail";


                                var JsonDetail = JSON.stringify($scope.emailModel);
                                $http.post(url, JsonDetail)
                                        .success(function (data, status, headers) {
                                            $rootScope.sendMode = null;
                                            var id = null;
                                            for (var i = 0; i < $scope.model.kaizenList.length; i++) {
                                                if ($scope.model.kaizenList[i].indexNo === data.indexNo) {
                                                    id = i;
                                                }
                                            }
                                            $scope.model.kaizenList.splice(id, 1);
                                            Notification.success("Send successfully");
                                        })
                                        .error(function (data, status, headers) {
                                            $rootScope.sendMode = null;
                                            Notification.error("Send fail");
                                        });
                            } else {
                                Notification.error("Email is null");
                            }
                        } else {
                            Notification.error("Selected kaizen should be less than 70%");
                        }
                    } else {
                        Notification.error("Please select kaizen ");
                    }
                };

                $scope.sendAppreciationMail2 = function (a) {
                    if ($scope.ui.selectedDataIndex) {
                        if ($rootScope.managerTotalScore < 70 || a === 1) {
                            if ($scope.emailModel.email) {
                                $rootScope.sendMode = "loading2";
                                var date = $filter('date')(new Date(), 'yyyy-MM-dd');
                                $scope.emailModel.message = "Hi (" + $rootScope.employeeName + "),\n\nTHANK YOU !!! for your effort towards improving the continues improvement culture in Linea Aqua.\n\nWe have considered your Kaizen in the " + date + " kaizen forum and found it as a valuable idea for Linea Aqua.\n\n\We hope you will keep doing Kaizens to bring Linea Aqua to the next level.\n\nThanks & Regards,\nKaizen Committee";
                                $scope.emailModel.subject = "Kaizen Appreciation";
                                $scope.emailModel.indexNo = $rootScope.kaizenIndex;
                                $scope.emailModel.managerCost = $rootScope.ManagerScoreCost;
                                $scope.emailModel.managerCreativity = $rootScope.ManagerScoreCreativity;
                                $scope.emailModel.managerQuality = $rootScope.ManagerScoreQuality;
                                $scope.emailModel.managerSafety = $rootScope.ManagerScoreSafety;
                                $scope.emailModel.managerUtilization = $rootScope.ManagerScoreUtilization;


                                var url = systemConfig.apiUrl + "/api/kaizen/send-suggestion-mail/" + $scope.ui.selectedDataIndex;


                                var JsonDetail = JSON.stringify($scope.emailModel);
                                $http.post(url, JsonDetail)
                                        .success(function (data, status, headers) {
                                            $rootScope.sendMode = null;
                                            var id = null;
                                            for (var i = 0; i < $scope.model.kaizenList.length; i++) {
                                                if ($scope.model.kaizenList[i].indexNo === data.indexNo) {
                                                    id = i;
                                                }
                                            }
                                            $scope.model.kaizenList.splice(id, 1);
                                            Notification.success("Send successfully");
                                        })
                                        .error(function (data, status, headers) {
                                            $rootScope.sendMode = null;
                                            Notification.error("Send fail");
                                        });
                            } else {
                                Notification.error("Email is null");
                            }
                        } else {
                            Notification.error("Selected kaizen should be less than 70%");
                        }
                    } else {
                        Notification.error("Please select kaizen ");
                    }
                };

                $scope.sendSuggestion = function () {
                    if ($scope.ui.selectedDataIndex) {
                        if ($scope.emailModel.email) {
                            $rootScope.sendMode = "loading2";
//                        var introduceDate = $filter('date')($rootScope.introduceDate, 'yyyy-MM-dd');
                            var date = $filter('date')(new Date(), 'yyyy-MM-dd');
                            $scope.emailModel.message = "Hi (" + $rootScope.employeeName + "),\n\nTHANK YOU !!! for your effort towards improving the continues improvement culture in Linea Aqua.\n\nWe have considered your suggestion in the " + date + " kaizen forum and found it as a valuable idea for Linea Aqua.\n\nYour support in making this suggestion as an implemented improvement is highly appreciated which will be then entitled as a kaizen for the \nmonthly Kaizen evaluation. If you need any support for the suggestion implementation please contact your immediate supervisor or manager.\n\n**Since this is a suggestion made by you, it won’t be considered as an implemented kaizen for the moment. Please do the needful and update the system.\n\nThanks & Regards,\n\Kaizen Committee";
                            $scope.emailModel.subject = "Suggestion Note";

                            var url = systemConfig.apiUrl + "/api/kaizen/send-suggestion-mail/" + $scope.ui.selectedDataIndex;

                            var JsonDetail = JSON.stringify($scope.emailModel);

                            $http.post(url, JsonDetail)
                                    .success(function (data, status, headers) {
                                        $rootScope.sendMode = null;
                                        var id = null;
                                        for (var i = 0; i < $scope.model.kaizenList.length; i++) {
                                            if ($scope.model.kaizenList[i].indexNo === data.indexNo) {
                                                id = i;
                                            }
                                        }
                                        $scope.model.kaizenList.splice(id, 1);
                                        Notification.success("Send successfully");
                                    })
                                    .error(function (data, status, headers) {
                                        $rootScope.sendMode = null;
                                        Notification.error("Send fail");
                                    });
                        } else {
                            Notification.error("Email is null");
                        }
                    } else {
                        Notification.error("Please select kaizen");

                    }
                };

                //load scroll
                $scope.showMore = function () {
                    $scope.numLimit += 5;
                };

                $scope.ui.init = function () {
                    $scope.numLimit = 10;
                    //set date
                    $scope.model.date = new Date();

                    kaizenManagerViewFactory.loadEmployee(function (data) {
                        $scope.model.employeeList = data;
                    });

                    //load kaizen
                    kaizenManagerViewFactory.loadEmployee(function (data) {
                        angular.forEach(data, function (val) {
                            if (val.epfNo === $rootScope.user.epfNo) {
                                $rootScope.departmentIndex = val.department.indexNo;
                                $scope.onSelect(val.department.indexNo);
                                $scope.model.department = val.department.name;
                                document.getElementById("department").disabled = true;
                            }
                        });

                    });

                    //load Department
                    kaizenManagerViewFactory.loadDepartment(function (data) {
                        $scope.model.departmentList = data;
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