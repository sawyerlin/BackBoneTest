define(['jquery', 'underscore', 'backbone', 'views/portail'], function($, _, Backbone, PortailView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '*actions': 'showPage'
        }
    });

    var initialize = function() {
        var appRouter = new AppRouter(),
            portailView = new PortailView();
        appRouter.on('route:showPage', function(action) {
            portailView.render(action);
        });
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});
