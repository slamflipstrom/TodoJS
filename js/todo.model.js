var testData = [
  { id: 1, title: "Vacuum apartment", due_date: "2015-10-24", completed: false},
  { id: 2, title: "Take cat for a walk", due_date: "2015-10-27", completed: false},
  { id: 3, title: "Eat entire box of Oreos without guilt", due_date: "2015-10-28", completed: false},
  { id: 4, title: "Stare lifelessly out window & contemplate the existence of sentient life", due_date: "2015-10-31", completed: false},
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
		this.set("completed", !this.get("completed"));
	},
  initialize: function() {
    this.on("invalid", function(model) {
      alert(model.validationError);
    });
  }
});

var TodosCollection = Backbone.Collection.extend({
  model: Todo,
  localStorage: new Backbone.LocalStorage("todos_collection"),
  comparator: "completed",
  initialize: function(){
    this.on("add", function(){
    })
  },
  completed: function() {
    return this.where({completed: true});
  },
  active: function() {
    return this.where({completed: false});
  },
  parse: function(response){
    console.log(response)
      return response
  }
});

var TodoTracker = new Marionette.Application();
