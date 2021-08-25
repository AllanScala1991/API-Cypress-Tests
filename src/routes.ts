import { Router } from "express";
import { LoginController } from "./controllers/login.controller";
import { recoveryPasswordController } from "./controllers/recoveryPassword.controller";
import { UserController } from "./controllers/user.controller";

const router = Router();

//LOGIN ROUTES
router.post('/login', new LoginController().login);

//RECOVERY PASSWORD ROUTES
router.post('/recovery', new recoveryPasswordController().recoveryPassword);

//USER ROUTES
router.get('/user/:id', new UserController().getUser);
router.post('/user', new UserController().createUser);
router.put('/user', new UserController().updateUser);
router.delete('/user/:id', new UserController().deleteUser);


export { router };