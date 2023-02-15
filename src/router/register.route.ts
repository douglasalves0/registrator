import { Router } from "express";
import { Request, Response } from "express";
import { RegisterDto } from "../types/register.dto";
import { RequestValidator } from "../validators/request.validator";
import env from "./../config/env";
import { RecaptchaResponse } from "../types/recaptcha.response";
import { RecaptchaConsumer } from "../api/recaptcha.consumer";

const registerRouter: Router = Router();

registerRouter.post('/', async (request: Request, response: Response) => {

    const body: RegisterDto = request.body;
    const bodyErrors: string[] = RequestValidator.validateRegisterBody(body);
    
    if(bodyErrors.length > 0){
        response.status(400);
        response.send({
            info: "invalid body",
            errors: bodyErrors
        });
        return;
    }

    let googleResponse: RecaptchaResponse;
    try{
        googleResponse = await RecaptchaConsumer.validateToken(body.recaptchaToken);
    }catch(e){
        response.status(500);
        response.send({
            info: "Error trying to get Google recaptcha API"
        });
        return;
    }

    if(!googleResponse.sucess){
        response.status(401);
        response.send({
            info: "Unauthorized, invalid recaptcha token",
        });
        return;
    }

    //Persiste no banco e chama o email-sender

    response.status(200);
    response.send({
        info: "The user registration was sent to verification, check your e-mail for updates",
        data: body    
    });
    return;

});

export { registerRouter };