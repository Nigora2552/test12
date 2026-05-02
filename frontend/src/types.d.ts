export interface User {
    _id: string;
    username: string;
    role: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string
}

export interface GlobalError {
    error: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export  interface Places{
    _id: string;
    user: string | User;
    name: string;
    description: string;
    image:string;
}

export interface PlacesMutation{
    user: string | User;
    name: string;
    description: string;
    image:string;
}

