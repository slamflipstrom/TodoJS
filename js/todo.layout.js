//VIEWS//
var TodoItemView = Marionette.ItemView.extend({
  tagName : "tr",
  template: "#todoView",
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
  selectable: true,
  childView : TodoItemView,
  onBeforeRender: function(){
    this.$el.prepend('<th>Todo List</th>');
  },
  selectableModelsFilter : function(model){
    return model.get("completed") === false;
  }
});

var FormView = Marionette.ItemView.extend({
  template: '#formView',
  ui: {
    title: '#title',
    due_date: '#due_date'
  },
  events: {
    'click #submit': 'createNewTodo'
  },
  createNewTodo: function(){
    var todoTitle = this.ui.title.val().trim(),
        todoDueDate = this.ui.due_date.val().trim();
    this.collection.add({
      title: todoTitle,
      due_date: todoDueDate
    });
    this.ui.title.val("");
    this.ui.due_date.val("");
  }
});

var CompletedTodoView = Marionette.CollectionView.extend({
  childView : TodoItemView,
  tagName : "table",
  className : "table table-striped",
  onBeforeRender: function(){
    this.$el.append("<th>Completed Todo's</th>");    
  }
});
