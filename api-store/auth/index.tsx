import { api } from "@/api-store/index"
import { SignIn } from "@/modules/auth/ui/views/signin-form";

const basePath = "/auth";

export async function authenticate(values: SignIn) {
    const { account, password } = values;
    const isEmail = account.includes('@');
    
    return api({
        path: `${basePath}/login`,
        method: "POST",
        data: isEmail 
            ? { email: account, ...(password && { password }) }
            : { phone: account, ...(password && { password }) }
    })
}

export async function sendOtp(values: { account: string }) {
    const isEmail = values.account.includes('@');
    return api({
        path: `${basePath}/send-otp`,
        method: "POST",
        data: isEmail
            ? { email: values.account }
            : { phone: values.account }
    })
}

export async function verifyOtp(values: { code: string, email: string, phone: string, userType: string }) {
    return api({
        path: `${basePath}/verify-otp`,
        method: "POST",
        data: values
    })
}

export async function sendForgotPasswordOtp(values: { email: string, phone: string }) {
    return api({
        path: `${basePath}/forgot-password/send-otp`,
        method: "POST",
        data: values
    })
}

export async function verifyForgotPasswordOtp(values: { code: string, password: string, email: string, phone: string }) {
    return api({
        path: `${basePath}/forgot-password/verify`,
        method: "POST",
        data: values
    })
}

export async function resetPassword(values: { email: string, password: string, oldPassword: string }) {
    return api({
        path: `${basePath}/reset-password`,
        method: "POST",
        data: values
    })
}

export async function updateEmail(values: { email: string }) {
    return api({
        path: `${basePath}/email`,
        method: "PUT",
        data: values
    })
}

export async function updatePhone(values: { phone: string }) {
    return api({
        path: `${basePath}/phone`,
        method: "PUT",
        data: values
    })
}

export async function verifyEmail(values: { code: string }) {
    return api({
        path: `${basePath}/email/verify`,
        method: "POST",
        data: values
    })
}

export async function verifyPhone(values: { code: string }) {
    return api({
        path: `${basePath}/phone/verify`,
        method: "POST",
        data: values
    })
}

export async function getMe() {
    return api({
        path: `${basePath}/me`,
        method: "GET"
    })
}