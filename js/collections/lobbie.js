define([
    'backbone',
    'models/room',
    "models/webSocket"
], function (
        Backbone,
        room,
        Connect
        ) {
    var Lobbie = Backbone.Collection.extend({
        connect:null,
        model: room,
        initialize:function(){
            Backbone.trigger("sayHello");
            Backbone.on("getRooms",this.getRooms)
            this.listenTo(Connect,"socketOpen",function(){
                console.log("sopen");
            });
            this.listenTo(Connect, "socketMessage", function(){
                console.log("rready");
            });
        },
        /**
         * Получаем список доступных комнат
         * @returns {undefined}
         */
        getRooms: function(){
            Connect.open();
            Connect.sendMessage(
                    JSON.stringify({
                            urn: "room",
                            method: "post",
                            action: "get"
                    })
            );
        }
    });

    return Lobbie;
})


