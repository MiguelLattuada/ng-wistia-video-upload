'use strict';

module.exports = (function () {
    VideoUploaderComponentController.$inject = ['$element', '$scope'];

    function VideoUploaderComponentController($element, $scope) {
        var self = this;
        self.viewModel = {};

        self.$onInit = function () {
            if (self.apiPassword) {
                self.viewModel.wistiaUrl = 'https://upload.wistia.com?api_password=' + self.apiPassword;
            }
        };

        self.$postLink = function () {
            // Save a ref to template, and file upload shortcut
            self.viewRef = $element[0];
            self.$fileUploadInput = self.viewRef.querySelector('input.video-uploader-fu');
            _bindFileUploadEvents(self.viewModel.wistiaUrl);
        };

        /**
         * Trigger file upload click
         */
        self.selectAndUploadFile = function () {
            self.$fileUploadInput.click();
        };

        /**
         * Define onchange handler
         */
        function _onChange(event) {
            var files = Array.from(self.$fileUploadInput.files);
            if (files && files.length) {
                $scope.$apply(function () {
                    self.viewModel.selectedFileName = files.reduce(function(acc, file, index, array) {
                        var concat = !index ? file.name : ', ' + file.name
                        return acc.concat(concat);
                    }, '');
                    self.viewModel.success = false;
                });
            }
        }

        /**
         * Define on file upload start event
         */
        function _onStart() {
            $scope.$apply(function () {
                self.viewModel.actionInProgress = true;
                self.viewModel.currentHashedId = undefined;
            });
        }

        /**
         * Define on file upload progress event
         */
        function _onProgress(event, data) {
            $scope.$apply(function () {
                self.viewModel.progressPercentage = parseInt(data.loaded / data.total * 100, 10);
                self.viewModel.barStyles = { 'width': self.viewModel.progressPercentage + '%' };
            });
        }

        /**
         * Define on file upload done event
         */
        function _onSuccess(e, data) {
            $scope.$apply(function () {
                _restoreViewData();
                self.viewModel.success = true;
                self.viewModel.uploadDoneMessage = 'Video successfully updated';
                self.viewModel.currentHashedId = data ? data.response().result.hashed_id: undefined;
            });
        }

        /**
         * Define on file upload error event
         */
        function _onError() {
            $scope.$apply(function () {
                _restoreViewData();
                self.viewModel.uploadDoneMessage = 'Oops! An error has occurred, try again';
            });
        }

        /**
         * Restore common view model attributes
         */
        function _restoreViewData() {
            self.viewModel.progressPercentage = undefined;
            self.viewModel.actionInProgress = false;
            self.viewModel.selectedFileName = '';
            self.$fileUploadInput.value = '';
            self.viewModel.barStyles = { 'width': '0%' };
        }

        /**
         * Bind events for file upload
         */
        function _bindFileUploadEvents(url) {
            $('input.video-uploader-fu').fileupload({
                url: url
            })
                .bind('fileuploadchange', _onChange)
                .bind('fileuploadstart', _onStart)
                .bind('fileuploadprogressall', _onProgress)
                .bind('fileuploaddone', _onSuccess)
                .bind('fileuploadfail', _onError);
        }
    }

    return {
        template: require('./video-uploader.html'),
        controller: VideoUploaderComponentController,
        bindings: {
            apiPassword: '<'
        }
    };
})();