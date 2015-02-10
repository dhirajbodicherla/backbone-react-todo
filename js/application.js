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

// var App = Backbone.View.extend({
//   tagName: 'ul',
//   initialize: function(){
//     var todo = new Todo([
//       {name: 'study', isDone: false},
//       {name: 'bath', isDone: false},
//       {name: 'eat', isDone: false}
//     ]);
//     todo.forEach(this.renderAll, this);
//   },
//   render: function(){
//     return this.$el;
//   },
//   renderAll: function(model){
//     var todoItemView = new TodoItem({model: model.toJSON()});
//     this.$el.append(todoItemView.el);
//   }
// });

// var TodoItem = Backbone.View.extend({
//   tagName: 'li',
//   template: _.template('<%=name%>: <%=isDone%>'),
//   initialize: function(){
//     this.render();
//   },
//   render: function(){
//     this.$el.html(this.template(this.model));
//   }
// })
// var app = new App();
// $('#backbone').html(app.render());

/*
[
  {name: 'study', isDone: false},
  {name: 'bath', isDone: false},
  {name: 'eat', isDone: false}
]
*/

var myLists = [];
if(!window.localStorage.getItem("myLists")){
  window.localStorage.setItem("myLists", JSON.stringify(myLists));
}else{
  myLists = JSON.parse(window.localStorage.getItem("myLists"));
}

var todoList = new Todo(myLists);
var TodoItemComponent = React.createClass({
  deleteItem: function(){
    this.setState(this.props.todoItem.toJSON());
    todoList.remove(this.props.todoItem);
    console.log(todoList);
    console.log(this.props.todoItem.toJSON());
  },
  render: function(){
    return (
      <li onClick={this.deleteItem}>
        {this.props.todoItem.get("name")}: {this.props.todoItem.get("isDone").toString()} 
      </li>
    );
  }
})

var TodoListComponent = React.createClass({
  enter: function(e){
    var inp = this.refs.input.getDOMNode().value;
    if(e.keyCode === 13 && inp.trim()){
      var item = {name: inp, isDone: false};
      this.setState(item);
      var nn = new TodoItem(item);
      todoList.add(nn);
      myLists.push(nn.toJSON());
      window.localStorage.setItem("myLists", JSON.stringify(myLists));
      this.refs.input.getDOMNode().value = '';
    }
  },
  render: function(){
    var items = [];
    this.props.todoList.forEach(function(item){
      items.push(<TodoItemComponent todoItem={item}/>);
    });
    return (
      <div>
        <ul className="todo-list">
          {items}
        </ul>
        <input type="text" placeholder="Enter new item" onKeyDown={this.enter} ref="input"/>
      </div>
    );
  }
});

React.render(
  <TodoListComponent todoList={todoList} />,
  document.getElementById('react')
);
