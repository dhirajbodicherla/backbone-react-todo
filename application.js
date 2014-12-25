/**
  * @jsx React.DOM
  */

var TodoItem = Backbone.Model.extend({
  name: null,
  isDone: false
});

var Todo = Backbone.Collection.extend({
  model: TodoItem
});

var App = Backbone.View.extend({
  tagName: 'ul',
  initialize: function(){
    var todo = new Todo([
      {name: 'study', isDone: false},
      {name: 'bath', isDone: false},
      {name: 'eat', isDone: false}
    ]);
    todo.forEach(this.renderAll, this);
  },
  render: function(){
    return this.$el;
  },
  renderAll: function(model){
    var todoItemView = new TodoItem({model: model.toJSON()});
    this.$el.append(todoItemView.el);
  }
});

var TodoItem = Backbone.View.extend({
  tagName: 'li',
  template: _.template('<%=name%>: <%=isDone%>'),
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html(this.template(this.model));
  }
})
var app = new App();
$('#b').html(app.render());

var todoList = new Todo([
      {name: 'study', isDone: false},
      {name: 'bath', isDone: false},
      {name: 'eat', isDone: false}
]);

var TodoItemComponent = React.createClass({
  render: function(){
    return (
      <li>
        {this.props.todoItem.get("name")}: {this.props.todoItem.get("isDone").toString()} 
      </li>
    );
  }
})

var TodoListComponent = React.createClass({
  render: function(){
    var items = [];
    this.props.todoList.forEach(function(item){
          items.push(<TodoItemComponent todoItem={item}/>);
        });
    return (
      <ul className="todo-list">
        {items}
      </ul>
    );
  }
});

React.render(
  <TodoListComponent todoList={todoList} />,
  document.getElementById('r')
);
