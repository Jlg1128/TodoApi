import { TodoItem } from 'domain/todoItem';
import TodoDao from '../dao/todoDao';

export default {
  getTodoListById: async (id: number): Promise<TodoItem[]> => {
    let todoList = await TodoDao.getTodoListById(id);
    return todoList;
  },
  getTodoListNickname: async (nickname: string): Promise<TodoItem[]> => {
    let todoList = await TodoDao.getTodoListNickname(nickname);
    return todoList;
  },
  updateTodoListById: async (id: number, todoListString: string): Promise<number> => {
    let ifSuccess: number = await TodoDao.updateTodoListById(id, todoListString);
    return ifSuccess;
  },
  updateTodoListByNickName: async (nickname: string, todoListString: string): Promise<number> => {
    let ifSuccess: number = await TodoDao.updateTodoListByNickName(nickname, todoListString);
    return ifSuccess;
  },
};