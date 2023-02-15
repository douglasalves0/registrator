import { RecaptchaResponse } from "../types/recaptcha.response";
import { consumer } from "./axios.instance";
import env from "./../config/env";

export class RecaptchaConsumer{

    public static async validateToken(token: string): Promise<RecaptchaResponse>{
        const url: string = `${env.URL.RECAPTCHA_VALIDATION}?secret=${env.RECAPTCHA_SECRET_KEY}&response=${token}`;
        const answer: RecaptchaResponse = await consumer.get(url);
        return answer;
    }
    
}