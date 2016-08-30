define([
    'backbone',
    'collections/lobbie'
], function (Backbone, Lobbie) {

    var lobbie = new Lobbie;

    var RoomView = Backbone.View.extend({
        template: $("#roomTemplate").html(),
        render: function (data) {
            var tmpl, result;
            tmpl = _.template(this.template);
            result = [];
            data.forEach(function (item) {
               result.push(tmpl({
                   joined:!!(item.roomId == lobbie.currentUserRoomID),
                   ID: item.roomId,
                   name: item.roomName
               }));
            });
            return result.join("\n");
        }
    });

    var LobbieView = Backbone.View.extend({
        el: $("#game-content"),
        template: _.template($("#rooms").html()),
        initialize: function () {
            this.listenTo(lobbie, "refreshRooms", this.refreshRooms);
        },
        events: {
            "click a[name=newroom]": "newRoom",
            "click a[name=menu]": "toMenu",
            "click a[name=quit]": "quitRoom",
            "click .room": "joinRoom"
        },
        newRoom: function () {
            lobbie.createRoom("nm");
        },
        refreshRooms: function (data) {
            var view = new RoomView();
            this.$el.find("#currentRooms").html(view.render(data));
        },
        render: function () {
            this.$el.html(this.template);

        },
        joinRoom: function (event) {
            lobbie.joinRoom(event.currentTarget.getAttribute("roomID"));
        },
        quitRoom: function (event) {
            lobbie.quitRoom();
        },
        show: function () {
            this.render();
            lobbie.start();
        },
        toMenu: function () {
            lobbie.stop();
            this.trigger("menu");
        }
    });
    return new LobbieView();
});




