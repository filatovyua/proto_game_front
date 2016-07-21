define([
    'backbone'
], function (
        Backbone
        ) {
    var SessionModel = Backbone.Model.extend({
        _baseUrl: "http://localhost:9000/",
        user: "",
        sessionId: 0,
        sendPost: function (action, data, eventSuccess, eventError, type) {
            var self = this;   
            var type = type || "JSON";
            var url = this._baseUrl + action;
            console.log(this._baseUrl+action);
            $.post(url, data)
                    .success(function (data) {
                        if (type == "JSON")
                            data = JSON.parse(data);
                        if (data.status == "1") {
                            self.trigger(eventSuccess, data);
                        } else {
                            self.trigger(eventError, data.message)
                        }
                    })
                    .error(function (data) {
                        self.trigger(eventError, "Error");
                    });
        },
        postAuth: function(data){
           //this.trigger('successAuth',data);
           this.sendPost("auth",data,'successAuth','errorAuth');
        },
        postRegist: function(data){
            //this.trigger("successRegist",data);
            this.sendPost("register",data,"successRegist","errorRegist")
        },
        postLogin: function(data){
            this.sendPost(data,'successAuth','errorAuth');
        },
        postLogoff: function(){
            this.sendPost("logout",{login:this.user,id:this.sessionId},"successLogoff","errorLogoff")
        }
    });
    return new SessionModel();
});

