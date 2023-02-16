import { AppDataSource } from "../data-source";
import { Provider } from "../entity/provider";
import { ProviderDto } from "../types/provider.dto";

export class ProviderRepository{

    public static async save(provider: ProviderDto){
        await 
        AppDataSource.
        createQueryBuilder().
        insert().
        into(Provider).
        values([provider]).
        execute();
    }

    public static async findByCpf(cpf: string): Promise<ProviderDto[]>{
        return await
        AppDataSource.
        getRepository(Provider).
        createQueryBuilder("provider").
        where("provider.cpf = :cpf", {cpf: cpf}).
        getMany();
    }

    public static async acceptProvider(cpf: string): Promise<void>{
        await
        AppDataSource.
        createQueryBuilder().
        update(Provider).
        set({profileApproved: true}).
        where("cpf = :cpf", {cpf: cpf}).
        execute();
    }

};