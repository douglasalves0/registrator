import { Router } from "express";
import { register } from "./methods/register";
import { registerAccept } from "./methods/register.accept";

const registerRouter: Router = Router();

registerRouter.post('/', register);
registerRouter.post('/accept', registerAccept);
registerRouter.post('/reject', );

export { registerRouter };