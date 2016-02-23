var Router = Backbone.Router.extend({
    routes:{
        "":"menu",
        "#menu":"menu",
        "#auth":"auth",
        "#start":"start",
        "#about":"about",
        "#contact":"contact"
    },
    menu:function(){
        //начальный экран
    },
    auth:function(){
        //авторизация
    },
    start:function(){
        //начало игры
    }
});

var Menu = Backbone.View.extend({
    getData: function($el){
        return {
            
        }
    },
    events:{
        "click .btn[type=submit]":"gameStart"
    },
    initialize:function(){
        this.listenTo(this.model,"change",this.gameStart);
    },
    render:function(){
        
    },
    gameStart: function(){
        
    }
});


var Button = Backbone.Model.extend({
    initialize: function () {

    },
    action: function () {

    },
    deafaults: {
        active: false,
        text: null
    }
});


Backbone.history.start({pushState:true});
