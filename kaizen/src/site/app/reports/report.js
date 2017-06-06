(function () {
    angular.module("AppModule")
            .factory("SummaryFactory", function (systemConfig, $http) {
                var factory = {};

                //load summary
                factory.loadSummary = function (year, callback) {
                    var url = systemConfig.apiUrl + "/summary/" + year;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                // get monthWise details
                factory.getMonthWiseDetails = function (year, callback) {
                    var url = systemConfig.apiUrl + "/month-wise-details/" + year;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load manager view and eveluated kaizen details
                factory.loadEveluatedDetails = function (year, callback) {
                    var url = systemConfig.apiUrl + "/view-count/" + year;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                //load top 5 kaizen 
                factory.loadTop5Kaizen = function (year, month, callback) {
                    var url = systemConfig.apiUrl + "/top-kaizen/" + year + "/" + month;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                //load top 10 kaizen 
                factory.loadTop10Kaizen = function (year, month, callback) {
                    var url = systemConfig.apiUrl + "/top-10-kaizen/" + year + "/" + month;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };
                //load best kaizens
                factory.BestKaizens = function (year, callback) {
                    var url = systemConfig.apiUrl + "/best-kaizen/" + year;
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                //load employee
                factory.loadEmployee = function (callback) {
                    var url = systemConfig.apiUrl + "/api/employee";
                    $http.get(url)
                            .success(function (data, status, headers) {
                                callback(data);
                            })
                            .error(function (data, status, headers) {

                            });
                };

                return factory;
            });

    angular.module("AppModule")
            .controller("SummaryController", function (FileSaver,Notification, systemConfig, $timeout, $rootScope, $scope, $window, SummaryFactory, $filter) {

                $scope.model = {};

                $scope.http = {};

                $scope.yearList = [];
                $scope.monthList = [];
                $scope.countList = [];
                $scope.topKaizenList = [];

                $scope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



                // ---------------- http funtion -------------------

                $scope.http.saveTopkaizen = function () {
                    var json = JSON.stringify($scope.model);
                    console.log(json);
                    $scope.topKaizenList.push($scope.model);
//                    SummaryFactory.saveEmployee(
//                            json,
//                            function (data) {
//                                Notification.success(data.indexNo + " Employee Save Successfully");
//                                $scope.topKaizenList.push($scope.model);
//                                $scope.imagemodel = null;
//                                $scope.model = null;
//                            });

                };

                $scope.exportData = function () {
                    var blob = new Blob([document.getElementById('printDiv').innerHTML], {
                        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                    });
                    FileSaver.saveAs(blob, "Report.xls");
                };

                $scope.printFuntion = function () {
                    var divToPrint = document.getElementById("printDiv");
                    newWin = window.open("");
                    newWin.document.write(divToPrint.outerHTML);
                    newWin.print();
                    newWin.close();
                };

                $scope.print = function (divName) {
                    $scope.printFuntion();
//                    $scope.printMode = 'true';

//                    $timeout(function () {
//                        w = window.open();
//                        w.document.write(document.getElementById('printDiv').innerHTML);
//                        w.print();
//                        w.close();
//                        $window.print();
//                        $scope.printMode = 'false';
//                    }, 500);

//                    var printContents = document.getElementById(divName).innerHTML;
//                    var originalContents = document.body.innerHTML;
//
//                    document.body.innerHTML = "<html><head><title></title></head><body>" + printContents + "</body>";
//
//                    window.print();
//
//                    document.body.innerHTML = originalContents;
                };

                $scope.changeYear = function (year) {
                    SummaryFactory.loadSummary(year
                            , function (data) {
                                $scope.summaryList = data;

                            }
                    , function (data) {
//                        Notification.error(data);
                    });
                };

                $scope.getMonthWiseDetails = function (year) {
                    SummaryFactory.getMonthWiseDetails(year
                            , function (data) {
                                $scope.monthWiseList = data;
                                $scope.showMode = 'selectyear';
                            }
                    , function (data) {
//                        Notification.error(data);
                    });
                };

                $scope.changeMonth = function (month) {
                    if ($scope.countList.length > 0) {
                        $scope.tempList = [];
                        angular.forEach($scope.countList, function (data) {
                            var month1 = $filter('date')(data[0], 'MM');
                            if (month1 === month) {
                                $scope.tempList.push(data);
                            }
                        });
                    }

                };

//                $scope.getHitRate = function (value1, value2) {
////                      console.log(value1,value2);
//
//                    var rate = value1 / value2 * 100;
//                    return rate + "%";
//                };

                $scope.getEvaluateDetails = function (year) {
                    SummaryFactory.loadEveluatedDetails(year
                            , function (data) {
                                $scope.countList = data;
                            }
                    , function (data) {
//                        Notification.error(data);
                    });

                };

                $scope.getMonthlyCount = function (month, department) {
                    var label = 0;

                    angular.forEach($scope.monthWiseList, function (data) {
                        var month1 = data.date;
                        if (month === parseInt(month1)) {
                            if (department === data.department) {
                                label = data.achieved;
                                return;
                            }
                        }
                    });
                    return label;
                };
                $scope.monthTotal = function (month) {
                    var label = 0;

                    angular.forEach($scope.monthWiseList, function (data) {

                        var month1 = data.date;
                        if (month === parseInt(month1)) {
                            label += parseInt(data.achieved);
                            return;
                        }
                    });
                    return label;
                };
                $scope.achivedTotal = function () {
                    var label = 0;
                    angular.forEach($scope.monthWiseList, function (data) {
                        label += parseInt(data.achieved);
                        return;
                    });
                    return label;
                };

                $scope.totalKizanCount = function (department) {
                    var totalKizan = 0;

                    angular.forEach($scope.monthWiseList, function (data) {
                        if (department === data.department) {
                            totalKizan += parseInt(data.achieved);
                            return;
                        }

                    });
                    return totalKizan;
                };
                $scope.totalTarget = function () {
                    var totalTarget = 0;
                    var correctList = [];
                    var chech = true;

                    angular.forEach($scope.monthWiseList, function (data) {
                        var dep = data.department;
                        angular.forEach(correctList, function (value) {
                            if (dep === value.department) {
                                chech = false;
                                return;
                            }

                        });
                        if (chech) {
                            correctList.push(data);
                        }
                        chech = true;
                    });
                    angular.forEach(correctList, function (value) {
                        totalTarget += parseInt(value.target);
                    });
                    return totalTarget;
                };

                //------------top kaizen report funtion----------------

                $scope.selectTop5Year = function (year) {
                    $rootScope.top5year = year;
                };

                $scope.selectTop5Month = function (month) {
                    $scope.getTop5Kaizen($rootScope.top5year, month);
                };

                $scope.getTop5Kaizen = function (year, month) {
                    SummaryFactory.loadTop5Kaizen(year, month
                            , function (data) {
                                $scope.top5KaizenList = data;
                            }
                    , function (data) {
//                        Notification.error(data);
                    });
                };

                $scope.selectTop10Year = function (year) {
                    $rootScope.top10year = year;
                };

                $scope.selectTop10Month = function (month) {
                    $scope.getTop10Kaizen($rootScope.top10year, month);
                };

                $scope.getTop10Kaizen = function (year, month) {
                    SummaryFactory.loadTop10Kaizen(year, month
                            , function (data) {
                                $scope.top10KaizenList = data;
                            }
                    , function (data) {
//                        Notification.error(data);
                    });
                };

                $scope.getBestKaizenByYear = function (year) {
                    SummaryFactory.BestKaizens(year
                            , function (data) {
                                $scope.BestKaizenList = data;
                            }
                    , function (data) {
//                        Notification.error(data);
                    });
                };

                $scope.getEmployeeImage = function (epfNo) {
                    var imageUrl;
                    var url = systemConfig.apiUrl + "/api/document/download-image/" + epfNo + "/";
                    $scope.imageUrl = url;
                    return  imageUrl = url;
                };


                //create new top kaizen 
                $scope.keyEvent = function (e) {
                    var code = e ? e.keyCode || e.which : 13;
                    if (code === 13) {
                        $scope.EmployeeByEpfNo($scope.model.epfNo);
                    }
                };

                $scope.EmployeeByEpfNo = function (epfNo) {
                    angular.forEach($scope.employeeList, function (value) {
                        if (value.epfNo === epfNo) {
                            $scope.getEmployeeImage(epfNo);
                            $scope.model.empName = value.name;
                            $scope.model.department = value.department.name;
                        }
                    });
                };

                $scope.saveTopKaizen = function () {
                    $scope.http.saveTopkaizen();
                };



                $scope.init = function () {
                    for (var j = new Date().getFullYear(); j > 2005; j--)
                    {
                        $scope.yearList.push(j);
                    }

                    SummaryFactory.loadEmployee(
                            function (data) {
                                $scope.employeeList = data;
                            });

                };

                $scope.init();

            });



}());


