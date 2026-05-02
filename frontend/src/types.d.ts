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
    user: string;
    name: string;
    description: string;
    image:  File | null;
}

export interface IReviews{
    _id: string,
    user: string | User,
    place: string | Places,
    comment: string,
    qualityFood: number,
    qualityServer: number,
    interior: number,
    rating: number,
}

export interface ReviewsMutation {
    _id: string,
    user: string,
    place: string,
    comment: string,
    qualityFood: number,
    qualityServer: number,
    interior: number,
}
export interface IImages{
    _id: string,
    user: string | User,
    place: string | Places,
    image: string,
}

export interface ImagesMutation{
    user: string,
    place: string,
    image: File | string,
}

