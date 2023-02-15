import { Router } from "express";
import { Request, Response } from "express";
import { RegisterDto } from "../types/register.dto";
import { RequestValidator } from "../validators/request.validator";
import { RecaptchaResponse } from "../types/recaptcha.response";
import { RecaptchaConsumer } from "../api/recaptcha.consumer";
import { ProviderRepository } from "../repositories/provider.repository";
import { ProviderDto } from "../types/provider.dto";
import { EmailSenderConsumer } from "../api/email.sender.consumer";
import email from "email-validator";
import env from "./../config/env";

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

    const info: string = 
    "--- Requisição de registro de usuário ---\n" + 
    `Nome: ${body.name}\n` + 
    `Foto: ${body.avatarUrl}\n` + 
    `CPF: ${body.cpf}\n` + 
    `Foto do CPF: ${body.cpfPhotoUrl}\n` +
    `Foto selfie com o CPF: ${body.cpfSelfiePhotoUrl}\n` + 
    `Descrição do prestador: ${body.description}\n` + 
    `Email do prestador: ${body.email}\n` + 
    `Sexo: ${body.gender}\n` + 
    `Número de telefone: ${body.phoneNumber}\n` + 
    `Especialidade: ${body.specialty}\n`;

    try{
        await EmailSenderConsumer.send(
            env.NAIL_PLANNER_EMAIL,
            `[Nail Planner] - User registration request - ${body.name}`,
            info
        );
    }catch(e){
        response.status(500);
        response.send({
            info: "Some error ocurred while trying to send email to nailplanner",
        });
        return;
    }

    response.status(200);
    response.send({
        info: "The user registration was sent to verification, check your e-mail for updates",
        data: body    
    });
    return;

});

export { registerRouter };