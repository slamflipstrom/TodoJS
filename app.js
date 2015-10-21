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
    title: 'title'
  },
  createNewTodo: function(){
    this.collection.add({
      title: this.ui.title.val()
    });
    this.ui.title.val("");
  }
});

var AppController = new Marionette.Controller.extend({

});

TodoTracker.addRegions({
  form: '#form',
  list: '#list'
});

TodoTracker.addInitializer(function() {
  TodoTracker.todos = new Todos();

  TodoTracker.form.show(new FormView({ collection: TodoTracker.todos }));
  TodoTracker.list.show(new TodosView({ collection: TodoTracker.todos }));
});

TodoTracker.start();
