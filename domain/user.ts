import { TodoItem } from './todoItem';

export type User = {
  id?: number,
  create_time: string,
  nickname: string,
  password: string,
  avatar: string,
  phone_number: string,
  email: string,
  todo_list: TodoItem[];
}