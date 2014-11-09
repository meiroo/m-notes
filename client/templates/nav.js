Template.nav.helpers({    
    status:function(){
        return Session.get("status");
    }
});

Template.registerHelper('equals', function(value1, value2){
    return value1 === value2;
})


Template.nav.events({
"click .add": function (event,template) {
    event.preventDefault();
    Session.set("current_edit", -1);
    $('#myModal').modal('show');

    return false;
},

"click .onlyme": function (event,template) {
    Session.set("status", "1");
    event.preventDefault();
    Session.set("only_me", true);
    return false;
},

"click .allnotes": function (event,template) {
    Session.set("status", "0");
    event.preventDefault();
    Session.set("only_me", false);
    return false;
},

"submit .filter": function (event,template) {
    
    event.preventDefault();
    var filter = event.target.text.value;
    Session.set("filter", filter);
    return false;
}


});