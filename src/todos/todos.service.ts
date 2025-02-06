import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async createTodo(userId: number, title: string, description: string): Promise<Todo> {
    const todo = this.todosRepository.create({ userId, title, description, completed: false });
    return this.todosRepository.save(todo);
  }

  async getTodos(userId: number): Promise<Todo[]> {
    return this.todosRepository.find({ where: { userId } });
  }

  async updateTodo(id: number, userId: number, updateData: Partial<Todo>): Promise<Todo> {
    await this.todosRepository.update({ id, userId }, updateData);
    return this.todosRepository.findOne({ where: { id, userId } });
  }
  async deleteTodo(id: number, userId: number): Promise<void> {
    await this.todosRepository.delete({ id, userId });
  }
} 