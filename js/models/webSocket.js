define([
    'backbone'
], function (Backbone) {

    var WsConnect = Backbone.Model.extend({
        _baseUrl: "ws://localhost:9000/gameplay",
        ws: null,
        connectionTimeLimit: 100,
        open: function () {
            this.ws = new WebSocket(this._baseUrl);

            this.ws.onopen = (function (_this) {
                return function (e) {
                    _this.trigger("socketOpen", [e]);
                }
            })(this);

            this.ws.onmessage = (function (_this) {
                return function (event) {
                    console.log(event);
                    _this.trigger("socketMessage", [event.data])
                }
            })(this);
            this.ws.onclose = (function (_this) {
                return function (event) {
                    _this.trigger("socketClose", [event]);
                }
            })(this);

            this.ws.onerror = (function (_this) {
                return function (error) {
                    _this.trigger("socketError", [error.message]);
                }
            })(this);
        },
        sendMessage: function (data) {
            if (this.ws == null)
                throw new Error("WebSocked is not open");
            var counter = 0, l = this.connectionTimeLimit;
            function waitForSocketConnection(socket, callback) {
                setTimeout(function () {
                    if (socket.readyState === 1) {
                        if (callback != null) {
                            callback();
                        }
                        return;

                    } else {
                        if (++counter>=l){
                            console.log("Connection lost");
                             return;
                        }
                        console.log("wait for connection...")
                        waitForSocketConnection(socket, callback);
                    }

                }, 5); // wait 5 milisecond for the connection...
            }
            return (function (_this) {
                waitForSocketConnection(_this.ws, function () {
                    console.log("message sent", data);
                    _this.ws.send(data);
                });
            })(this);
        }
    });
    return new WsConnect();
});

