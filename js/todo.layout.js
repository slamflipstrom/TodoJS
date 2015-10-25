//VIEWS//
var TodoItemView = Marionette.ItemView.extend({
  tagName : "tr",
  template: _.template("<td><%=title%></td><td><%=due_date%></td><td><button id=markCompleted>X</button></td>"),
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
  ui: {
    title: '#title',
    due_date: '#due_date'
  },
  events: {
    'click #submit': 'createNewTodo'
  },
  createNewTodo: function(e){
    var todoTitle = this.ui.title.val().trim(),
        todoDueDate = this.ui.due_date.val().trim();
    console.log(todoTitle + ' <-- title');
    console.log(todoDueDate + ' <-- due date');
    this.collection.add({
      title: todoTitle,
      due_date: todoDueDate
    });
    console.log('tried to add');    
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
