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
            this.listenTo(this.session, 'successLogoff', this.exit);
        },
        events:{
          "click a[name=newgame]":"newGame",
          "click a[name=profile]":"showProfile",
          "click a[name=scores]":"showScores",
          "click a[name=settings]":"showSettings",
          "click a[name=exit]":"logoff"
        },
        render:function(){
            this.$el.html(this.template);
        },
        show: function(){
            this.render();
        },
        newGame:function(){
            this.trigger("game");
        },
        showProfile: function(){
            this.trigger("profile");
        },
        showScores:function(){
            this.trigger("scores");
        },
        showSettings: function(){
            this.trigger("settings");  
        },
        logoff:function(){
            this.session.postLogoff();
        },
        exit:function(){
            this.trigger("exit");
        }
    });
    return new View();
});



