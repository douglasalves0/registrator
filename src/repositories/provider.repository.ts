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

};