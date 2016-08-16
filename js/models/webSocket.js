define([
], function () {
    var WS = function(_url){
        this.WsHost = "ws://localhost:9000";
        this.connectionTimeLimit = 100;
        this.url = _url;
        this.onopen  = function(){ console.log("connection start");}
        this.onmessage = function(data){ 
        }
        this.onerror = function(data){ 
            console.log("error",data);
            
        }
        this.onclose = function(event){
              if (event.wasClean) {
                console.log('connection clear');
              } else {
                console.log('disconnect'); // например, "убит" процесс сервера
              }
              console.log('Code: ' + event.code + ' reason: ' + event.reason);
        }
    }
    WS.prototype.open = function(){
        this.ws = new WebSocket(this.WsHost + "/" + this.url); 
        this.ws.onmessage = this.onmessage;
        this.ws.onerror = this.onerror;
        this.ws.onopen = this.onopen;    
        this.ws.onclose = this.onclose;
    }
    WS.prototype.close = function(){
        this.ws.close();
    }
    WS.prototype.reconnect = function(){
        this.open();
    }
    WS.prototype.send = function(data){
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
    return WS;
});

