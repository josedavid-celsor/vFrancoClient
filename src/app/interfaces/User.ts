import { Authority } from "./Authority";



export interface User {
    id: number;
    dni: string;
    nombre: string;
    apellido: string;
    apellido2: string;
    email: string;
    username: string;
    token: string;
    authority: Authority;
}

