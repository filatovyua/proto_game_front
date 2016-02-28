define([
    'backbone',
    'views/auth',
    'views/menu',
    'views/about',
    'views/contact',
    'views/profile'
], function (
        Backbone,
        auth,
        menu,
        about,
        contact,
        profile
        ) {
    var Router = Backbone.Router.extend({
        $container: null,
        initialize: function () {
            this.$container = $("#game-content");
            this.listenTo(auth, 'success', this.toMenu);
        },
        routes: {
            "": "auth",
            'login': 'loginAction',
            'logoff': 'logoffAction',
            "menu": "menuAction",
            "auth": "auth",
            "start": "startAction",
            "about": "aboutAction",
            "contact": "contactAction",
            '*default': "defaultAction"
        },
        toTbout: function(){
            about.show();
        },
        toContact: function(){
            contact.show();
        },
        toStart:function(){
            
        },
        toExit:function(){
            
        },
        toMenu: function(){
            menu.show();
        },
        defaultAction: function(){
            console.log("default");
        },
        toIndex:function(){
            console.log("index");
            this.navigate('',{trigger:true});  
        },
        toLogin:function(){
            this.navigate('login',{trigger: true});
        }
    });
    return new Router();
})



