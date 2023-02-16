import { Request, Response } from "express";
import { validateProvider } from "./validate.provider";
import { ProviderDto } from "../../types/provider.dto";
import { ProviderRepository } from "../../repositories/provider.repository";

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
    }

    response.status(200);
    response.send({
        info: "provider rejected succesfully",
        data: provider
    });

}