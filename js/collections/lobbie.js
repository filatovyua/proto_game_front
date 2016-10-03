define([
    'backbone',
    'models/room',
    "models/webSocket",
    "models/session"
], function (
        Backbone,
        Room,
        WS,
        Session
        ) {
    /**
     * Формат приема JSON
     * [{id:1,rn:"lol",ps:{"user":{}}}]
     * 
     */
    var Lobbie = Backbone.Collection.extend({
        model: Room,
        connect: null,
        currentRooms: [],
        currentUserRoomID: 0,
        initialize: function () {
            this.connect = new WS("rooms");
            return (function (_this) {
                _this.connect.onmessage = function (event) {
                    var data;
                    data = JSON.parse(event.data);
                    if (!_this.currentRooms)
                        _this.currentRooms = [];
                    if (!_.isEqual(_this.currentRooms, data)) {
                        _this.currentUserRoomID = 0;
                        _this.currentRooms = data;
                        //находим в какой комнате находится пользователь
                        data.forEach(function (item) {
                            if (item.players[Session.getUser()])
                                _this.currentUserRoomID = item.roomId;
                        });
                        _this.trigger("refreshRooms", data);
                    }
                };
                _this.connect.onopen = function(){
                    _this.currentRooms = [];
                }
                _this.connect.onerror = function (data) {
                    console.log(data);
                }
            })(this);
        },
        createRoom: function (name) {
            this.connect.send(JSON.stringify({
                action: "create",
                name: name || "default"
            }));
        },
        joinRoom: function (roomID) {
            if (!roomID)
                throw new Error("RoomID is not find");
            this.connect.send(JSON.stringify({
                action: "join",
                roomId: roomID
            }));
        },
        quitRoom: function () {
            if (!this.currentUserRoomID)
                return null;
            this.connect.send(JSON.stringify({
                action: "quit",
                roomId: this.currentUserRoomID
            }));
        },
        start: function () {
            this.connect.open();
        },
        stop: function () {
            this.connect.close();
        }
    });

    return Lobbie;
})


