define([
    'backbone'
], function (
        Backbone
        ) {
    var SessionModel = Backbone.Model.extend({
        url: "",
        user: "",
        sessionId: 0,
        sendPost: function (data, eventSuccess, eventError) {
            var self = this;
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
            this.trigger('successAuth',data);
           //this.sendPost(data,'successAuth','errorAuth');
        },
        postLogin: function(){
            this.trigger('successAuth',data);
        },
        postLogoff: function(){
            console.log("logoff");
            this.trigger('successLogoff');
            //this.sendPost({login:this.user,id:this.sessionId})
        }
    });
    return new SessionModel();
});


