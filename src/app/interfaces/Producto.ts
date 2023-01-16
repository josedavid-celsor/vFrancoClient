import { SubTipoProducto } from "./SubTipoProducto";
import { TipoProducto } from "./TipoProducto";

export interface Producto {
    id: number;
    codigo: string;
    nombre: string;
    cantidad: number;
    precio: number;
    subTipoProducto: SubTipoProducto
    fotos:string[];
    images: string;
}