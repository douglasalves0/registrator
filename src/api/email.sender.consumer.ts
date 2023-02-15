import { consumer } from "./axios.instance";
import env from "../config/env";

export class EmailSenderConsumer{

    public static async send(to: string, subject: string, text: string): Promise<any>{
        return await consumer.post(env.URL.EMAIL_SENDER, {
            to: to,
            subject: subject,
            text: text,
            secret: env.EMAIL_SENDER_SECRET
        }, {});
    }

};