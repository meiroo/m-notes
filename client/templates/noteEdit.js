
Template.noteEdit.helpers({    
    note:function(){
       var _id = Session.get("current_edit");
       var note = Notes.findOne({_id:_id});

       return note;
    }
  });


Template.noteEdit.events({
"submit .note": function (event,template) {
    event.preventDefault();

   var usr =  Meteor.user();
   if(!usr){
     alert("登录后才可以编辑Note !!!");
     return false;
   }
    var _id = Session.get("current_edit");
    var title = event.target.title.value;
    var author = usr.emails[0].address;
    var content =  event.target.content.value;

    if( _id !=  -1){  

      if(author !== this.author && author !== "meiroo@outlook.com"){
         alert("只能编辑自己的Note!!!");
         return false;
      }

      Notes.update( _id, { $set :{
        title: title,
        content:content
      } } );
    }else{
      Notes.insert({  title:title, content: content, author:author,createdAt: new Date()   });
    }
    
    $('#myModal').modal('hide');

    return false;
}
});
