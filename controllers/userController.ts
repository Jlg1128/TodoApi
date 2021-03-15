import { Next, Context } from 'koa';
import userService from '../service/userService';
import { MyResponse } from '../util/responseUtil';
import { User } from '../domain/user';

export enum RepeatType {
  USERNAME = 'username',
  EMAIL = 'eamil',
  PHONE = 'phone',
  ID = 'id',
}

// 用户相关
const userController = {
  login: async (ctx: Context, next: Next) => {
    let { nickname, password } = ctx.request.body;
    password = password.toString();
    if (nickname == null || password == null) {
      ctx.body = MyResponse.paramWrong("参数缺失");
      return;
    }
    try {
      let user = await userService.getUserByNickname(nickname);
      if (user == null) {
        ctx.body = MyResponse.error("用户不存在");
        return;
      }
      if (user.password !== ctx.util.md5(password)) {
        ctx.body = MyResponse.error("用户名或者密码错误");
        return;
      }
      if (user.todo_list.length > 1) {
        user.todo_list.sort((a, b) => a.id - b.id);
      }
      delete user.password;
      ctx.session.logged = true;
      ctx.body = MyResponse.success(user, "执行成功");
    } catch (error) {
      ctx.log.error(error);
      ctx.session.logged = false;
      ctx.body = MyResponse.error(error);
    }
  },
  register: async (ctx: Context, next: Next) => {
    let {
      nickname,
      password,
      avatar = null,
      phone_number = null,
      email = null,
      todo_list = null,
    } = ctx.request.body;
    try {
      if (!nickname || !password) {
        ctx.body = MyResponse.error("用户名或者密码不能为空");
        return;
      }
      if (nickname.length > 20) {
        ctx.body = MyResponse.error("用户名不能超过20个字符");
        return;
      }
      if (!/^[\s\S]{8,20}$/g.test(password)) {
        ctx.body = MyResponse.error("密码长度在8-20位");
        return;
      }
      if (!/^[\u4e00-\u9fa50-9A-Za-z_]+$/g.test(nickname)) {
        ctx.body = MyResponse.error("仅支持中文、数字、英文大小写、下划线。");
        return;
      }
      let res = await userService.getUserByNickname(nickname);
      if (res != null) {
        ctx.body = MyResponse.success(null, "用户名已存在");
        return;
      }
      password = ctx.util.md5(password);
      let now = Date.now().toString();
      let user: User = {
        nickname,
        create_time: now,
        password,
        avatar,
        phone_number: phone_number ? phone_number.toString() : null,
        email,
        todo_list,
      };
      await userService.insertUser(user);
      let findUser = await userService.getUserByNickname(nickname);
      delete findUser.password;
      ctx.body = MyResponse.success(findUser, "注册成功");
    } catch (error) {
      ctx.log.error(error);
      ctx.body = MyResponse.error("异常错误");
    }
  },
  quit: async (ctx: Context, next: Next) => {
    ctx.session.logged = false;
    ctx.body = MyResponse.success("退出成功");
  },
  nicknameIfRepeat: async (ctx: Context, next: Next) => {
    let { type, value } = ctx.request.query;
    if (!type || !value) {
      ctx.body = MyResponse.error("请求类型或者值不能为空");
      return;
    }
    let user = null;
    if (type !== 'nickname' && type !== 'email' && type !== 'phone' && type !== 'id') {
      ctx.body = MyResponse.error('没有对应的校验类型');
      return;
    }
    try {
      if (type === 'nickname') {
        user = await userService.getUserByNickname(value.toString());
      }
      if (type === 'email') {
        user = await userService.getUserByEmail(value.toString());
      }
      if (type === 'phone') {
        user = await userService.getUserByPhoneNumber(value.toString());
      }
      if (type === 'id') {
        user = await userService.getUserById(Number(value.toString()));
      }
    } catch (error) {
      ctx.log.error(error);
      ctx.body = MyResponse.error(error);
    }
    // @ts-ignore
    ctx.body = !user ? MyResponse.success(null) : MyResponse.error(`${type}已存在`);
  },
  modifyUser: async (ctx: Context, next: Next) => {
    const { id, nickname, email, phone_number, avatar } = ctx.request.body;
    if (!id) {
      ctx.body = MyResponse.error("id不能为空");
      return;
    }
    let user: User = await userService.getUserById(id);
    if (!user) {
      ctx.body = MyResponse.error("用户不存在");
      return;
    }

    try {
      let res = await userService.modifyUser(id, {
        nickname: nickname || user.nickname,
        email: email || user.email,
        phone: phone_number || user.phone_number,
        avatar: avatar || user.avatar,
      });
      if (res === 'ok') {
        ctx.body = MyResponse.success(null, '修改用户信息成功');
      } else {
        ctx.body = MyResponse.error('修改失败');
      }
    } catch (error) {
      ctx.body = MyResponse.error(error);
    }
  },
  modifyAvatar: async (ctx: Context, next: Next) => {
    const { id, avatar } = ctx.request.body;
    if (!id) {
      ctx.body = MyResponse.error("id不能为空");
      return;
    }
    let user: User = await userService.getUserById(id);
    if (!user) {
      ctx.body = MyResponse.error("用户不存在");
      return;
    }

    try {
      let res = await userService.modifyAvatar(id, {
        avatar,
      });
      if (res === 'ok') {
        ctx.body = MyResponse.success(null, '修改用户头像成功');
      } else {
        ctx.body = MyResponse.error('修改失败');
      }
    } catch (error) {
      ctx.log.error(error);
      ctx.body = MyResponse.error(error);
    }
  },
  getUsertByIdOrNickName: async (ctx: Context, next: Next) => {
    const { id, nickname } = ctx.request.query;
    if (!id && !nickname) {
      ctx.body = MyResponse.error("用户id和用户名不能都为空");
      return;
    }
    try {
      let user = null;
      if (id) {
        user = await userService.getUserById(Number(id));
      } else {
        user = await userService.getUserByNickname(nickname.toString());
      }
      ctx.body = MyResponse.success(user);
    } catch (error) {
      ctx.log.error(error);
      ctx.body = MyResponse.error(error);
    }
  },
};

export default userController;