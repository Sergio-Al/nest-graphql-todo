import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Create a new NestJS app', done: true },
    { id: 2, description: 'Create a new Angular app', done: false },
    { id: 3, description: 'Create a new React app', done: false },
    { id: 4, description: 'Create a new Vue app', done: false },
  ];

  get totalTodos(): number {
    return this.todos.length;
  }

  get completedTodos(): number {
    return this.todos.filter((todo) => todo.done).length;
  }

  get pendingTodos(): number {
    return this.todos.filter((todo) => !todo.done).length;
  }

  findAll(filter: StatusArgs): Todo[] {
    const { status } = filter;

    if (status !== undefined) {
      return this.todos.filter((todo) => todo.done === status);
    }

    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }

  createTodo(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.done = false;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;

    this.todos.push(todo);

    return todo;
  }

  updateTodo(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;

    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return todoToUpdate;
      }

      return todo;
    });

    return todoToUpdate;
  }

  deleteTodo(id: number): boolean {
    const todo = this.findOne(id);

    this.todos = this.todos.filter((t) => t.id !== todo.id);

    return true;
  }
}
