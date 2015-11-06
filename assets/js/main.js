require.config({
    paths: {
        jquery: 'libs/jquery',
        underscore: 'libs/underscore',
        text: 'libs/text',
        backbone: 'libs/backbone',
        loglevel: 'libs/loglevel',
        templates: '../templates'
    }
});

require(['app'], function(App) {
    App.initialize();
});
