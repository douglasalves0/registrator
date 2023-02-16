import { Request, Response } from "express";
import { validateProvider } from "./validate.provider";
import { ProviderDto } from "../../types/provider.dto";
import { ProviderRepository } from "../../repositories/provider.repository";
import { EmailSenderConsumer } from "../../api/email.sender.consumer";

export async function registerReject(request: Request, response: Response) {
    
    let provider: ProviderDto = await validateProvider(request, response);

    if(!provider) return;

    try{
        await ProviderRepository.rejectProvider(request.body.cpf);
    }catch{
        response.status(500);
        response.send({
            info: "error while trying to reject provider registration"
        });
        return;
    }

    try{
        await EmailSenderConsumer.send(
            provider.email,
            "[Nail Planner] - Notificação de registro",
            `Olá, ${provider.name}.\n` +
            `\n` +
            `Por algum motivo sua conta não pôde ser verificada!\n` +
            `Felizmente, você pode tentar criar uma conta novamente, é gratuito!.\n` +
            `Caso precise de ajuda, fique à vontade para mandar um e-mail para este endereço.\n` +
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
        info: "provider rejected succesfully",
        data: provider
    });

}