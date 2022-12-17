import { TipoProducto } from "./TipoProducto";

export interface Producto {
    id: number;
    codigo: string;
    nombre: string;
    cantidad: number;
    precio: number;
    tipoProducto: TipoProducto;
}