define([
    'backbone',
    'models/session',
    'views/menu',
    'collections/lobbie'
],function(Backbone, sessionModel, menu, Lobbie){
    
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
        session:sessionModel,
        template:$("#rooms").text(),
        roomsEl:$("#currentRooms"),
        initialize:function(){
            //инициализация
            this.collection = new Lobbie(testRooms);
            this.render();            
        },
        events:{
            "click a[name=newroom]":"newRoom",
            "click a[name=menu]":"toMenu"
        },
        render:function(){
            this.$el.html(this.template);
            //грузим комнаты
            var self = this;
            _.each(this.collection.models, function(item){
                self.renderRoom(item);
            });
                        
        },
        renderRoom: function(item){
            var roomView = new RoomView({
                model:item
            });
            this.roomsEl.append(roomView.render().el);
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
            this.started = true;
        },
        onClose: function(event){
            
        }
    });
    return new LobbieView();
});




