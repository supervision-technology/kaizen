(function () {
    'use strict';
    //Controller
    angular.module("AppModule")
            .controller("ItemController", function ($scope) {

                //data models 
                $scope.model = {};

                //ui models
                $scope.ui = {};

                //http models
                $scope.http = {};

                //current ui mode IDEAL, SELECTED, NEW, EDIT
                $scope.ui.mode = null;


                $scope.ui.init = function () {
                    //set ideal mode
                    $scope.ui.mode = "IDEAL";
                    $scope.model.formName = "Item";
                    console.log($scope.model.formName);
                };

                $scope.ui.init();
            });
}());