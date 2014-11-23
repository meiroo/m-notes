Template.nav.helpers({    
    status:function(){
        console.log("nav helper status...");
        return Session.get("status");
    }
});

Template.registerHelper('equals', function(value1, value2){
    return value1 === value2;
})


Template.nav.events({
"click .add": function (event,template) {

   var usr =  Meteor.user();
   if(!usr){
     alert("登录后才可以添加Note !!!");
     return false;
   }

    event.preventDefault();
    Session.set("current_edit", -1);
    $('#myModal').modal('show');

    return false;
},

"click .onlyme": function (event,template) {
    Session.set("status", "1");
    Session.set("current_page",1);
    event.preventDefault();
    return false;
},

"click .allnotes": function (event,template) {
    Session.set("status", "0");
    Session.set("current_page",1);
    event.preventDefault();
    return false;
},

"submit .filter": function (event,template) {
    Session.set("current_page",1);
    event.preventDefault();
    var filter = event.target.text.value;
    Session.set("filter", filter);
    return false;
}

});
