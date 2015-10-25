var testData = [
  { id: 1, title: "Vacuum apartment", due_date: "10-24-2015", completed: false},
  { id: 2, title: "Take cat for a walk", due_date: "10-27-2015", completed: false},
  { id: 3, title: "Eat entire box of Oreos without guilt", due_date: "10-28-2015", completed: false},
  { id: 4, title: "Stare lifelessly out window & contemplate the existence of sentient life", due_date: "10-31-2015", completed: false},
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
  localStorage: new Backbone.LocalStorage('todos_collection'),
  getCompleted: function () {
		return this.filter(this._isCompleted);
	},
	getActive: function () {
		return this.reject(this._isCompleted);
	},
	_isCompleted: function (todo) {
		return todo.isCompleted();
	}
});

var TodoTracker = new Marionette.Application();
