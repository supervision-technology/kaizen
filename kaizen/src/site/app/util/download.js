//(function () {
//    angular.module("AppModule").directive('pdfDownload', function () {
//        return {
//            restrict: 'E',
//            templateUrl: 'app/transaction/manager/manager-view.html',
//            scope: true,
//            link: function (scope, element, attrs) {
//                var anchor = element.children()[0];
//
//                // When the download starts, disable the link
//                scope.$on('download-start', function () {
//                    $(anchor).attrs('disabled', 'disabled');
//                });
//
//                // When the download finishes, attach the data to the link. Enable the link and change its appearance.
//                scope.$on('downloaded', function (event, data) {
//                    $(anchor).attrs({
//                        href: 'data:application/pdf;base64,' + data,
//                        download: attrs.filename
//                    })
//                            .removeAttr('disabled')
//                            .text('Save')
//                            .removeClass('btn-primary')
//                            .addClass('btn-success');
//
//                    // Also overwrite the download pdf function to do nothing.
//                    scope.downloadPdf = function () {
//                    };
//                });
//            }
//
//        };
//    });
//
//}());
