/* global jQuery, ga, _sz */

(function($) {

    'use strict';

    // Handles Google Analytics Cross Domain Tracking for APAC, China and Japan
    // Also Handles GA Event Tracking for Binary Documents and Videos
    $('a[id!="fancybox-close"]').click(function() {

        /*******************************
        // Handle Event Tracking
        *******************************/

        var destUrl = this.href;
        var link = $(this);
        var linkText = link.text();
        var label;
        var filename;

        if (link.find('img').length > 0) {

            linkText = link.find('img').attr('src');
            // Remove the hash
            filename = linkText.substring(0, (linkText.indexOf('#') === -1) ? linkText.length : linkText.indexOf('#'));
            // Remove the querystring
            filename = filename.substring(0, (filename.indexOf('?') === -1) ? filename.length : filename.indexOf('?'));
            // Get the filename.
            filename = filename.substring(filename.lastIndexOf('/') + 1, filename.length);
            filename = filename.toLowerCase();
            linkText = filename;

        }

        if (destUrl && destUrl.indexOf('mailto:') > -1) {

            // MailTo Links
            var emailAddy = destUrl.substring(destUrl.indexOf(':') + 1, destUrl.length);
            label = emailAddy + '|' + linkText;
            ga('send', 'event', 'ContactLink', 'Email', label);
            _sz.push(['event', 'DOWNLOADS', 'Email', label]);

        } else if (link.attr('data-video')) {

            // Video Player Links
            var videoId = link.attr('data-video');
            label = videoId + '|' + linkText;
            ga('send', 'event', 'Downloads', 'Movie', label);
            _sz.push(['event', 'DOWNLOADS', 'Movie', label]);

        } else if (link.hasClass('js-folio-add')) {

            // Add to FTI Folio Button
            var folioItemUrl = link.data('folio-item-url');
            ga('send', 'event', 'FOLIO', 'AddToFolio', folioItemUrl);

        } else if (link.hasClass('folio-preview-my') || link.hasClass('js-folio-preview-count')) {
            // My FTI Folio Button
            ga('send', 'event', 'FOLIO', 'GoToFolio');

        } else if (link.hasClass('js-folio-share-email')) {

            // My FTI Folio Page Email Links Button
            ga('send', 'event', 'FOLIO', 'SendEmail');

        } else if (link.hasClass('js-folio-share-pdf')) {

            // My FTI Folio Page Create PDF Button
            ga('send', 'event', 'FOLIO', 'CreatePDF');

        } else {

            // Binary Links
            // Check if destination url has any of the following extensions.
            var extensions = ['.pdf', '.doc', '.docx', '.zip', '.ppt', '.pptx', '.xls', '.xlsx', '.txt', '.rar', '.mp3', '.pps', '.jpg', '.gif', '.tif', '.eps', '.png'];
            for (var extension in extensions) {
                if (destUrl && destUrl.indexOf(extensions[extension]) > -1) {
                    var displayExt = extensions[extension];
                    displayExt.replace('.', '');
                    displayExt = displayExt.toUpperCase();

                    // Remove the hash
                    filename = destUrl.substring(0, (destUrl.indexOf('#') === -1) ? destUrl.length : destUrl.indexOf('#'));
                    // Remove the querystring
                    filename = filename.substring(0, (filename.indexOf('?') === -1) ? filename.length : filename.indexOf('?'));
                    // Get the filename.
                    filename = filename.substring(filename.lastIndexOf('/') + 1, filename.length);
                    filename = filename.toLowerCase();

                    label = filename + '|' + linkText;

                    ga('send', 'event', 'Downloads', displayExt, label);
                    _sz.push(['event', 'DOWNLOADS', displayExt, label]);
                    break;
                }
            }
        }
    });
    // End Google Analytics

})(jQuery);
