(function () {
    'use strict';

    var controller = function ($scope) {
        //data models 
        $scope.model = {};

        //ui models
        $scope.ui = {};

        //http models
        $scope.http = {};

        //current ui mode IDEAL, SELECTED, NEW, EDIT
        $scope.ui.mode = null;
        
        
        $scope.ui.new = function (){
            $scope.ui.mode = "NEW";
        };
        
        $scope.ui.save = function (){
            $scope.ui.mode = "IDEAL";
        };


        $scope.ui.init = function () {
            //set ideal mode
            $scope.ui.mode = "IDEAL";
        };

        $scope.ui.init();

    };

    angular.module("AppModule")
            .controller("JobController", controller);
}());