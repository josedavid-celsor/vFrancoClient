import { Component, inject } from '@angular/core';
import { CompraService } from '../services/Compra.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {
  compraService: CompraService = inject(CompraService);
  datosGrafico: {nombre: string, cantidad: number}[];

  ngOnInit(){
    this.getCompras()
  }
  //Enunciado, cuando reciba arrayd de compra, crear un array nuevo,
  //con la interface que te pide grafico component, es decir, debera sacar la información de por cada producto,
  //cuantas ventas se han producido en total
  getCompras(){
    let datos:[] = [];
    this.compraService.getAllByUsuario().subscribe(compra=>{
      compra.forEach(element => {
        if (datos[element.producto.codigo]) {
          datos[element.producto.codigo].cantidad += element.cantidad;
        } else {
          datos[element.producto.codigo] = {nombre: element.producto.nombre, cantidad: element.cantidad}
        }
        //datos.push({nombre: element.producto.nombre, cantidad: element.cantidad});
      });
    })
    this.datosGrafico = datos;
    console.log(datos);
  }
}
