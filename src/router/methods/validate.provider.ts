import { Request, Response } from "express";
import { ProviderDto } from "../../types/provider.dto";
import { RegisterAcceptDto } from "../../types/register.accept.dto";
import { RequestValidator } from "../../validators/request.validator";
import { ProviderRepository } from "../../repositories/provider.repository";

export async function validateProvider(request: Request, response: Response): Promise <ProviderDto>{

    const body: RegisterAcceptDto = request.body;
    const bodyErrors: string[] = RequestValidator.validateRegisterAcceptBody(body);

    if(bodyErrors.length > 0){
        response.status(400);
        response.send({
            info: "invalid body",
            errors: bodyErrors
        });
        return undefined;
    }

    let foundProviders: ProviderDto[];
    try{
        foundProviders = await ProviderRepository.findByCpf(body.cpf);
    }catch(e){
        response.status(500);
        response.send({
            info: "error trying to get user from database"
        });
        return undefined;
    }
    
    if(foundProviders.length > 0){
        response.status(400);
        response.send({
            info: "there is no user with that cpf"
        });
        return undefined;
    }

    let provider: ProviderDto = foundProviders[0];
    return provider;
    
}