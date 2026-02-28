import { http } from '@/services/api'
import type {LoginPayload, LoginResponse, RegisterPayload, RegisterResponse} from "@/types/auth";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await http.post<LoginResponse>('/login', payload)
    return data
}

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
    const { data } = await http.post<RegisterResponse>('/register', payload)
    return data
}