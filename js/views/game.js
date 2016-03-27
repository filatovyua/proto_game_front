define([
    'backbone',
    'models/session'
],function(Backbone, sessionModel){
    var View = Backbone.View.extend({
        el: $("#game-content"),
        session:sessionModel,
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

