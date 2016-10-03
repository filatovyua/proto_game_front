define([
    'backbone',
    'models/session'
], function (Backbone, sessionModel) {

    var View = Backbone.View.extend({
        el: $("#game-content"),
        template: $("#auth").text(),
        events: {
            "click .btn[name=signin]": "submitClick",
            "click .btn[name=signup]": "signUpClick",
            "blur input[name=login]": "loginBlur",
            "blur input[name=password]": "passwordBlur"
        },
        initialize: function () {
            this.listenTo(sessionModel, 'successAuth', this.loginSuccess);
            this.listenTo(sessionModel, 'successRegist', this.registSuccess);
            this.listenTo(sessionModel, 'errorAuth', this.loginError);
        },
        loginSuccess: function (data) {
            sessionModel.user = data["user"];
            sessionModel.status = data["status"];
            if (window.localStorage) {
                window.localStorage.setItem(sessionModel.userLocalStorageKey, sessionModel.user);
            }
            //wsModel.open();
            this.trigger('success');
        },
        show: function () {
            if (window.localStorage) {
                window.localStorage.removeItem(sessionModel.userLocalStorageKey);
            }
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
            sessionModel.postAuth({login: login, password: password});
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
            if (!this.validate(login, password))
                return false;
            sessionModel.postRegist({login: login, password: password, "registration": "1"});
        },
        registSuccess: function () {
            console.log("regist success");
            this.submitClick();
        }

    });

    return new View();
});

