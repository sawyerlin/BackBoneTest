require.config({
    paths: {
        jquery: 'libs/jquery',
        underscore: 'libs/underscore',
        text: 'libs/text',
        backbone: 'libs/backbone',
        backboneretryslin: 'libs/backbone-retryslin',
        loglevel: 'libs/loglevel',
        templates: '../templates'
    }
});

require(['app'], function(App) {
    App.initialize();
});
