'use strict';

(function (ng) {
    var MODULE_NAME = 'wistia-video-uploader';
    // Check angular is correctly loaded
    if (!ng || (ng.version && ng.version.minor < 5)) throw Error('Could not load ' + MODULE_NAME + ' angular >1.5.x is required');
    // Create angular module and component
    angular
        .module(MODULE_NAME, [])
        .component('wistiaVideoUploader', require('./video-uploader/video-uploader'))
        .component('wistiaVideoEmbed', require('./video-embed/video-embed'));
})(window['angular']);