Template.nav.events({
"click .add": function (event,template) {
    event.preventDefault();
    Session.set("current_edit", -1);
    $('#myModal').modal('show');

    return false;
},

"click .onlyme": function (event,template) {
    event.preventDefault();
    Session.set("only_me", true);
    return false;
},

"click .allnotes": function (event,template) {
    event.preventDefault();
    Session.set("only_me", false);
    return false;
}


});