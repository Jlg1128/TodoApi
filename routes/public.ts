import Router = require('koa-router');
import userController from '../controllers/userController';
import todoController from '../controllers/todoController';

const router: Router = require('koa-router')();

router.post('/api/user/login', userController.login);

router.post('/api/user/register', userController.register);

router.post('/api/user/quit', userController.quit);

router.get('/api/user/nickNameRepeat', userController.nicknameIfRepeat);

router.get('/api/todo/getTodoListById', todoController.getTodoListById);

router.get('/api/todo/getTodoListNickname', todoController.getTodoListNickname);

router.post('/api/todo/updateTodoList', todoController.updateTodoList);

router.post('/api/user/modifyUser', userController.modifyUser);

router.post('/api/user/modifyAvatar', userController.modifyAvatar);

router.get('/api/user/getUserByIdOrNickName', userController.getUsertByIdOrNickName);

module.exports = router.routes();
