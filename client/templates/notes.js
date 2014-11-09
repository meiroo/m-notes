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
    	if(Session.get("only_me")){
    	   var usr =  Meteor.user();
	   if(!usr){
	     alert("请登录 !!!");
	     return false;
	    }
   	    var author = usr.emails[0].address;
    	     notes =  Notes.find({author:author}, { sort : { createdAt : -1 } });
    	}else{
    	     notes =  Notes.find({}, { sort : { createdAt : -1 } });
    	}

       return notes;
    }
  });
//}
