require.config({
    paths:{
        "jquery":"lib/jquery",
        "backbone":"lib/backbone",
        "underscore":"lib/underscore"
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

