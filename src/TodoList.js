import React, { Component } from "react";

export default class TodoList extends Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.state = {
      tasks: [],
      completed: 0,
      total:0
    };
    this.addTask = this.addTask.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  addTask(event) {
    console.log("hai");
    event.preventDefault();
    let task = this.inputRef.current.value;
    console.log(task);

    this.setState(prevState => {
        console.log(prevState.tasks);
        var id ;
        var completed;
        if(prevState.tasks.length ===0) {
            id = 1;
            completed = 0;
        }else {
            id = prevState.tasks[prevState.tasks.length-1].id + 1;
            completed = prevState.completed;
        }
      if (prevState.tasks.length === 0) {
        id = 0;
      }
      var tasks = [
        ...prevState.tasks,
        { id: id, taskName: task, isDone: false }
      ];
      console.log(tasks);
      return {
        tasks: [...tasks],
        completed: completed,
        total: [...tasks].length
      };
    });
    this.inputRef.current.value = "";
  }

  handleClick(e) {
    //console.log("handleclick");
    //console.log(e.target.id);
    var id = e.target.id;
    this.setState(prevState => {
        var tasks = [...prevState.tasks];
        var completed = 0;
        var totalTask = tasks.length;
        tasks.forEach(element => {
           if(element.id === Number(id)){
               element.isDone = !element.isDone;
           }
           if(element.isDone) {
               completed = completed+1;
           } 
        });
        return {
            tasks: tasks,
            completed: completed,
            total:totalTask
        }
    });
  }

  render() {
    //console.clear();
    //console.log("render");
    console.log(this.state.tasks);
    const listItem = this.state.tasks.map(task => (
      <li
        key={task.id}
        id={task.id}
        onClick={this.handleClick}
        className={task.isDone ? 'is-done' : " "}>
        {task.taskName}
      </li>
    ));
    //console.log(listItem);
    return (
      <>
        <div>
          <h2>Todo List</h2>
          <input type="text" name="task" ref={this.inputRef} />
          <button onClick={this.addTask}>Add</button>
  <div>{this.state.completed} out of {this.state.total}</div>
          <ul>{listItem}</ul>
        </div>
        <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
      </>
    );
  }
}
