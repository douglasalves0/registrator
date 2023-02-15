import { Router } from "express";
import { Request, Response } from "express";
import { RegisterDto } from "../types/register.dto";
import { RequestValidator } from "../validators/request.validator";
import { RecaptchaResponse } from "../types/recaptcha.response";
import { RecaptchaConsumer } from "../api/recaptcha.consumer";
import env from "./../config/env";
import email from "email-validator";
import { ProviderRepository } from "../repositories/provider.repository";
import { ProviderDto } from "../types/provider.dto";

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

    if(!email.validate(body.email)){
        response.status(400);
        response.send({
            info: "invalid e-mail"
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

    const provider: ProviderDto = {
        avatarUrl: body.avatarUrl,
        cpf: body.cpf,
        description: body.description,
        email: body.email,
        gender: body.gender,
        name: body.name,
        password: body.password,
        phoneNumber: body.phoneNumber,
        specialty: body.specialty,
        profileApproved: false
    };

    try{
        await ProviderRepository.save(provider);
    }catch(e){
        response.status(500);
        response.send({
            info: "Some error ocurred while trying to persist data on database",
        });
        return;
    }

    // Envia email para o usuário

    response.status(200);
    response.send({
        info: "The user registration was sent to verification, check your e-mail for updates",
        data: body    
    });
    return;

});

export { registerRouter };