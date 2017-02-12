(function () {
    'use strict';

    //----------http factory-----------
    angular.module("AppModule")
            .factory("kaizenFactory", function ($http, systemConfig) {
                var factory = {};


                //load kaizen
                factory.loadkaizen = function (callback) {
                    var url = systemConfig.apiUrl + "/kaizen";
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

                return factory;
            });


    //-----------http controller---------
    angular.module("AppModule")
            .controller("KaizenController", function (kaizenFactory, $scope, $uibModal, $uibModalStack, Notification) {

                //data models 
                $scope.model = {};

                $scope.model.kaizen = {
                    title: null,
                    description: null,
                    type: null,
                    employeeCost: 0,
                    employeeUtilization: 0,
                    employeeCreativity: 0,
                    employeeSafety: 0,
                    employeeQuality: 0
                };

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};


                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;

                

                //-----------model function--------------

                //reset model
                $scope.model.reset = function () {
                    $scope.model.kaizen = {
                        title: null,
                        description: null,
                        type: null,
                        employeeCost: 0,
                        employeeUtilization: 0,
                        employeeCreativity: 0,
                        employeeSafety: 0,
                        employeeQuality: 0
                    };
                };

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
//                    console.log($scope.model.kaizen);
                    var details = $scope.model.kaizen;
                    var detailJSON = JSON.stringify(details);
                    console.log(detailJSON);
                    kaizenFactory.saveKaizen(
                            detailJSON,
                            function (data) {
//                                console.log(data);
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
                    $scope.model.kaizen.type = name;
                    console.log($scope.model.kaizen.type);
                };

                $scope.ui.setSuggestion = function (name) {
                    $scope.model.kaizen.type = name;
                    console.log($scope.model.kaizen.type);
                };


                //save function 
                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveKaizen();
                    } else {
                        Notification.error("Please input details");
//                        $scope.ui.focus();
                    }

                };

                $scope.ui.upload = function () {
                };

                // range slider funtion
                $scope.ui.costChange = function (score) {
                    $scope.ui.totalScore();
                };

                $scope.ui.utilizationChange = function (score) {
                      $scope.ui.totalScore();
                };
                
                $scope.ui.creativityChange = function (score) {
                      $scope.ui.totalScore();
                };
                
                $scope.ui.safetyChange = function (score) {
                      $scope.ui.totalScore();
                };
                
                $scope.ui.qualityChange = function (score) {
                      $scope.ui.totalScore();
                };

                $scope.ui.totalScore = function () {
                    $scope.cost = 30 / 5 * $scope.model.kaizen.employeeCost;
                    $scope.utilization = 15 / 5 * $scope.model.kaizen.employeeUtilization;
                    $scope.creativity = 20 / 5 * $scope.model.kaizen.employeeCreativity;
                    $scope.safety = 20 / 5 * $scope.model.kaizen.employeeSafety;
                    $scope.quality = 15 / 5 * $scope.model.kaizen.employeeQuality;
                    
                    
                   
                    $scope.totalScore = $scope.utilization + $scope.creativity + $scope.cost + $scope.safety + $scope.quality;
                    
                    console.log($scope.totalScore);
                };

                $scope.ui.modalOpen = function () {
                    $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/transaction/kaizen/kaizen-popup.html',
                        controller: 'KaizenController',
                        size: 'lg'
                    });
                };

                $scope.ui.close = function () {
                    $uibModalStack.dismissAll();
                };


                $scope.ui.init = function () {
                    $scope.totalScore = 0;
                    $scope.model.kaizen.type = "Implemented";
                    //set ideal mode
//            $scope.ui.mode = "IDEAL";
                };

                $scope.ui.init();

            });
}());