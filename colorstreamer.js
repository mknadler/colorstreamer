Colors = new Mongo.Collection("colors");

if (Meteor.isClient) {


  Template.body.helpers({
    colors: function() {
      return Colors.find({}, {sort: {createdAt: -1}});
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
  },
 
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
