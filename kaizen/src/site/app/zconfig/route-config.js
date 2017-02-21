(function () {
    //constants
    angular.module("AppModule").constant("systemConfig", {
        apiUrl: "http://localhost:8080"
    });


    angular.module("AppModule")
            .config(function ($routeProvider) {
                $routeProvider

                        //  master
//                        .when("/master/item", {
//                            templateUrl: "app/master/item/item.html",
//                            controller: "ItemController"
//                        })
                        //  Transaction
//                        .when("/transaction/grn", {
//                            templateUrl: "app/transaction/grn/grn.html",
//                            controller: "GrnController"
//                        })
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

                        .otherwise({
                            redirectTo: "/"
                        });
            });
}());