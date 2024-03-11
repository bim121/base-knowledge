interface ITask{
  id: number;
  text: string;
  completed: boolean;
}

class TodoList{
  private tasks: ITask[] = [];

  addTask(todo: ITask){
    this.tasks.push(todo);
  }

  removeTaskById(id: number){
    this.tasks = this.tasks.filter((todo) => todo.id !== id);
  }

  getTask(){
    return this.tasks;
  }
}

class TodoListUI{
  private todoList: TodoList;

  constructor(todoList: TodoList){
    this.todoList = todoList;
  }

  displayTasks(){
    const todoListElement = document.getElementById("todo-list")!;
    todoListElement.innerHTML = "";

    this.todoList.getTask().forEach((todo) => {
      const todoElement = document.createElement("li");
      todoElement.innerHTML = `
        <input type="checkbox" ${todo.completed ? "checked" : ""}>
        <span>${todo.text}</span>
        <button class="remove-todo" data-id="${todo.id}">Remove</button>
      `;
      todoListElement.appendChild(todoElement);
    });
  }

  addTodo(){
    const newTodoInput = document.getElementById(
      "new-todo"
    ) as HTMLInputElement;
    const newTodoText = newTodoInput.value.trim();

    if(newTodoText){
      const newTodo: ITask = {
        id: Date.now(),
        text: newTodoText,
        completed: false,
      };

      this.todoList.addTask(newTodo);
      this.displayTasks();
      newTodoInput.value = "";
    }
  }

  removeTodoById(id: number){
    this.todoList.removeTaskById(id);
    this.displayTasks();
  }

  bindEvents() {
    document
      .getElementById("add-todo")!
      .addEventListener("click", () => this.addTodo());
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if(target.matches(".remove-todo")){
        const id = parseInt(target.getAttribute("data-id")!);
        this.removeTodoById(id);
      }
    });
  }
}
const todoList = new TodoList();
const ui = new TodoListUI(todoList);

ui.displayTasks();
ui.bindEvents();
