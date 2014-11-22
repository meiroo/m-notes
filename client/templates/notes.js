//Notes = new Meteor.Collection("notes");
//Notes.insert({ title:"Title one test", content: "dsfasffffffffffffffffffsfdafda", createdAt: new Date()   });
//Notes.insert({ title:"Title two test", content: "dsfasffffffffffffffffffsfdafda", createdAt: new Date()   });
//Notes.insert({ title:"Title three test", content: "dsfasffffffffffffffffffsfdafda", createdAt: new Date()   });

//if (Meteor.isClient) {
  // counter starts at 0
 // Session.setDefault("counter", 0);
  global = {
    current_page:1,
    current_edit:-1,
    notes_length: 0,
  };

  Template.body.helpers({
    notes:function(){
      console.log("body helper notes...");
      console.log("collection size = " + Notes.find({}).count());
    	var notes = null;
      var query = {};
      var filter = Session.get("filter");
      if(filter){
        var re = /.*/;
        query.filter = {   $regex:   ".*"+filter+".*" };
      }
      var page = Session.get("current_page") -1 ;
      if(Session.get("status") == "1"){
    	   var usr =  Meteor.user();
    	    if(!usr || !usr.emails || !usr.emails[0].address){
    	     return false;
    	    }
   	      var author = usr.emails[0].address;
          query.author = author;
          notes =  Notes.find(query, { sort : { createdAt : -1 } , skip: page*5, limit: 5});
    	}else{
          notes =  Notes.find(query, { sort : { createdAt : -1 } , skip: page*5, limit: 5});
      }
      Template.body.flush(Notes.find(query).count());
      
      return notes;
    }
  });

Template.body.flush = function(pagenum){
  console.log("body flush...");
  console.log("pagenum size = " + pagenum);
  $("#pagination").pagination({
    total_pages: (pagenum-1)/5 + 1, 
    current_page: Session.get("current_page"),
    callback: function(event, page) {
        global.current_page = page;
        Session.set("current_page",page);
      }
  });
}


Template.body.rendered = function () {
    //Template.body.flush();
};

Template.body.created = function () {
  console.log("body created...");
  console.log("collection size = " + Notes.find({}).count()); 
};


//}
