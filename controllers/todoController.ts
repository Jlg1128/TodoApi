import { Next, Context } from 'koa';
import { MyResponse } from '../util/responseUtil';
import todoService from '../service/todoService';
import userService from '../service/userService';

export default {
  getTodoListById: async (ctx: Context, next: Next) => {
    let uid = ctx.session.id;
    try {
      if (await userService.getUserById(uid) == null) {
        ctx.body = MyResponse.error("用户不存在");
        return;
      }
      let todoList = await todoService.getTodoListById(uid);
      todoList.sort((a, b) => a.id - b.id);
      ctx.body = MyResponse.success(todoList);
    } catch (error) {
      ctx.log.error(error);
      ctx.body = MyResponse.error("异常错误");
    }
  },
  getTodoListNickname: async (ctx: Context, next: Next) => {
    const { nickname } = ctx.request.query;
    if (nickname == null || nickname === '') {
      ctx.body = MyResponse.paramWrong("用户名不能为空");
      return;
    }
    try {
      if (await userService.getUserByNickname(nickname.toString()) == null) {
        ctx.body = MyResponse.error("用户不存在");
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
      todoList = null,
    } = ctx.request.body;
    let { id } = ctx.session;
    try {
      let res = await todoService.updateTodoListById(id, JSON.stringify(todoList));
      if (res.toString() === "ok") {
        ctx.body = MyResponse.success(null, "更新成功");
      } else {
        ctx.body = MyResponse.error("更新失败");
      }
    } catch (error) {
      ctx.log.error(error);
      ctx.body = MyResponse.error(error);
    }
  },
};
