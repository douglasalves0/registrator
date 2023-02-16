import { Request, Response } from "express";
import { RegisterAcceptDto } from "../../types/register.accept.dto";
import { RequestValidator } from "../../validators/request.validator";
import { ProviderRepository } from "../../repositories/provider.repository";
import { ProviderDto } from "../../types/provider.dto";

export async function registerAccept(request: Request, response: Response){

    const body: RegisterAcceptDto = request.body;
    const bodyErrors: string[] = RequestValidator.validateRegisterAcceptBody(body);

    if(bodyErrors.length > 0){
        response.status(400);
        response.send({
            info: "invalid body",
            errors: bodyErrors
        });
        return;
    }

    let foundProviders: ProviderDto[];
    try{
        foundProviders = await ProviderRepository.findByCpf(body.cpf);
    }catch(e){
        response.status(500);
        response.send({
            info: "error trying to get user from database"
        });
        return;
    }
    
    if(foundProviders.length > 0){
        response.status(400);
        response.send({
            info: "there is no user with that cpf"
        });
        return;
    }

    let provider: ProviderDto = foundProviders[0];
    provider.profileApproved = true;
    try{
        await ProviderRepository.acceptProvider(body.cpf);
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