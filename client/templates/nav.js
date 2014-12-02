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
    Router.go('/mypost');    
    event.preventDefault();
    return false;
},

"click .allnotes": function (event,template) {
    Router.go('/allpost');
    event.preventDefault();
    return false;
},

"click .tags .all" : function(event,template){
    Router.go('/filter/all');
    $(".filter input").val('all');
},

"click .tags .src" : function(event,template){
    Router.go('/filter/src');
    $(".filter input").val('src');
},

"click .tags .tips" : function(event,template){
    Router.go('/filter/tips');
    $(".filter input").val('tips');
},

"click .tags .link" : function(event,template){
    Router.go('/filter/link');
    $(".filter input").val('link');
},

"click .tags .blog" : function(event,template){
    Router.go('/filter/');
    $(".filter input").val('');
},

"click .simple" : function(event,template){
    Router.go('/');
    var bool = Session.get('simple');
    Session.set("simple", !bool);
},

"submit .filter": function (event,template) {    
    event.preventDefault();
    var filter = event.target.text.value;
    Router.go('/filter/'+filter);
    return false;
}

});
