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

Template.body.findHelper = function(){
   var find = {};
   //query...  filter
   find.query = {};
    var filter = Session.get("filter");
    if(filter){
      var re = /.*/;
      find.query.filter = {   $regex:   ".*"+filter+".*" };
    }
    //query author
    if(Session.get("status") == "1"){
       var usr =  Meteor.user();
        if(!usr || !usr.emails || !usr.emails[0].address){
         return false;
        }
        var author = usr.emails[0].address;
        find.query.author = author;
    }
   //page
    var page = Session.get("current_page") -1 ;
    find.page = page;
    return find;
}

Template.body.helpers({
  notes:function(){
    console.log("body helper notes...");
    console.log("collection size = " + Notes.find({}).count());
    var notes = null;
    var find = Template.body.findHelper();
    notes =  Notes.find(find.query, { sort : { createdAt : -1 } , skip: find.page*5, limit: 5});

    //flush pagination
    Template.body.flushPage(Notes.find(find.query).count());
    
    return notes;
  }
});

Template.body.flushPage = function(pagenum){
  console.log("body flush...");
  console.log("pagenum size = " + pagenum);
  $("#pagination").pagination({
    total_pages: (pagenum-1)/5 + 1, 
    current_page: Session.get("current_page"),
    callback: function(event, page) {
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
