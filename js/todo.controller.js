//CONTROLLER//
var AppController = Marionette.Controller.extend({
  showIndex: function(){
    var newTodoView = new FormView({ collection: TodoTracker.Todos }); 
    var todoListView = new TodoListView({ collection : TodoTracker.Todos });
    var completedTodoListView = new CompletedTodoView({ collection : TodoTracker.Todos });

    TodoTracker.form.show(newTodoView);
    TodoTracker.list.show(todoListView);
    TodoTracker.completedlist.show(completedTodoListView);
  },
  markCompleted: function(todo){
    todo.set({"completed": true});
    todo.c = todo.get('completed');
    todo.save()
  }
});
