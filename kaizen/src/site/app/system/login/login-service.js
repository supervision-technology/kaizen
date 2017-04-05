'use strict';

angular.module('AppModule')
        .factory('AuthenticationService', function (systemConfig, $base64, $http, $cookieStore, $rootScope, $timeout) {
            var service = {};

            $rootScope.model = {
                name: null,
                password: null
            };


            service.Login = function (username, password, callback) {

                /* Dummy authentication for testing, uses $timeout to simulate api call
                 ----------------------------------------------*/
//                            $timeout(function () {
//                                var response = {success: username === 'test' && password === 'test'};
//                                if (!response.success) {
//                                    response.message = 'Username or password is incorrect';
//                                }
//                                callback(response);
//                            }, 1000);


                /* Use this for real authentication
                 ----------------------------------------------*/
                $rootScope.model.name = username;
                $rootScope.model.password = password;

                var url = systemConfig.apiUrl + "/user/login";

                var DetailJSON = JSON.stringify($rootScope.model);

                $timeout(function () {
                    $http.post(url, DetailJSON)
                            .success(function (response) {
                                callback(response);
                            });
                }, 2000);

            };

            service.SetCredentials = function (username, password) {
                var authdata = $base64.encode(username + ':' + password);

                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        authdata: authdata
                    }
                };

                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                $cookieStore.put('globals', $rootScope.globals);
            };

            service.ClearCredentials = function () {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic ';
            };

            return service;
        });
