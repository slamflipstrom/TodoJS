var testData = [
  { id: 1, title: "Stare lifelessly into a mirror", due_date: "10-27-2015", completed: false},
  { id: 2, title: "Eat entire bag of Sunchips without guilt", due_date: "10-28-2015", completed: false},
  { id: 3, title: "Bug-bomb the apartment", due_date: "Tomorrow", completed: false},
];

//MODEL//
var Todo = Backbone.Model.extend({
  defaults:{
    title: "",
    due_date: "",
    completed: false
  },
  validate: function(attrs, opts){
    if (!(attrs.title)){
      return "Todo needs a title";
    }
  },
  toggle: function () {
		return this.set('completed', !this.isCompleted());
	},
	isCompleted: function () {
		return this.get('completed');
	},
  initialize: function() {
    this.on('invalid', function(model) {
      alert(model.validationError);
    });
  }
});

var TodosCollection = Backbone.Collection.extend({
  model: Todo,
  localStorage: new Backbone.LocalStorage('todos_collection')
});

var TodoTracker = new Marionette.Application();

//VIEWS//
var TodoItemView = Marionette.ItemView.extend({
  tagName : "tr",
  template: _.template("<td><%=title%></td><td><%=due_date%></td><td><a href=#markCompleted id=markCompleted>X</a></td>"),
  events: {
    'click #markCompleted' : 'markCompleted'
  },
  markCompleted: function(ev){
    ev.preventDefault();
    TodoTracker.AppController.markCompleted(this.model);
  }
});

var TodoListView = Marionette.CollectionView.extend({
  tagName : "table",
  className : "table table-striped",
  childView : TodoItemView,
  onBeforeRender: function(){
    this.$el.append('<h2>Todo List</h2>');
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

var CompletedTodoView = Marionette.CollectionView.extend({
  tagName : "table",
  className : "table table-striped",
  onBeforeRender: function(){
    this.$el.append("<h2>Completed Todo's</h2>");
  }
});

//ROUTER//
var AppRouter = Backbone.Router.extend({
  routes: {
    "" : "showIndex"
  },
  showIndex : function() {
    TodoTracker.AppController.showIndex();
  }
}); 

//CONTROLLER//
var AppController = Marionette.Controller.extend({
  showIndex: function(){
    var todoListView = new TodoListView({ collection : TodoTracker.Todos });
    var completedTodoListView = new CompletedTodoView({ collection : TodoTracker.CompletedTodos });

    TodoTracker.form.show(new FormView());
    TodoTracker.list.show(todoListView);
    TodoTracker.completedlist.show(completedTodoListView);
  },
  markCompleted: function(todo){
    todo.set({"completed": true});
    todo.c = todo.get('completed');
    console.log('Todo.completed should be true and it is  ' + todo.c); 
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
  Backbone.history.start();
});

TodoTracker.start();
