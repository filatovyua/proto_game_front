define([
    'backbone',
    'models/session'
],function(Backbone, sessionModel){
    var View = Backbone.View.extend({
        el: $("#game-content"),
        session:sessionModel,
        template:$("#profile").text(),
        initialize:function(){
            //инициализация

        },
        events:{
            
        },
        render:function(){
            this.$el.html(this.template);
        },
        show: function(){
            this.render();
        },

    });
    return new View();
});





