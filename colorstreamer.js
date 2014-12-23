Colors = new Mongo.Collection("colors");

if (Meteor.isClient) {


  Template.body.helpers({
    colors: function() {
      return Colors.find({});
    }
  });

  Template.body.events({
    "submit .new-color": function( event ){
      var color = event.target.color.value;

      Colors.insert({
        color: color,
        createdAt: new Date()
      });

      event.target.color.value = "#FFFFFF";

      return false;

    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
