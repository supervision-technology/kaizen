(function () {
    //constants
    angular.module("AppModule").constant("systemConfig", {
        apiUrl: "http://localhost:8080"
    });


    angular.module("AppModule")
            .config(function ($routeProvider) {
                $routeProvider
                        //  Transaction
                        .when("/transaction/job", {
                            templateUrl: "app/transaction/job/job.html",
                            controller: "JobController"
                        })
                        .when("/transaction/kaizen", {
                            templateUrl: "app/transaction/kaizen/kaizen.html",
                            controller: "KaizenController"
                        })
                        .when("/transaction/kaizen-manager-view", {
                            templateUrl: "app/transaction/kaizen-manager-view/manager-view.html",
                            controller: "KaizenManagerViewController"
                        })
                        .when("/transaction/kaizen-committee-view", {
                            templateUrl: "app/transaction/kaizen-committee-view/committee-view.html",
                            controller: "KaizenCommitteeViewController"
                        })
                        
                        //master
                        .when("/master/employee-registration", {
                            templateUrl: "app/master/employee/employee-registration.html"
//                            controller: "JobController"
                        })

                        .otherwise({
                            redirectTo: "/"
                        });
            });
}());