define([
    'backbone',
    'models/session',
    'collections/lobbie'
],function(Backbone, sessionModel, Lobbie){
    
        //demo data
    var testRooms = [
        { ID: "1", name: "testLol" },
        { ID: "2", name: "testLol" },
        { ID: "3", name: "testLol" },
        { ID: "4", name: "testLol" },
        { ID: "5", name: "testLol" }
    ];
    var RoomView = Backbone.View.extend({
        tagName: "room",
        className: "room-container",
        template: $("#roomTemplate").html(),
        
        render: function(){
           
            var tmpl = _.template(this.template);
            $(this.el).html(tmpl(this.model.toJSON()));
            return this;
        }
    });
       
    var LobbieView = Backbone.View.extend({
        el: $("#game-content"),
        template:$("#rooms").text(),
        roomsContainer:"#currentRooms",
        lobbie: null,
        initialize:function(){
            this.listenTo(Backbone,"sayHello", function(){
                console.log("!");
            });
            this.lobbie = new Lobbie();
            this.refreshRooms();
        },
        events:{
            "click a[name=newroom]":"newRoom",
            "click a[name=refrash]":"refrashRooms",
            "click a[name=menu]":"toMenu"
        },
        render:function(){
            this.$el.html(this.template);
                        
        },
        renderRoom: function(item){
            var roomView = new RoomView({
                model:item
            });
            $(this.roomsContainer).append(roomView.render().el);
        },
        refreshRooms: function(){            
            //получаем список комнат
            Backbone.trigger("getRooms",[]);
        },
        show: function(){
            this.render();
        },
        newRoom: function(){
            
        },
        toMenu: function(){
           this.trigger("menu");
        },
        onMessage:function(event){
            
        },
        onOpen: function(event){
            this.refreshRooms();
        },
        onClose: function(event){
            
        }
    });
    return new LobbieView();
});




