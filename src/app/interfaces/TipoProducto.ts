import { Producto } from "./Producto";

export interface TipoProducto {
    id: number;
    nombre: string;
    productos: Producto;
}