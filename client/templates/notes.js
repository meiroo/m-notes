//Notes = new Meteor.Collection("notes");
//Notes.insert({ title:"Title one test", content: "dsfasffffffffffffffffffsfdafda", createdAt: new Date()   });
//Notes.insert({ title:"Title two test", content: "dsfasffffffffffffffffffsfdafda", createdAt: new Date()   });
//Notes.insert({ title:"Title three test", content: "dsfasffffffffffffffffffsfdafda", createdAt: new Date()   });

//if (Meteor.isClient) {
  // counter starts at 0
 // Session.setDefault("counter", 0);

alert = function(str){
  if(!str)
    return;

  var notice = new PNotify({
      type: 'notice',
      title: 'Notice',
      text: str,
      styling: 'bootstrap3',
      hide: true,
      delay: 4000
      /*buttons:{
        closer: true,
        closer_hover: true
      }*/

    });
  /*notice.get().click(function() {
      notice.remove();
  });*/
}
Template.notes.findHelper = function(){
   var find = {};
   //query...  filter
   find.query = {};
    var filter = Session.get("filter").toLowerCase();
    //alert(filter);
    filter = filter.replace(/\s/g,".*");
    if(filter==="all"){

    }
    else if(filter){
      find.query.filter = {   $regex:   ".*"+filter+".*", $options: "i" };
     // alert("输入以查询符合条件的文章，输入all 可以查询全部类型包含Blog, 代码, 　技巧等。输入　src xxxxx　查询符合xxxxx的代码。 blog xxxxx查询文章。等等。");
    
    }else{
      find.query.filter = {   $regex:   ".*blog.*" , $options: "i"};
    }

    var _id = Session.get("_id");
    if(_id){
      find.query._id = _id;
    }

    //find.query.op = "i";
    //query author
    if(Session.get("status") == "1"){
       var usr =  Meteor.user();
        if(!usr || !usr.emails || !usr.emails[0].address){
          alert("登录后才能查看自己的文章");
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

Template.notes.helpers({
  notes:function(){
    console.log("body helper notes...");
    console.log("collection size = " + Notes.find({}).count());
    var notes = null;
    var find = Template.notes.findHelper();
    notes =  Notes.find(find.query, { sort : { createdAt : -1 } , skip: find.page*5, limit: 5});

    //flush pagination
    Template.notes.pagecount = Notes.find(find.query).count();
    Template.notes.flushPage(Template.notes.pagecount);
    
    return notes;
  }
});

Template.notes.flushPage = function(pagenum){
  console.log("body flush...");
  console.log("pagenum size = " + pagenum);

  $("#pagination").pagination({
    total_pages: (pagenum-1)/5 + 1, 
    current_page: Session.get("current_page"),
    first: "First",
    last:"Last",
    callback: function(event, page) {
        Session.set("current_page",page);
      }
  });
}


Template.notes.rendered = function () {
    //Template.body.flush();
    
    $.material.init();
    Template.notes.flushPage(Template.notes.pagecount);
    /*setTimeout(function(){
      alert("点击右上角的Sign区域，注册号码并登录可以发表自己的Notes。");
    },2000);
    
    setTimeout(function(){
      alert("默认只显示标签为blog的Notes，不显示src tips等等类型。可以在标签部分查询全部类型Notes。输入all 可以查询全部类型包含blog, src, tips等。输入　src xxxxx　查询符合xxxxx的代码。 blog xxxxx查询文章。等等。");
    },10000);

    setTimeout(function(){
      alert("点击只看自己可以只查看自己的文章，此时标签搜索也只在自己文章中搜索。在文章区域，点击learn more可以展开文章并编辑。");
    },18000);*/
    
};

Template.notes.created = function () {
  Session.set("filter","");
  Session.set("simple",false);
};


//}
