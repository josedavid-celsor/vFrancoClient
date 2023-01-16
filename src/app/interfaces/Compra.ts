import { Factura } from "./Factura";
import { Producto } from "./Producto";

export interface Compra {
    id: number;
    precio: number;
    cantidad: number;
    factura: Factura
    producto: Producto
}
