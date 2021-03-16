import Userdb from '../db/db';
import { TodoItem } from '../domain/todoItem';

// todo列表相关数据库操作
export default {
  getTodoListById: async (id: number) => {
    let todoListObject = await Userdb.findOne<{ 'todo_list': Array<TodoItem> }>(
      {
        selectFields: ['todo_list'],
        inFields: {
          id: [id],
        },
      },
    );
    return todoListObject.todo_list;
  },
  getTodoListNickname: async (nickname: string) => {
    let todoListObject = await Userdb.findOne<{ 'todo_list': Array<TodoItem> }>(
      {
        selectFields: ['todo_list'],
        inFields: {
          nickname: [nickname],
        },
      },
    );
    return todoListObject.todo_list;
  },
  updateTodoListById: async (id: number, todoListJson: string) => {
    let updateRes = Userdb.update({
      todo_list: todoListJson,
    }, id);
    return updateRes;
  },
  updateTodoListByNickName: async (nickname: string, todoListJson: string) => {
    let updateRes = Userdb.updateByQuery(
      { todo_list: todoListJson },
      { nickname },
    );
    return updateRes;
  },
};