define([
    'backbone'
], function (
        Backbone
        ) {
    var SessionModel = Backbone.Model.extend({
        _baseUrl: "http://localhost:9000/",
        user: "",
        sessionId: 0,
        sendPost: function (action, data, eventSuccess, eventError) {
            var self = this;            
            var url = this._baseUrl + action;
            $.post(url, data)
                    .success(function (data) {
                        console.log(data);
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
            console.log("logoff");
            this.trigger('successLogoff');
            //this.sendPost({login:this.user,id:this.sessionId})
        },
        postTest: function(){
        },
        ws: null,
        socketOpen: function(eventOpen, eventMessage){
            this.ws = new WebSocket(this._baseUrl+"/gameplay");
            this.ws.onopen = eventOpen;
            this.ws.onmessage = eventMessage;            
        },
        socketClose: function(){
            console.log("connection is over");
        },
        socketSend: function(data){
            this.ws.send(data);
        }
    });
    return new SessionModel();
});

