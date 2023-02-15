export type RecaptchaResponse = {
    sucess: boolean,
    challenge_ts: string,
    hostname?: string,
    apk_package_name?: string,
    error_codes?: string[]
};