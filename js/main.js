requirejs.config({
    paths:{
        "jquery":"lib/jquery",
        "backbone":"lib/backbone",
        "underscore":"lib/underscore",
        "session": "models/session",
        "ws":"models/webSocket"
    },
    shim:{
        'backbone':{
            deps: ['underscore','jquery'],
            exports: 'Backbone'
        },
        'underscore':{
            exports:'_',
        },
        'jQuery':{
            export:'$'
        },
        'lobbie':{
            deps: ['rooms','lobbie']
        }
    }
});
define([
    'backbone',
    'jquery',
    'route'
], function(
        Backbone,
        route,
        jQuery
        ){
    Backbone.history.start();
});

