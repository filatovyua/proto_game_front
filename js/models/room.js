define([
    'backbone'
], function (
        Backbone
        ) {
    var Room = Backbone.Model.extend({
        defaults:{
            name: "test",
            ID: "1",
            photo: ""
        }
    });
      
    return Room;
})


