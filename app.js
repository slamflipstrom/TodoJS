var TodoTracker = new Marionette.Application();

var Todo = Backbone.Model.extend({});
var Todos = Backbone.Collection.extend({
  model: Todo
});

var TodoView = Marionette.ItemView.extend({
  template: '#todoView'
});

var TodosView = Marionette.CollectionView.extend({
  itemView: TodoView
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

var AppController = Marionette.Controller.extend({
  showIndex: function(){
    var TodoView = Marionette.ItemView.extend({
      template: '#todoView'
    });

    TodoTracker.form.show(new FormView({ collection: TodoTracker.todos }));
    TodoTracker.list.show(new TodosView({ collection: TodoTracker.todos }));
  }
});

TodoTracker.addInitializer(function() {
  TodoTracker.addRegions({
    form: '#form',
    list: '#list'
  });

  TodoTracker.AppController = new AppController();
  TodoTracker.AppController.showIndex();
});

TodoTracker.start();
