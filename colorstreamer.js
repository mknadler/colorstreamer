Colors = new Mongo.Collection("colors");
ColorOptions = new Mongo.Collection("options")

if (Meteor.isClient) {

  Template.body.helpers({
    colors: function() {
      return Colors.find({}, {sort: {createdAt: -1}});
    },
    option: function() {
      var result = ColorOptions.find();
      console.log(result);
      return ColorOptions.find();
    }
  });

  Template.body.events({
    "submit .new-color": function( event ){
      var color = event.target.color.value;
      Meteor.call("addColor", color);
      event.target.color.value = "";
      event.preventDefault();
      return false;
    }
  });

  Template.colorpick.helpers({
  });

  Template.colorpick.events({
    "click div.color-option": function(){
      console.log(this.color);
      Meteor.call("addColor", this.color);
    }
  });

  Template.colorbar.events({
    "click .colorbar": function () {
          return false;
        }
  });

}

Meteor.methods({
  addColor: function(color){
      Colors.insert({
        color: color,
        createdAt: new Date()
      });
      var toDelete = Colors.find({}, {sort: {createdAt: -1}, skip: 20});
      toDelete.forEach(function (color){
        Colors.remove(color._id);
      });
  }

});

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (ColorOptions.find().count() === 0) {
      var options = ["#c1272d", "#ed1c24", "#f15a24","#f7931e","#fbb03b","#fcee21","#d9e021","#8cc63f","#39b54a","#009245","#006837","#22b573","#00a99d","#29abe2","#0071bc","#2e3192","#1b1464","#662d91","#93278f","#9e005d","#d4145a","#ed1e79","#000000","#333333","#808080","#CCCCCC","#F2F2F2"];
      _.each(options, function(col){
        ColorOptions.insert({
          color: col
        });
      });
    }
  });
}