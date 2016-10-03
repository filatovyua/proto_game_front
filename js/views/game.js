define([
    'backbone',
    "models/game"
],function(Backbone, Game){
    
    var Game = new Game();
    
    var View = Backbone.View.extend({
        el: $("#game-content"),
        template:$("#game").text(),
        started: false,
        finished: false,
        socket: {},
        initialize:function(){
            //инициализация
            //this.listenTo("");

        },
        events:{
            
        },
        render:function(){
            this.$el.html(this.template);
        },
        show: function(){
            this.render();
        },
        onMessage:function(event){
            
        },
        onOpen: function(event){
            this.started = true;
        },
        onClose: function(event){
            
        }
    });
    return new View();
});

