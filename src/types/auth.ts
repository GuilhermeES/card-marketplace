
export interface User {
    id: string
    name: string
    email: string
}

export type LoginPayload = {
    email: string
    password: string
}

export type LoginResponse = {
    token: string
    user: User
}

export type RegisterPayload = {
    name: string
    email: string
    password: string
}

export type RegisterResponse = {
    userId: string
}

export interface AuthState {
    token: string | null
    user: User | null
}