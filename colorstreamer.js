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
      Colors.insert({
        color: color,
        createdAt: new Date()
      });

      event.target.color.value = "";

      //console.log(allColors.length);
      // remove anything in Colors besides the last 10
      var toDelete = Colors.find({}, {sort: {createdAt: -1}, skip: 10});
      toDelete.forEach(function (color){
        Colors.remove(color._id);
      });
      return false;

    }
  });

  Template.colorbar.events({
    "click .colorbar": function () {
          Colors.remove(this._id);
        }
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
