(function () {
    angular.module("AppModule")
            .factory("newsFeedFactory", function ($http, systemConfig) {
                var factory = {};

                return factory;
            });
    angular.module("AppModule")
            .controller("newsFeedController", function ($http, $filter, $rootScope, systemConfig, $scope, newsFeedFactory, Notification) {

                //http models
                $scope.http = {};
                //news models
                $scope.news = {
                    remark: null
                };
                //------------http funtion------------

                $scope.imageUpload = function (event) {
                    var pdffile = document.getElementById("uploadPDF").files[0];
                    var pdffile_url = URL.createObjectURL(pdffile);
                    $('#viewer').attr('src', pdffile_url);
                };


                $scope.save = function () {
                    var formData = new FormData();
                    var file = document.getElementById('uploadPDF').files[0];
                    var json = JSON.stringify($scope.news);

                    if (file) {
                        var url = systemConfig.apiUrl + "/api/news/save-newsfeed";

                        formData.append("file", file);
                        formData.append("ad", json);

                        var xhr = new XMLHttpRequest();

                        xhr.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status === 200) {
                                var url = systemConfig.apiUrl + "/api/news";
                                $http.get(url)
                                        .success(function (data, status, headers) {
                                            $scope.news = {};
                                            $rootScope.newsFeeds = data;
                                        })
                                        .error(function (data, status, headers) {

                                        });
                                Notification.success("Successfully Added..");
                            }
                        };
                        xhr.open("POST", url);
                        xhr.send(formData);
                    } else {
                        Notification.error("Please browse pdf");

                    }
                };

                $scope.init = function () {

                };
                $scope.init();
            });
}());