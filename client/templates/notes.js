//Notes = new Meteor.Collection("notes");
//Notes.insert({ title:"Title one test", content: "dsfasffffffffffffffffffsfdafda", createdAt: new Date()   });
//Notes.insert({ title:"Title two test", content: "dsfasffffffffffffffffffsfdafda", createdAt: new Date()   });
//Notes.insert({ title:"Title three test", content: "dsfasffffffffffffffffffsfdafda", createdAt: new Date()   });

//if (Meteor.isClient) {
  // counter starts at 0
 // Session.setDefault("counter", 0);
 
  Template.body.helpers({
    notes:function(){
    	var notes = null;
      var query = {};
      var filter = Session.get("filter");
      if(filter){
        var re = /.*/;
        query.filter = {   $regex:   ".*"+filter+".*" };
      }

      var page = parseInt(Session.get("page"),10) -1 ;

    	if(Session.get("status") == "1"){
    	   var usr =  Meteor.user();
	   if(!usr || !usr.emails || !usr.emails[0].address){
	     //alert("请登录 !!!");
	     return false;
	    }
   	    var author = usr.emails[0].address;
          query.author = author;
          notes =  Notes.find(query, { sort : { createdAt : -1 } });
    	}else if(Session.get("status") == "0"){
          notes =  Notes.find(query, { sort : { createdAt : -1 } , skip: page*5, limit: 5});
      }

       return notes;
    }
  });

Template.body.rendered = function () {
  Session.set("status", "0");
  Session.set("page","1");

  $('#pagination-demo').twbsPagination({
        totalPages: 3,
        visiblePages: 5,
        onPageClick: function (event, page) {
          Session.set("page",page);
        }
    });
};


//}
