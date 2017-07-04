(function () {
    angular.module("AppModule")
            .factory("branchFactory", function ($http, systemConfig) {
                var factory = {};

                //load branch
                factory.loadBranch = function (callback) {
                    var url = systemConfig.apiUrl + "/api/branch";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };


                // save branch
                factory.saveBranch = function (branch, callback) {
                    var url = systemConfig.apiUrl + "/api/branch/save-branch";
                    $http.post(url, branch)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                // delete branch
                factory.deleteBranch = function (indexNo, callback) {
                    var url = systemConfig.apiUrl + "/api/branch/delete-branch/" + indexNo;
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
            .controller("branchController", function (ConfirmPane, systemConfig, $scope, branchFactory, Notification) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //branch model
                $scope.model = {
                    name: null
                };

                $scope.branchList = [];

                $scope.resetModel = function () {
                    $scope.model = {
                        name: ""
                    };

                };

                //validate model
                $scope.validateInput = function () {
                    if ($scope.model.name) {
                        return true;
                    } else {
                        return false;
                    }
                };

                //--------------http funtion------------

                //save employee 
                $scope.http.saveBranch = function () {
                    var json = JSON.stringify($scope.model);
                    branchFactory.saveBranch(
                            json,
                            function (data) {
                                if (data) {
                                    Notification.success(data.indexNo + " Branch Save Successfully");
                                    $scope.branchList.unshift(data);
                                    $scope.resetModel();
                                } else {
                                    Notification.error("Branch Name Duplicate..");
                                }
                            });
                };



                //delete branch
                $scope.http.deleteBranch = function (indexNo) {
                    ConfirmPane.primaryConfirm("Are you sure you want to delete?")
                            .confirm(function () {
                                branchFactory.deleteBranch(indexNo
                                        , function () {
                                            var id = -1;
                                            for (var i = 0; i < $scope.branchList.length; i++) {
                                                if ($scope.branchList[i].indexNo === indexNo) {
                                                    id = i;
                                                }
                                            }
                                            Notification.success(indexNo + " - " + "Branch Delete Successfully.");
                                            $scope.branchList.splice(id, 1);
                                        });
                            });

                };

                //---------------ui funtion--------------

                $scope.ui.save = function () {
                    if ($scope.validateInput()) {
                        $scope.http.saveBranch();
                    } else {
                        Notification.error("Please Input Value");
                    }
                };

                $scope.ui.clear = function () {
                    $scope.resetModel();
                };

                $scope.ui.edit = function (user) {
                    var id = -1;
                    for (var i = 0; i < $scope.branchList.length; i++) {
                        if ($scope.branchList[i].indexNo === user.indexNo) {
                            id = i;
                        }
                    }
                    $scope.branchList.splice(id, 1);

                    $scope.model = user;
                };


                $scope.init = function () {
                    $scope.numLimit = 15;
                    //load employee
                    branchFactory.loadBranch(function (data) {
                        $scope.branchList = data;
                    });
                };

                $scope.init();

            });


}());