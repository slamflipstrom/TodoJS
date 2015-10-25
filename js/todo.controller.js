//CONTROLLER//
var AppController = Marionette.Controller.extend({
  showIndex: function(){
    var newTodoView = new FormView({ collection: TodoTracker.Todos }); 
    var todoListView = new TodoListView({ collection : TodoTracker.Todos });
    var completedTodoListView = new CompletedTodoView({ collection : TodoTracker.CompletedTodos });

    TodoTracker.form.show(newTodoView);
    TodoTracker.list.show(todoListView);
    TodoTracker.completedlist.show(completedTodoListView);
  },
  markCompleted: function(todo){
    todo.set({"completed": true});
    todo.c = todo.get('completed');
    console.log('Todo.completed should be true and it is  ' + todo.c); 
  }
});
