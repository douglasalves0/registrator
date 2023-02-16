import { Request, Response } from "express";
import { RegisterAcceptDto } from "../../types/register.accept.dto";
import { RequestValidator } from "../../validators/request.validator";
import { ProviderRepository } from "../../repositories/provider.repository";
import { ProviderDto } from "../../types/provider.dto";
import { validateProvider } from "./validate.provider";

export async function registerAccept(request: Request, response: Response): Promise<void>{

    let provider: ProviderDto = await validateProvider(request, response);

    if(!provider) return;

    provider.profileApproved = true;
    try{
        await ProviderRepository.acceptProvider(request.body.cpf);
    }catch(e){
        response.status(500);
        response.send({
            info: "error trying to approve the provider"
        });
        return;
    }

    response.status(200);
    response.send({
        info: "Provider approved succesfully",
        provider: provider
    });

}