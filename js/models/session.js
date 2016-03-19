define([
    'backbone'
], function (
        Backbone
        ) {
    var SessionModel = Backbone.Model.extend({
        _baseUrl: "http://localhost:10000/",
        user: "",
        sessionId: 0,
        sendPost: function (data, eventSuccess, eventError) {
            var self = this;            
            var url = this._baseUrl+(data.url||"")
            $.post(url, data)
                    .success(function (data) {
                        if (data.status == 1) {
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
           this.sendPost(data,'successAuth','errorAuth');
        },
        postRegist: function(data){
            //this.trigger("successRegist",data);
            data.url = "register";
            this.sendPost(data,"successRegist","errorRegist")
        },
        postLogin: function(data){
            this.sendPost(data,'successAuth','errorAuth');
        },
        postLogoff: function(){
            console.log("logoff");
            this.trigger('successLogoff');
            //this.sendPost({login:this.user,id:this.sessionId})
        },
        postTest: function(){
        }
    });
    return new SessionModel();
});

