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

                //load department
                factory.loadCurrency = function (callback) {
                    var url = systemConfig.apiUrl + "/all-currency";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };


                return factory;
            });


    //-----------http controller---------
    angular.module("AppModule")
            .controller("KaizenController", function ($http, kaizenFactory, systemConfig, $base64, $scope, $rootScope, $uibModal, $uibModalStack, Notification) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                $scope.beforeImageModel = [];

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
                    employeeQuality: 0,
                    actualCost: null
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
//                    $rootScope.employeeEpfNo = null;
//                    $rootScope.employeeName = null;
                    $rootScope.imageUrl = null;
                    $rootScope.actualCost = "";

                };

                $scope.model.resetEmployee = function () {
                    $scope.employeeName = null;
                    $scope.employeeEpfNo = null;
                    $rootScope.employee = null;
                    $rootScope.employeeEpfNo1 = null;
                    $rootScope.employeeName1 = null;
                    $rootScope.department = null;
                };


                $scope.$watch('employeeEpfNo', function (val) {
                    if (val === "") {
                        $scope.model.resetEmployee();
                        $rootScope.imageUrl = null;
                    }
                }, true);

                $scope.$watch('employeeName', function (val) {
                    if (val === "") {
                        $scope.model.resetEmployee();
                        $rootScope.imageUrl = null;
                    }
                }, true);


                //validate model
                $scope.validateInput = function () {
                    if ($rootScope.employee && $scope.model.kaizen.title
                            && $scope.model.kaizen.description) {
                        return true;
                    } else {
                        return false;
                    }
                };


                //--------------http funtion---------------
                //save model
                $scope.http.saveKaizen = function () {
                    $rootScope.sendMode = "loading";
                    $scope.model.kaizen.employeeCost = $rootScope.scoreCost;
                    $scope.model.kaizen.employeeUtilization = $rootScope.scoreUtilization;
                    $scope.model.kaizen.employeeCreativity = $rootScope.scoreCreativity;
                    $scope.model.kaizen.employeeSafety = $rootScope.scoreSafety;
                    $scope.model.kaizen.employeeQuality = $rootScope.scoreQuality;
                    $scope.model.kaizen.employee = $rootScope.employee;
                    $scope.model.kaizen.type = $rootScope.type;
                    $scope.model.kaizen.actualCost = $rootScope.actualCost;

                    var details = $scope.model.kaizen;
                    var detailJSON = JSON.stringify(details);
                    kaizenFactory.saveKaizen(
                            detailJSON,
                            function (data) {
                                if ($rootScope.UserMode === "group_user") {
                                    $rootScope.fileList = [[]];
                                    Notification.success(data.indexNo + " - " + "Kaizen Saved Successfully.");
                                    $scope.model.resetEmployee();
                                    $scope.model.reset();
                                    $scope.beforeImageModel = [];
                                    $scope.afterImageModel = [];
                                    $rootScope.sendMode = null;
                                } else {
                                    angular.forEach($scope.employees, function (val) {
                                        if (val.indexNo === data.employee) {
                                            $scope.employeeName = val.name;
                                        }
                                    });

                                    $rootScope.scoreCost = 0;
                                    $rootScope.scoreUtilization = 0;
                                    $rootScope.scoreCreativity = 0;
                                    $rootScope.scoreSafety = 0;
                                    $rootScope.scoreQuality = 0;
                                    $rootScope.totalScore = 0;
                                    $rootScope.actualCost = "";
                                    $scope.model.kaizen.description = null;
                                    $scope.model.kaizen.title = null;
                                    $scope.uploadForm(data.indexNo);
                                    Notification.success(data.indexNo + " - " + "Kaizen Saved Successfully.");
                                    $rootScope.sendMode = null;
                                    $scope.beforeImageModel = [];
                                    $scope.afterImageModel = [];
                                    $rootScope.fileList = [[]];
                                }
                            },
                            function (data) {
                                $rootScope.sendMode = null;
                                Notification.error(data.message);
                            }
                    );
                };




                //----------------ui funtion--------------

                //save function 
                $scope.ui.save = function () {
                    if ($rootScope.currency === '2') {
                        var value = $rootScope.actualCost / $rootScope.currentDollar;
                        $rootScope.actualCost = Math.round(value * 100) / 100;
                    }
                    if ($scope.validateInput()) {
                        if ($rootScope.cost > 0 && $rootScope.actualCost === null) {
                            Notification.error("Actual cost empty.please enter actual cost");
                        } else {
                            $scope.http.saveKaizen();
                        }
                    } else {
                        Notification.error("Please input details");
                    }
                };


                $scope.fileArray = function (files, status) {
                    if (!$rootScope.fileList) {
                        $rootScope.fileList = [[]];
                        $rootScope.fileList.push(([files, status]));
                    } else {
                        $rootScope.fileList.push(([files, status]));
                    }
                };

                //before image upload
                $scope.uploadBeforeFile = function (event) {
                    var status = "before";
                    var files = event.target.files;
                    $scope.img = null;

                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        $scope.fileArray(file, status);


                        if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                            $scope.img = "/images/xl.png";
                        }
                        if (file.type === "application/vnd.ms-excel") {
                            $scope.img = "/images/xl.png";
                        }
                        if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                            $scope.img = "/images/word.ico";
                        }
                        if (file.type === "application/pdf") {
                            $scope.img = "/images/pdf.png";
                        }


                        var reader = new FileReader();
                        reader.onload = $scope.beforeImageLoaded;
                        reader.readAsDataURL(file);
                    }
                };

                $scope.beforeImageLoaded = function (e) {
                    $scope.$apply(function () {
                        if ($scope.img !== null) {
                            $scope.beforeImageModel.push($scope.img);
                            $scope.img = null;
                        } else {
                            $scope.beforeImageModel.push(e.target.result);
                        }
                    });
                };

                //after image upload
                $scope.uploadAfterFile = function (event) {
                    var status = "after";
                    var files = event.target.files;
                    $scope.img2 = null;

                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        $scope.fileArray(file, status);

                        if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                            $scope.img2 = "/images/xl.png";
                        }
                        if (file.type === "application/vnd.ms-excel") {
                            $scope.img = "/images/xl.png";
                        }
                        if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                            $scope.img2 = "/images/word.ico";
                        }
                        if (file.type === "application/pdf") {
                            $scope.img2 = "/images/pdf.png";
                        }

                        var reader = new FileReader();
                        reader.onload = $scope.afterImageLoaded;
                        reader.readAsDataURL(file);
                    }
                };

                $scope.afterImageLoaded = function (e) {
                    $scope.$apply(function () {
                        if ($scope.img2 !== null) {
                            $scope.afterImageModel.push($scope.img2);
                            $scope.img2 = null;
                        } else {
                            $scope.afterImageModel.push(e.target.result);
                        }
                    });
                };


                // upload image
                $scope.uploadForm = function (index) {
                    $rootScope.indexNo = index;
                    if ($rootScope.fileList) {
                        for (var i = 1; i < $rootScope.fileList.length; i++) {
                            var url = systemConfig.apiUrl + "/api/document/upload-image/" + $rootScope.indexNo + "/" + $rootScope.fileList[i][1];
                            var formData = new FormData();
                            formData.append("file", $rootScope.fileList[i][0]);

                            var xhr = new XMLHttpRequest();
                            xhr.open("POST", url);
                            xhr.send(formData);

                        }
                    }
                };

                //remove before image 
                $scope.removeImage = function (indexNo) {
                    $scope.beforeImageModel.splice(indexNo, 1);

                    var id2 = -1;
                    for (var i = 0; i < $rootScope.fileList.length; i++) {
                        if ($rootScope.fileList[i].indexNo === indexNo) {
                            id2 = i;
                        }
                    }
                    $rootScope.fileList.splice(id2, 1);

                };

                // remove after image
                $scope.removeAfterImage = function (indexNo) {
                    $scope.afterImageModel.splice(indexNo, 1);

                    var id2 = -1;
                    for (var i = 0; i < $rootScope.fileList.length; i++) {
                        if ($rootScope.fileList[i].indexNo === indexNo) {
                            id2 = i;
                        }
                    }
                    $rootScope.fileList.splice(id2, 1);

                };



                // range slider funtion
                $scope.ui.changeActualCost = function (actualCost) {
                    $rootScope.actualCost = actualCost;
                };
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
                    $rootScope.mode = 'disable';
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
                    if ($rootScope.cost > 0 && $rootScope.actualCost === null) {
                        Notification.error("Actual cost empty.please enter actual cost");
                    } else {
                        $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'app/transaction/kaizen/dialog/utilization-popup.html',
                            controller: 'KaizenController',
                            size: 'lg',
                            windowClass: 'zindex'
                        });
                    }

                };

                $scope.ui.modalOpenCreativity = function () {
                    if ($rootScope.cost > 0 && $rootScope.actualCost === null) {
                        Notification.error("Actual cost empty.please enter actual cost");
                    } else {
                        $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'app/transaction/kaizen/dialog/creativity-popup.html',
                            controller: 'KaizenController',
                            size: 'lg',
                            windowClass: 'zindex'
                        });
                    }
                };

                $scope.ui.modalOpenSafety = function () {
                    if ($rootScope.cost > 0 && $rootScope.actualCost === null) {
                        Notification.error("Actual cost empty.please enter actual cost");
                    } else {
                        $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'app/transaction/kaizen/dialog/safety-popup.html',
                            controller: 'KaizenController',
                            size: 'lg',
                            windowClass: 'zindex'
                        });
                    }
                };

                $scope.ui.modalOpenQuality = function () {
                    if ($rootScope.cost > 0 && $rootScope.actualCost === null) {
                        Notification.error("Actual cost empty.please enter actual cost");
                    } else {
                        $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'app/transaction/kaizen/dialog/quality-popup.html',
                            controller: 'KaizenController',
                            size: 'lg',
                            windowClass: 'zindex'
                        });
                    }
                };

                $scope.ui.close = function () {
                    $uibModalStack.dismissAll();
                };

                $scope.ui.getPictures = function (path, branch) {
                    var url = systemConfig.apiUrl + "/api/document/download-image/" + path + "/" + branch;
                    $rootScope.imageUrl = url;
                };

                $scope.ui.selectEmployee = function (employee) {
                    $rootScope.value = 1;
                    $scope.ui.getPictures(employee.epfNo, employee.branch.id);
                    $rootScope.employee = employee.indexNo;
                    $scope.employeeName = employee.name;
                    $scope.employeeEpfNo = employee.epfNo;
                    $rootScope.employeeEpfNo1 = employee.epfNo;
                    $rootScope.employeeName1 = employee.name;
                    $rootScope.department = employee.department.name;
                };

                $scope.ui.typeHeadSelectEmployee = function (employee) {
                    $scope.ui.getPictures(employee.epfNo, employee.branch.id);
                    $rootScope.employee = employee.indexNo;
                    $scope.employeeName = employee.name;
                    $scope.employeeEpfNo = employee.epfNo;
                    $rootScope.employeeEpfNo1 = employee.epfNo;
                    $rootScope.employeeName1 = employee.name;
                    $rootScope.department = employee.department.name;
                };

                $scope.ui.keyEvent = function (e, employeeEpfNo) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.ui.EmployeeByEpfNo(employeeEpfNo);
                    }
                };

                //TODO
                $scope.ui.EmployeeByEpfNo = function (epfNo) {
                    $rootScope.employeeList = [];
                    angular.forEach($scope.model.employeeList, function (value) {
                        if (value.epfNo === epfNo) {
                            $rootScope.employeeList.push(value);
                        }
                    });

                    if ($rootScope.employeeList.length > 1) {
                        $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'app/transaction/kaizen/dialog/employee.html',
                            controller: 'KaizenController',
                            scope: $scope,
                            size: 'lg',
                            windowClass: 'zindex'
                        });
                    }

                    if ($rootScope.employeeList.length === 1) {
                        angular.forEach($rootScope.employeeList, function (value) {
                            $scope.ui.getPictures(value.epfNo, value.branch.id);
                            $rootScope.employee = value.indexNo;
                            $scope.employeeName = value.name;
                            $scope.employeeEpfNo = value.epfNo;
                            $rootScope.employeeEpfNo1 = value.epfNo;
                            $rootScope.employeeName1 = value.name;
                            $rootScope.department = value.department.name;
                        });
                    }
                };

                $scope.selectMoreEmployee = function (employee) {
                    $scope.ui.getPictures(employee.epfNo, employee.branch.id);
                    $scope.ui.selectedDataIndex = employee.indexNo;
                    $rootScope.employee = employee.indexNo;
                    $scope.employeeName = employee.name;
                    $scope.employeeEpfNo = employee.epfNo;
                    $rootScope.employeeEpfNo1 = employee.epfNo;
                    $rootScope.employeeName1 = employee.name;
                    $rootScope.department = employee.department.name;
                };

                //select currency
                $scope.selectCurrency = function (number) {
                    $rootScope.mode = 'enable';
                    console.log(number)
                    if (number === 1) {
                        $rootScope.currency = '1';
                    } else {
                        $rootScope.currency = '2';
                    }
                };

                $scope.ui.init = function () {
                    //load document
                    kaizenFactory.loadEmployee(function (data) {
                        $scope.employees = data;
                    });

                    //load employee
                    kaizenFactory.loadEmployee(function (data) {
                        if ($rootScope.UserMode === 'group_user') {
                            $scope.tempEmpList = [];
                            angular.forEach(data, function (val) {
                                if (val.department.indexNo === $rootScope.user.department.indexNo && val.type !== 'admin') {
                                    $scope.tempEmpList.push(val);
                                    if (val.epfNo === $rootScope.user.epfNo) {
                                        if ($rootScope.value !== 1) {
//                                            $rootScope.employeeName = val.name;
                                            $scope.ui.selectEmployee(val);
                                        }

                                    }
                                }
                                $scope.model.employeeList = $scope.tempEmpList;
                            });
                        } else {
                            angular.forEach(data, function (val) {
                                if (val.epfNo === $rootScope.user.epfNo && val.name === $rootScope.user.name) {
                                    document.getElementById("empName").disabled = true;
                                    document.getElementById("epfNo").disabled = true;
//                                    $rootScope.employeeName = val.name;
                                    $scope.ui.selectEmployee(val);
                                }
                            });
                        }
                    });

                    kaizenFactory.loadCurrency(
                            function (data) {
                                angular.forEach(data, function (val) {
                                    $rootScope.currentDollar = val.value;
                                });
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
                    if (!$rootScope.actualCost) {
                        $rootScope.actualCost = null;
                    }

                    if (!$rootScope.type) {
                        $rootScope.type = "Implemented";
                    }
                };

                $scope.ui.init();

            });
}());