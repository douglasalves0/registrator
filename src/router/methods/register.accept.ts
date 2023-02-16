import { Request, Response } from "express";
import { ProviderRepository } from "../../repositories/provider.repository";
import { ProviderDto } from "../../types/provider.dto";
import { validateProvider } from "./validate.provider";
import { EmailSenderConsumer } from "../../api/email.sender.consumer";

export async function registerAccept(request: Request, response: Response): Promise<void>{

    let provider: ProviderDto = await validateProvider(request, response);

    if(!provider) return;

    provider.profileApproved = true;
    try{
        await ProviderRepository.acceptProvider(provider.cpf);
    }catch(e){
        response.status(500);
        response.send({
            info: "error trying to approve the provider"
        });
        return;
    }

    try{
        await EmailSenderConsumer.send(
            provider.email,
            "[Nail Planner] - Confirmação de registro",
            `Olá, ${provider.name}.\n` +
            `\n` +
            `Sua conta foi verificada com sucesso! Seja bem-vindo!\n` +
            `Fique a vontade para logar e configurar seu perfil.\n` +
            `\n` +
            `CPF: ${provider.cpf}` +
            `Senha: ${provider.password}\n` +
            `\n` +
            `Atenciosamente, Equipe Nail Planner.`
        );
    }catch(e){
        response.status(500);
        response.send({
            info: "error while trying to send notification e-mail to provider!",
            email: provider.email
        });
        return;
    }

    response.status(200);
    response.send({
        info: "Provider approved succesfully",
        provider: provider
    });

}