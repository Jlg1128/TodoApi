import { Next, Context } from 'koa';
import { MyResponse } from '../util/responseUtil';
import todoService from '../service/todoService';
import userService from '../service/userService';
import { TodoItem } from '../domain/todoItem';

export default {
  getTodoListById: async (ctx: Context, next: Next) => {
    const { id } = ctx.request.query;
    if (id == null || id === '') {
      ctx.body = MyResponse.success(null, "用户id不能为空");
      return;
    }
    try {
      if (await userService.getUserById(Number(id)) == null) {
        ctx.body = MyResponse.success(null, "用户不存在");
        return;
      }
      // @ts-ignore
      let todoList = await todoService.getTodoListById(Number(id));
      todoList.sort((a, b) => a.id - b.id);
      // @ts-ignore
      ctx.body = MyResponse.success(todoList);
    } catch (error) {
      ctx.log.error(error);
      ctx.body = MyResponse.error("异常错误");
    }
  },
  getTodoListNickname: async (ctx: Context, next: Next) => {
    const { nickname } = ctx.request.query;
    if (nickname == null || nickname === '') {
      ctx.body = MyResponse.error("用户名不能为空");
      return;
    }
    try {
      if (await userService.getUserByNickname(nickname.toString()) == null) {
        ctx.body = MyResponse.success(null, "用户不存在");
        return;
      }
      let todoList = await todoService.getTodoListNickname(nickname.toString());
      todoList.sort((a, b) => a.id - b.id);
      ctx.body = MyResponse.success(todoList);
    } catch (error) {
      ctx.log.error(error);
      ctx.body = MyResponse.error("异常错误");
    }
  },
  // 更新todolist
  updateTodoList: async (ctx: Context, next: Next) => {
    const {
      id = null,
      nickname = null,
      todoList = null,
    } = ctx.request.body;
    if (id == null && nickname == null) {
      ctx.body = MyResponse.paramWrong("id或者nickname缺失");
      return;
    }
    try {
      let arr = [{ id: 1, content: "todo1", ifCompeleted: false }];
      if (id !== null) {
        let res = await todoService.updateTodoListById(id, JSON.stringify(todoList));
        if (res.toString() === "ok") {
          ctx.body = MyResponse.success(null, "更新成功");
        } else {
          ctx.body = MyResponse.error("更新失败");
        }
      }
      if (nickname != null) {
        let res = await todoService.updateTodoListByNickName(nickname, JSON.stringify(arr));
        if (res.toString() === "ok") {
          ctx.body = MyResponse.success(null, "更新成功");
        } else {
          ctx.body = MyResponse.error("更新失败");
        }
      }
    } catch (error) {
      ctx.log.error(error);
      ctx.body = MyResponse.error(error);
    }
  },
};
