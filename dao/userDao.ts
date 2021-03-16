/* eslint-disable max-len */
// user相关数据库操作

import { User } from '../domain/user';
import Userdb from '../db/db';

export default {
  getUserById: async (id: number): Promise<User> => {
    let user: User = await Userdb.findOne(
      {
        id,
      },
    );
    return user;
  },
  getUserByNickname: async (nickname: string): Promise<User> => {
    let user: User = await Userdb.findOne(
      {
        nickname,
      },
    );
    return user;
  },
  getUserByEmail: async (email: string): Promise<User> => {
    let user: User = await Userdb.findOne(
      {
        email,
      },
    );
    return user;
  },
  getUserByPhoneNumber: async (phoneNumber: string): Promise<User> => {
    let user: User = await Userdb.findOne(
      {
        phone_number: phoneNumber,
      },
    );
    return user;
  },
  getAllUsers: async (): Promise<Array<User>> => {
    let userList: Promise<User[]> = Userdb.getList<User>({});
    return userList;
  },

  insertUser: async (user: User): Promise<number> => {
    let ifSuccess: number = await Userdb.add(user);
    return ifSuccess;
  },
  modifyUser: async (id: number, partialUser: { nickname: string, email: string, phone: string, avatar: string }): Promise<string> => {
    let ifSuccess: string = await Userdb.update({
      nickname: partialUser.nickname,
      email: partialUser.email,
      phone_number: partialUser.phone,
      avatar: partialUser.avatar,
    }, id);
    return ifSuccess;
  },
  modifyAvatar: async (id: number, avatar): Promise<string> => {
    let ifSuccess: string = await Userdb.update({
      avatar,
    }, id);
    return ifSuccess;
  },
};