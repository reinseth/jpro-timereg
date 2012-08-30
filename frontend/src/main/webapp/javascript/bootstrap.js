require.config({
    baseUrl: 'js',
    paths: {
        '$': 'lib/jquery-1.8.0',
        '_': 'lib/underscore-1.3.3',
        'Backbone': 'lib/backbone-0.9.2'
    },
    shim: {
        '$': {
            exports: '$'
        },
        '_': {
            exports: '_'
        },
        'Backbone': {
            deps: ['$', '_'],
            exports: 'Backbone'
        }
    }
});

require(['$', 'Router'], function($, Router) {
    $(function() {
        Router.init();
    });
});