Meteor.startup(function () {
    // code to run on server at startup
});


Meteor.methods({
  exportJSON: function () {
  	var str = JSON.stringify(Notes.find({},{limit:10}).fetch());
  	return str;
  },
  download: function(){
  	var stream = Npm.require("stream");
  	var set = Notes.find({});
     var s = new stream.Readable();
    s._read = function noop() {};

     set.forEach(function (note) {
      s.push(JSON.stringify(note));
     });

     s.push(null);
     return s;
  }
});