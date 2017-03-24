(function () {
    'use strict';

    //-----------http controller---------
    angular.module("AppModule")
            .controller("LoginController", function ($http, systemConfig, $base64, $scope, $rootScope, $location) {
                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};


                $scope.model.user = {
                    name: null,
                    password: null
                };


                $scope.ui.login = function () {
                    var model = $scope.model.user;
                    var JSONDetail = JSON.stringify(model);

                    if ($scope.model.user.name !== null && $scope.model.user.password !== null) {
                        var url = systemConfig.apiUrl + "/user/login";
                        $http.post(url, JSONDetail)
                                .success(function (data, status, headers) {
                                    if (data) {
                                        $rootScope.UserMode = data.role;
                                        $rootScope.userName = data.name;
                                        $location.path('/home');
                                    }
                                })
                                .error(function (data, status, headers) {
                                    console.log(data);
                                });
                    }
                };


            });
}());

