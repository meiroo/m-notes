Template.singlenote.helpers({
  note:function(){
    var _id = Session.get("_id");
    if(_id){
      return Notes.findOne({"_id":_id});
    }
    return null;
  }

});

Template.singlenote.events({

"click .delete": function (event,template) {
   var usr =  Meteor.user();
   if(!usr){
     alert("登录后才可以删除Note !!!");
     return false;
   }
   var author = usr.emails[0].address;
   if(author !== this.author && author !== "meiroo@outlook.com"){
      alert("只能删除自己的Note!!!");
     return false;
   }
   $('#confirmDelete').modal('show');
  //Notes.remove( this._id );
},

"click #confirmDelete .confirmdelete": function (event,template) {
   var usr =  Meteor.user();
   if(!usr){
     alert("登录后才可以删除Note !!!");
     return false;
   }
   var author = usr.emails[0].address;
   if(author !== this.author && author !== "meiroo@outlook.com"){
      alert("只能删除自己的Note!!!");
     return false;
   }
   //$('#confirmDelete').modal('show');
  Notes.remove( this._id );
},

"click .thumbnail":function(event,template){

     event.preventDefault();
     var imgsrc = event.target.src;
     $('#image').modal('show');
     $('#image').find('img').attr("src",imgsrc);
    
},

"click .edit": function (event,template) {
    event.preventDefault();

    var usr =  Meteor.user();
   if(!usr){
     alert("登录后才可以编辑Note !!!");
     return false;
   }
   var author = usr.emails[0].address;
   if(author !== this.author && author !== "meiroo@outlook.com"){
      alert("只能编辑自己的Note!!!");
     return false;
   }
   
     Session.set("current_edit", this._id);
    $('#myModal').modal('show');
}
});

Template.singlenote.codePretty = function(){
  $('pre').addClass('prettyprint');
  prettyPrint();
}

Template.singlenote.rendered = function () {
  console.log("note rendered...");
  Template.singlenote.codePretty();
};

