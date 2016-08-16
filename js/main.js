requirejs.config({
    paths:{
        "jquery":"lib/jquery",
        "backbone":"lib/backbone",
        "underscore":"lib/underscore",
        "session": "models/session",
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
    'route'
], function(
        Backbone,
        Router
        ){
    Backbone.history.start();
});

