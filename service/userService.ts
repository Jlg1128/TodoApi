/* eslint-disable max-len */
import UserDao from '../dao/userDao';
import { User } from '../domain/user';

const userService = {
  getUserById: async (id: number) => {
    let user = await UserDao.getUserById(id);
    return user;
  },
  getUserByNickname: async (nickname: string) => {
    let user = await UserDao.getUserByNickname(nickname);
    return user;
  },
  getUserByEmail: async (email: string) => {
    let user = await UserDao.getUserByEmail(email);
    return user;
  },
  getUserByPhoneNumber: async (phoneNumber: string) => {
    let user = await UserDao.getUserByPhoneNumber(phoneNumber);
    return user;
  },
  getAllUsers: async () => {
    let users = await UserDao.getAllUsers();
    return users;
  },
  insertUser: async (user: User): Promise<number> => {
    let ifSuccess: number = await UserDao.insertUser(user);
    return ifSuccess;
  },
  modifyUser: async (id: number, partialUser: { nickname: string, email: string, phone: string, avatar: string }): Promise<string> => {
    let ifSuccess: string = await UserDao.modifyUser(id, partialUser);
    return ifSuccess;
  },
  modifyAvatar: async (id: number, avatar): Promise<string> => {
    let ifSuccess: string = await UserDao.modifyAvatar(id, avatar);
    return ifSuccess;
  },
};

export default userService;