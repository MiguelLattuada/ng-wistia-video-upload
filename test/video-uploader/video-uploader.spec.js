describe('Component: wistiaVideoUploader', function () {

    var element, scope, componentController;

    beforeEach(module('wistia-video-uploader'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$componentController_) {
        scope = _$rootScope_.$new();
        componentController = _$componentController_;
        element = angular.element('<wistia-video-uploader api-password="viewData.apiPassword"></wistia-video-uploader>');
        element = _$compile_(element)(scope);
    }));

    it('should disable main form if no password api is set', function () {
        var $mainFormFieldset = element.find('form').find('fieldset').eq(0)[0];
        expect($mainFormFieldset.hasAttribute('disabled')).toBeFalsy();
    });

    it('should enable main form if password api is set', function () {
        var $mainFormFieldset = element.find('form').find('fieldset').eq(0)[0];
        scope.viewData = {
            apiPassword: 'a9d10ebae82992817c8ca793ed9a36f9'
        };
        scope.$digest();

        expect($mainFormFieldset.hasAttribute('disabled')).toBeTruthy();
    });

    it('should hide wistia-video-embed component if hash id is not set', function () {
        var ctrl = element.isolateScope().$ctrl,
            form = element.find('form'),
            $wistiaVideoEmbedFieldset = form.find('fieldset').eq(1);
        scope.$digest();
        expect($wistiaVideoEmbedFieldset.hasClass('ng-hide')).toBeTruthy();
    });

    it('should hide main form if hash id is set', function () {
        var ctrl = element.isolateScope().$ctrl,
            form = element.find('form'),
            $mainFormFieldset = form.find('fieldset').eq(0),
            $wistiaVideoEmbedFieldset = form.find('fieldset').eq(1);
        ctrl.viewModel.currentHashedId = '0xa882n';
        scope.$digest();;

        expect($mainFormFieldset.hasClass('ng-hide')).toBeTruthy();
        expect($wistiaVideoEmbedFieldset.hasClass('ng-hide')).toBeFalsy();
    });

});