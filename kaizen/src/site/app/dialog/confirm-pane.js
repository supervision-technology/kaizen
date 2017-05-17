(function () {
    angular.module("AppModule")
            .service("ConfirmPane", function ($uibModal, $q) {
                var defer;

                var ctrl = function (type, message, title) {
                    function Controller(modalInstance, $timeout) {
                        //modal instance
                        this.modalInstance = modalInstance;
                        this.timeout = $timeout;

                        //message
                        this.message = message;

                        //title
                        this.title = title;

                        //class and icon
                        switch (type) {
                            case 'primary':
                                this.optionPaneClass = 'option-pane-primary';
                                this.optionPaneIcon = 'glyphicon glyphicon-tag';
                                this.title = typeof this.title === 'undefined' ? 'Confirm' : this.title;
                                break;
                            case 'info':
                                this.optionPaneClass = 'option-pane-info';
                                this.optionPaneIcon = 'glyphicon-bell';
                                this.title = typeof this.title === 'undefined' ? 'Information' : this.title;
                                break;
                            case 'success':
                                this.optionPaneClass = 'option-pane-success';
                                this.optionPaneIcon = 'glyphicon-ok';
                                this.title = typeof this.title === 'undefined' ? 'Success' : this.title;
                                break;
                            case 'warning':
                                this.optionPaneClass = 'option-pane-warning';
                                this.optionPaneIcon = 'glyphicon-warning-sign';
                                this.title = typeof this.title === 'undefined' ? 'Warning' : this.title;
                                break;
                            case 'danger':
                                this.optionPaneClass = 'option-pane-danger';
                                this.optionPaneIcon = 'glyphicon-remove';
                                this.title = typeof this.title === 'undefined' ? 'Danger' : this.title;
                                break;
                            default:
                                this.optionPaneClass = 'option-pane-default';
                                this.optionPaneIcon = 'glyphicon-bell';
                                this.title = typeof this.title === 'undefined' ? 'Note' : this.title;
                                break;
                        }

                    }

                    Controller.prototype = {
                        confirm: function () {
                            var scope = this;
                            this.timeout(function () {
                                scope.modalInstance.close();
                                defer.resolve();
                            }, 250);
                        },
                        discard: function () {
                            var scope = this;
                            this.timeout(function () {
                                scope.modalInstance.close();
                                defer.reject();
                            }, 250);
                        }
                    };

                    return ['$uibModalInstance', '$timeout', Controller];
                };

                this.confirm = function (optionType, message, title) {
                    defer = $q.defer();

                    $uibModal.open({
                        animation: true,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: './app/dialog/confirm-pane.html',
                        controller: ctrl(optionType, message, title),
                        controllerAs: '$ctrl',
                        size: 'md'
                    });

                    return {
                        confirm: function (callback) {
                            defer.promise.then(callback, null);
                            return this;
                        },
                        discard: function (callback) {
                            defer.promise.then(null, callback);
                            return this;
                        }
                    };
                };

                this.primaryConfirm = function (message, title) {
                    return this.confirm('primary', message, title);
                };

                this.infoConfirm = function (message, title) {
                    return this.confirm('info', message, title);
                };

                this.successConfirm = function (message, title) {
                    return this.confirm('success', message, title);
                };

                this.warningConfirm = function (message, title) {
                    return this.confirm('warning', message, title);
                };

                this.dangerConfirm = function (message, title) {
                    return this.confirm('danger', message, title);
                };

                this.defaultConfirm = function (message, title) {
                    return this.confirm('default', message, title);
                };
            });
}());