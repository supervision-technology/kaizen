(function () {
    //constants
    angular.module("AppModule")
            .constant("systemConfig", {
                apiUrl:
                        location.hostname === 'localhost'
                        ? "http://localhost:8080"
                        : location.protocol + "//" + location.hostname
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
                            templateUrl: "app/transaction/manager/manager-view.html",
                            controller: "KaizenManagerViewController"
                        })
                        .when("/transaction/kaizen-committee-view", {
                            templateUrl: "app/transaction/committee/committee-view.html",
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