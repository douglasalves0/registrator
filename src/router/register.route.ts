import { Router } from "express";
import { register } from "./methods/register";
import { registerAccept } from "./methods/register.accept";
import { registerReject } from "./methods/register.reject";

const registerRouter: Router = Router();

registerRouter.post('/', register);
registerRouter.post('/accept', registerAccept);
registerRouter.post('/reject', registerReject);

export { registerRouter };