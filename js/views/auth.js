define([
    'backbone',
    'models/session'
],function(Backbone,sessionModel){

    var View = Backbone.View.extend({
        el: $("#game-content"),
        template:$("#auth").text(),
        session:sessionModel,
        events:{
            "click .btn[type=submit]":"submitClick",
            "blur input[name=login]":"loginBlur",
            "blur input[name=password]":"passwordBlur"
        },
        initialize: function(){
            this.listenTo(this.session, 'successAuth', this.loginSuccess);
            this.listenTo(this.session, 'errorAuth', this.loginError);
            this.render();
        },
        loginSuccess: function(){
            this.trigger('success');
        },
        loginError: function(){
            console.log("error login");
        },
        render: function(){
           this.$el.html(this.template); 
        },
        loginBlur: function(){
            var login = this.$("input[name=login]").val();
            //проверка если такой логин уже есть
        },
        passwordBlur: function(){
            var password = this.$("input[name=password]").val();
            //проверка безопасности пароля
        },
        submitClick:function(){
           var login = this.$("input[name=login]").val();
           var password = this.$("input[name=password]").val();
            if (!this.validate(login, password))
                return false;
            this.session.postAuth({login:login,passwor:password});            
        },
        validate: function(login, password){
            return true;
            if (!login){
                alert("Missing login");
                return false;
            }
            if (!password){
                alert("Missing password");
                return false;
            }
            return true;
        }
                
    });
    
    return new View();
});

