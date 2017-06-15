(function () {
    angular.module("AppModule")
            .factory("mailFactory", function ($http, systemConfig) {
                var factory = {};
                // save employee
                factory.saveEmployee = function (employee, callback) {
                    var url = systemConfig.apiUrl + "/api/employee/upload-employee";
                    $http.post(url, employee)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                return factory;
            });
    angular.module("AppModule")
            .controller("mailController", function ($http, $filter, $rootScope, systemConfig, $scope, mailFactory, Notification) {

                //http models
                $scope.http = {};
                //email models
                $scope.emailModel = {};
                //------------http funtion------------



                $scope.sendMail = function () {
                    if ($rootScope.radioType === null) {
                        Notification.error("Please insert manager or committee");
                    } else {
                        if ($rootScope.radioType === 'manager') {
                            $scope.mode = "sending";
                            var date = $filter('date')($scope.selectDate, 'dd');
                            if (!date) {
                                date = 15;
                            }
                            $scope.emailModel.message = " Hi All,\n\n Please note that your department kaizens are now ready for your review, Please review your \n team kaizens on or before " + date + "th of this month.Appreciate your effort towards improving the \n We hope you will keep doing Kaizens to bring Linea Aqua to the next level.\n continues improvement culture in Linea Aqua.\n\n Thanks,\n\n Kaizen Committee";
                            $scope.emailModel.subject = "Manager’s reminding mail";
                            var url = systemConfig.apiUrl + "/api/employee/send-mail";
                            var JsonDetail = JSON.stringify($scope.emailModel);
                            $http.post(url, JsonDetail)
                                    .success(function (data, status, headers) {
                                        $scope.mode = null;
                                        Notification.success("Send successfully");
                                    })
                                    .error(function (data, status, headers) {
                                        $scope.mode = null;
                                        Notification.error("Send fail");
                                    });
                        } else {
                            $scope.mode = "sending";
//                            var date = $filter('date')($scope.selectDate, 'yyyy-MM-dd');
                            $scope.emailModel.message = "Hi All,\n\n Please note that last month kaizens are now ready for the kaizen committee review,Appreciate\n your assistance in evaluating kaizens at Linea Aqua.\n\n Thanks,\n\n Kaizen admin";
                            $scope.emailModel.subject = "Kaizen Committee reminding mail";
                            var url = systemConfig.apiUrl + "/api/employee/send-mail";
                            var JsonDetail = JSON.stringify($scope.emailModel);
                            $http.post(url, JsonDetail)
                                    .success(function (data, status, headers) {
                                        $scope.mode = null;
                                        Notification.success("Send successfully");
                                    })
                                    .error(function (data, status, headers) {
                                        $scope.mode = null;
                                        Notification.error("Send fail");
                                    });
                        }
                    }
                };
                $scope.changeRadio = function (radio) {
                    if (radio === true) {
                        $rootScope.radioType = 'manager';
                        document.getElementById('date').disabled = false;
                    } else {
                        $rootScope.radioType = 'committee';
                        document.getElementById('date').disabled = true;
                    }
                };
                $scope.init = function () {
                    $rootScope.radioType = null;
                    //load department
//                    mailFactory.loadDepartment(function (data) {
//                        $scope.departmentList = data;
//                    });

                };
                $scope.init();
            });
}());