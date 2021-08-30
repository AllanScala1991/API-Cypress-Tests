import { Router } from "express";
import { LoginController } from "./controllers/login.controller";
import { TaskController } from "./controllers/task.controller";
import { UserController } from "./controllers/user.controller";
import { Autenticated } from "./middleware/authenticated";

const router = Router();

//LOGIN ROUTES
router.post('/login', new LoginController().login);



//USER ROUTES
router.get('/user/:Name', Autenticated.userAutenticated ,new UserController().getUser);
router.post('/user', new UserController().createUser);
router.put('/user', Autenticated.userAutenticated ,new UserController().updateUser);
router.delete('/user/:id', Autenticated.userAutenticated ,new UserController().deleteUser);

// TASKS ROUTES
router.get('/task/:Name', Autenticated.userAutenticated ,new TaskController().getTask);
router.post('/task', Autenticated.userAutenticated ,new TaskController().createTask);
router.put('/task', Autenticated.userAutenticated ,new TaskController().updateTask);
router.delete('/task/:id', Autenticated.userAutenticated ,new TaskController().deleteTask);


export { router };