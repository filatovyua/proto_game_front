define([
    'backbone',
    'models/room'
], function (
        Backbone,
        room
        ) {
    var Lobbie = Backbone.Collection.extend({
        model: room
    });

    return Lobbie;
})


