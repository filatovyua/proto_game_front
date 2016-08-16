define([
    'backbone'
], function (
        Backbone
        ) {
    var Room = Backbone.Model.extend({
        users:[],
        initialize: function(){
            
        },
        clear: function(){
            
        },
        join: function(){
            
        },
        defaults:{
            name: "test",
            roomId: "1",
            photo: ""
        }
    });
      
    return Room;
})


