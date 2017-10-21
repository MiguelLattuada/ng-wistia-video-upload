describe('Component: wistiaVideoEmbed', function () {

    var element, scope;

    beforeEach(module('wistia-video-uploader'));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        scope = _$rootScope_.$new();
        element = angular.element('<wistia-video-embed hash-id="viewData.hashId"></wistia-video-embed>');
        element = _$compile_(element)(scope);
    }));

    it('should display an iframe with the defined hash id as src', function () {
        var hashId = '0ab882_1x',
            expectedValue = 'https://fast.wistia.net/embed/iframe/' + hashId + '?videoFoam=true',
            $iframeElement = element.find('iframe');
        scope.viewData = { hashId: hashId };
        scope.$digest();
        expect($iframeElement.attr('src')).toEqual(expectedValue);
    });

});