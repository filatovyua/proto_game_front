define([
    'backbone',
    'models/session'
],function(Backbone, sessionModel){
    var View = Backbone.View.extend({
        el: $("#game-content"),
        session:sessionModel,
        template:$("#menu").text(),
        initialize:function(){
            //инициализация
            
        },
        render:function(){
            this.$el.html(this.template);
        },
        show: function(){
            this.render();
        }
    });
    return new View();
});



