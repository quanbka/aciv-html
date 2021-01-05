/* global jQuery, Bloodhound */
var Typeahead = (function ($, Bloodhound) {

    'use strict';

    var invalidContextId = '{8EE2EBC9-7C8A-448D-A7D7-FA6939EAA910}',
        $professionalSearchInputs = $('.search-form form[name="our-people-search"] input[type="search"]'),
        $professionalSearchContextId = 'C1784575-7152-41A8-8A92-543F9DEF8F93',

        $insightAdvancedSearchInputs = $('form#insight-advanced-search input[type="search"]'),
        $insightSearchInputs = $('form#insight-search input[type="search"]'),
        $insightSearchContextId = 'C1784575-7152-41A8-8A92-543F9DEF8F94',

        $headerSiteSearchInputs = $('.header .header-search .header-search-input'),
        $globalSiteSearchInputs = $('form#site-search input[type="search"]'),
        $globalSiteSearchContextId = 'B9B20A96-54B2-4E41-8D16-7E9F47E796C9',

        $intelligenceSearchInputs = $('form#intelligence-search input[type="search"]'),
        $intelligenceSearchContextId = 'FAEA9892-0013-4DF4-9B30-A349AD12A1AF';
	return {

        init: function () {
            this.setupTypeahead($professionalSearchInputs, $professionalSearchContextId);
            this.setupTypeahead($insightAdvancedSearchInputs, $insightSearchContextId);
            this.setupTypeahead($insightSearchInputs, $insightSearchContextId);
            this.setupTypeahead($globalSiteSearchInputs, $globalSiteSearchContextId);
            this.setupTypeahead($headerSiteSearchInputs, $globalSiteSearchContextId);
            this.setupTypeahead($intelligenceSearchInputs, $intelligenceSearchContextId);
        },

        setupTypeahead: function ($inputs, $contextId) {
            $inputs.each(function (index) {
                var el = $(this);

                var data = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    limit: 5,
                    remote: {
                        url: '/api/autocomplete/%PHRASE?contextId=' + $contextId,
                        wildcard: '%PHRASE',
                        filter: function (data) {
                            return $.map(data, function (term) {
                                return { phrase: term.Phrase, url: term.Url };
                            });
                        }
                    }
                });

                data.initialize();

                el.typeahead({
                    highlight: true,
                    minLength: 2
                }, {
                    name: 'data' + index,
                    displayKey: 'phrase',
                    source: data.ttAdapter(),
                    templates: {
                        suggestion: function (data) {
                            if (data.url) {
                                return '<div><a href="' + data.url + '">' + data.phrase + '</a></div>';
                            } else {
                                return '<div>' + data.phrase + '</div>'
                            }
                        }
                    }
                });
            });
        }
    };
})(jQuery, Bloodhound);

Typeahead.init();
