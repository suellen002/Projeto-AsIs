import { User } from './user';

export interface LogadoSucesso {
    user: User;
    token: string;
    expiration : string;
}