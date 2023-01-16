import { TipoProducto } from "./TipoProducto";

export interface SubTipoProducto {
    id: number;
    nombre: string;
    tipoProducto: TipoProducto
}