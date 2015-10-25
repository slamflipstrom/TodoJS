//ROUTER//
var AppRouter = Backbone.Router.extend({
  routes: {
    "" : "showIndex"
  },
  showIndex : function() {
    TodoTracker.AppController.showIndex();
    var completedTodos = TodoTracker.Todos.completed();
    var activeTodos = TodoTracker.Todos.active();
  }
}); 

//INITIALIZER
TodoTracker.addInitializer(function() {
  TodoTracker.addRegions({
    form: '#form',
    list: '#list',
    completedlist: '#completedlist'
  });

  TodoTracker.Todos = new TodosCollection(testData);
  TodoTracker.AppController = new AppController();
  TodoTracker.Router = new AppRouter();
  console.log(TodoTracker.Todos.active());
  console.log(TodoTracker.Todos.completed());
  Backbone.history.start();
});

TodoTracker.start();
