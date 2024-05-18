export interface IRegister {
    id: string;
    password: string;
    nickname: string;
}

export type User = {
    id: string
    email: string
    name: string,
    _id?: string
}

export interface SignInBody {
    id: string;
    password: string;
}