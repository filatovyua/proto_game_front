define([
    'backbone'
], function (
        Backbone
        ) {
    var SessionModel = Backbone.Model.extend({
        url: "",
        sendPost: function (data, eventSuccess, eventError) {
            var self = this;
            self.trigger(eventSuccess,data);
            return true;
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
           this.sendPost(data,'successAuth','errorAuth');
        },
        postLogin: function(){
            
        },
        postLogoff: function(){
            
        }
    });
    return new SessionModel;
});


