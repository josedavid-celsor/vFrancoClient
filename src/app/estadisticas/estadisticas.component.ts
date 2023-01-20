import { Component, inject } from '@angular/core';
import { CompraService } from '../services/Compra.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent {
  compraService: CompraService = inject(CompraService);
  ngOnInit(){
    this.getCompras()
  }
  //Enunciado, cuando reciba arrayd de compra, crear un array nuevo,
  //con la interface que te pide grafico component, es decir, debera sacar la información de por cada producto,
  //cuantas ventas se han producido en total
  getCompras(){
    this.compraService.getAllByUsuario().subscribe(compra=>{
      console.log(compra)
    })
  }
}
