import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() body: { title: string; description: string }) {
    return this.todosService.createTodo(req.user.userId, body.title, body.description);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.todosService.getTodos(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Request() req,
    @Body() updateData: Partial<{ title: string; description: string; completed: boolean }>,
  ) {
    return this.todosService.updateTodo(+id, req.user.userId, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    await this.todosService.deleteTodo(+id, req.user.userId);
    return { message: 'Todo deleted' };
  }
} 