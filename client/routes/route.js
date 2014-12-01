Router.route('/', function () {
  Session.set('_id', null);
  this.render('index');  
});

Router.route('/note/:_id', function () {
  this.render('single');
  Session.set('_id', this.params._id);
});