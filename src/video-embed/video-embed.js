'use strict';

module.exports = (function () {
    VideoEmbedComponentController.$inject = ['$sce'];

    function VideoEmbedComponentController($sce) {
        var self = this;
        self.viewModel = { };

        self.$onInit = function() {
        }

        self.$onChanges = function() {
            self.viewModel.iframeSrc = $sce.trustAsResourceUrl(['https://fast.wistia.net/embed/iframe/', self.hashId, '?videoFoam=true'].join(''));
        }
    }

    return {
        template: require('./video-embed.html'),
        controller: VideoEmbedComponentController,
        bindings: {
            hashId: '<'
        }
    };
})();