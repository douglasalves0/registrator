import { RegisterDto } from "../types/register.dto";

export class RequestValidator{

    public static validateRegisterBody(body: RegisterDto): string[]{

        let errors: string[] = [];
        
        if(!(body?.avatarUrl))         errors.push("Field avatarUrl is missing");
        if(!(body?.cpf))               errors.push("Field cpf is missing");
        if(!(body?.cpfPhotoUrl))       errors.push("Field cpfPhotoUrl is missing");
        if(!(body?.cpfSelfiePhotoUrl)) errors.push("Field cpfSelfiePhotoUrl is missing");
        if(!(body?.description))       errors.push("Field description is missing");
        if(!(body?.email))             errors.push("Field email is missing");
        if(!(body?.gender))            errors.push("Field gender is missing");
        if(!(body?.name))              errors.push("Field name is missing");
        if(!(body?.password))          errors.push("Field password is missing");
        if(!(body?.phoneNumber))       errors.push("Field phoneNumber is missing");
        if(!(body?.recaptchaToken))    errors.push("Field recaptchaToken is missing");
        if(!(body?.specialty))         errors.push("Field specialty is missing");

        return errors;

    }

};