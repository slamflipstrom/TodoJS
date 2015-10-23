var testData = [
  { id: 1, title: "Stare lifelessly into a mirror", due_date: ""},
  { id: 2, title: "Eat entire bag of Sunchips without guilt", due_date: ""},
  { id: 3, title: "Bug-bomb the apartment", due_date: ""},
];

var TodoTracker = new Marionette.Application();

var Todo = Backbone.Model.extend({});
var Todos = Backbone.Collection.extend({
  model: Todo
});

var TodoItemView = Marionette.ItemView.extend({
  tagName : "tr",
  template: _.template("<td><%=title%><%=due_date%><a href=#delete>Delete</a></td>")
});

var TodoListView = Marionette.CollectionView.extend({
  tagName : "table",
  className : "table table-striped",
  childView : TodoItemView,
  events: {
    'click #delete' : 'deleteTodo'
  },
  deleteTodo: function(ev){
    ev.preventDefault();
    TodoTracker.AppController.deleteTodo();
  }
});

var FormView = Marionette.ItemView.extend({
  template: '#formView',
  events: {
    'click button': 'createNewTodo'
  },
  ui: {
    title: 'title',
    due_date: 'due_date'
  },
  createNewTodo: function(){
    this.collection.add({
      title: this.ui.title.val(),
      due_date: this.ui.due_date.val()
    });
    this.ui.title.val("");
    this.ui.due_date.val("");
  }
});

//Router
var AppRouter = Backbone.Router.extend({
  routes: {
    "" : "showIndex"
  },
  showIndex : function() {
    TodoTracker.AppController.showIndex();
  }
}); 

//Controller
var AppController = Marionette.Controller.extend({
  showIndex: function(){
    var TodoView = Marionette.ItemView.extend({
      template: '#todoView'
    });

    TodoTracker.form.show(new FormView({ collection: TodoTracker.todos }));
    var todoListView = new TodoListView({collection : new Backbone.Collection(testData) });
    TodoTracker.list.show(todoListView);
  }
});

//Initializer
TodoTracker.addInitializer(function() {
  TodoTracker.addRegions({
    form: '#form',
    list: '#list'
  });

  TodoTracker.AppController = new AppController();
  TodoTracker.Router = new AppRouter();

  Backbone.history.start();
});

TodoTracker.start();
