
Template.noteEdit.helpers({    
    note:function(){
      console.log("noteEdit helper note...");
       var _id = Session.get("current_edit");
       if(!_id || _id === -1)
        return;
      //alert(_id); 
       var note = Notes.findOne({_id:_id});
       note.image1 = "";
       note.image2 = "";
       note.image3 = "";
       if(note.images){
         note.image1 = note.images[0];
         note.image2 = note.images[1];
         note.image3 = note.images[2];
       }
       return note;
    }
  });


Template.noteEdit.events({
"submit .note": function (event,template) {
    event.preventDefault();

   var usr =  Meteor.user();
    var _id =  Session.get("current_edit");
    var title = event.target.title.value;
    var author = usr.emails[0].address;
    var content =  event.target.content.value;
    var filter = event.target.filter.value;
    var image1 = event.target.image1.value;
    var image2 = event.target.image2.value;
    var image3 = event.target.image3.value;
    if(!filter)
      filter = "默认";

    if( _id !=  -1){ 

      Notes.update( _id, { $set :{
        title: title,
        content:content,
        filter:filter,
        images:[image1,image2,image3]
      } } );
    }else{
      Notes.insert({  title:title, content: content, author:author, 
        filter:filter,images:[image1,image2,image3],createdAt: new Date()   });
    }
    
    $('#myModal').modal('hide');

    return false;
}
});
