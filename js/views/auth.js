define([
    'backbone',
    'models/session'
], function (Backbone, sessionModel) {

    var View = Backbone.View.extend({
        el: $("#game-content"),
        template: $("#auth").text(),
        session: sessionModel,
        events: {
            "click .btn[name=signin]": "submitClick",
            "click .btn[name=signup]": "signUpClick",
            "blur input[name=login]": "loginBlur",
            "blur input[name=password]": "passwordBlur"
        },
        initialize: function () {
            this.listenTo(this.session, 'successAuth', this.loginSuccess);
            this.listenTo(this.session, 'successRegist', this.registSuccess);
            this.listenTo(this.session, 'errorAuth', this.loginError);
        },
        loginSuccess: function () {
            this.session.user = this.getLogin();
            var max = 1024;
            this.session.id = Math.floor(Math.random() * (max + 1));
            this.trigger('success');
        },
        show: function () {
            this.render();
        },
        loginError: function () {
            console.log("error login");
        },
        render: function () {
            this.$el.html(this.template);
        },
        getLogin: function () {
            return this.$("input[name=login]").val() || "";
        },
        getPassword: function () {
            return this.$("input[name=password]").val() || "";
        },
        loginBlur: function () {
            var login = this.getLogin();
            //проверка если такой логин уже есть
        },
        passwordBlur: function () {
            var password = this.getPassword();
            //проверка безопасности пароля
        },
        submitClick: function () {
            var login = this.getLogin();
            var password = this.getPassword();
            if (!this.validate(login, password))
                return false;
            this.session.postAuth({login: login, password: password});
        },
        validate: function (login, password) {
            return true;
            if (!login) {
                alert("Missing login");
                return false;
            }
            if (!password) {
                alert("Missing password");
                return false;
            }
            return true;
        },
        signUpClick: function () {
            var login = this.getLogin();
            var password = this.getPassword();
            if (!this.validate(login,password))
                return false;
            this.session.postRegist({login: login, password: password, "registration":"1"});
        },
        registSuccess:function(){
            console.log("regist success");
            this.loginSuccess();
        }

    });

    return new View();
});

