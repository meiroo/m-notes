Router.route('/', function () {
  Session.set('_id', null);
  this.render('index');  
});

Router.route('/note/:_id', function () {
  this.render('single');
  Session.set('_id', this.params._id);
});

Router.route('/about', function () {
  Router.go('/note/kpNvwdsHtt6js3SeA');
});

Router.route('/mypost',function(){
	Session.set("status", "1");
    Session.set("current_page",1);
    this.render('index'); 
});

Router.route('/allpost',function(){
	Session.set("status", "0");
    Session.set("current_page",1);
    this.render('index');
});

Router.route('/filter',function(){
	$(".filter input").val('');
	Session.set("filter", 'blog');
    Session.set("current_page",1);
    this.render('index');
});

Router.route('/filter/:_tag',function(){
	$(".filter input").val(this.params._tag);
	var filtervalue = this.params._tag;
    Session.set("filter", filtervalue);
    Session.set("current_page",1);
    this.render('index');
});

