define([
    'backbone',
    'models/room',
    "models/webSocket"
], function (
        Backbone,
        Room,
        WS
        ) {

    var Lobbie = Backbone.Collection.extend({
        model: Room,
        connect: null,
        currentRooms: {},
        currentUserRoomID:0,
        initialize: function () {
            this.connect = new WS("rooms");
            return (function (_this) {
                _this.connect.onmessage = function (event) {
                    var data = JSON.parse(event.data), flag = false;
                    if (data && Object.keys(data).length > 0) { 
                        if (!_this.currentRooms) _this.currentRooms = {};
                        if (!data[_this.currentUserRoomID] || Object.keys(data[_this.currentUserRoomID]).length == 0) {
                            if (_this.currentUserRoomID != 0)
                                flag = true;
                            _this.currentUserRoomID = 0;                            
                        }
                        for (var i in data){
                            if (!_.contains(Object.keys(_this.currentRooms),i)){
                                _this.currentRooms[i] = data[i];
                                flag = true;
                            }
                            if (Object.keys(data[i]).length>0 && _this.currentUserRoomID !== i) {
                                flag = true;
                                _this.currentUserRoomID = i;
                            }
                        }
                        if (flag === true){
                            _this.trigger("refreshRooms",data);
                        }
                    }
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


