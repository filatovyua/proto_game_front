define([
    'backbone',
    'views/auth',
    'views/menu',
    'views/about',
    'views/contact',
    'views/profile',
    'views/game',
    'views/scores',
    'views/settings'
], function (
        Backbone,
        auth,
        menu,
        about,
        contact,
        profile,
        game,
        scores,
        settings
        ) {
    var Router = Backbone.Router.extend({
        $container: null,
        initialize: function () {
            this.$container = $("#game-content");
            this.listenTo(auth, 'success', this.toMenu);
            this.listenTo(menu, 'exit', this.toIndex);
            this.listenTo(menu, 'scores', this.toScores);
            this.listenTo(menu, 'profile', this.toProfile);
            this.listenTo(menu, 'settings', this.toSettings);
            this.listenTo(menu, 'game', this.toGame);
            this.toIndex();
        },
        routes: {
            "": "toIndex",
            "auth" :"toLogin",
            "menu": "toMenu",
            "profile":"toProfile",
            "scores":"toScores",
            "game":"toGame",
            '*default': "defaultAction",
        },
        toAbout: function(){
            this.navigate('about'); 
            about.show();
        },
        toContact: function(){
            contact.show();
        },
        toMenu: function(){ 
            this.navigate('menu'); 
            menu.show();
        },
        toScores: function(){
            this.navigate('scores'); 
            scores.show();
        },
        toGame: function(){
            this.navigate('game'); 
            game.show();
        },
        toProfile: function(){
            this.navigate('profile'); 
            profile.show();
        },
        toSettings: function(){
            this.navigate("settings");
            settings.show();
        },
        defaultAction: function(){
            console.log("default");
        },
        toIndex:function(){
            this.navigate('auth',{trigger:true});  
        },
        toLogin:function(){
            auth.show();
        }
    });
    return new Router();
})



