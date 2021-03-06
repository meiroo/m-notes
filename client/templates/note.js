Template.note.helpers({    
    contentThumb: function () {
      console.log("note helper contentThumb...");
      return this.content.substring(0,150).concat(" \r\n\r\n... .... ... ");
  },

  simple:function(){
    return Session.get("simple");
  },

  expand:true,

  useMarkdown:function(){
    return this.markdown;
  },

  });

Template.note.events({
"click .collapseurl": function(event,template){
    template.$(".contentThumb").toggle();
    template.data.expand = $(".contentThumb").is(":hidden");
    //Template.note.codePretty();
    //template.$(".collapseurl").hide();
},

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

Template.note.codePretty = function(){
  $('pre').addClass('prettyprint');
  prettyPrint();
}

Template.note.rendered = function () {
  console.log("note rendered...");
  Template.note.codePretty();
};

