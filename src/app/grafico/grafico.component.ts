import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent {
  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  grafico: { name: string, value: number }[] = [];
  @Input() productosMasVentidos: { cantidad: number, nombre: string }[] = [];
  

  ngOnInit() {
    this.preparaGrafico();
  }


  preparaGrafico() {
    this.grafico = [];
    const nombres = Object.keys(this.productosMasVentidos);
    nombres.sort();
    for (const producto of nombres) {
      this.grafico.push({
        name: producto,
        value: this.productosMasVentidos[producto].cantidad
      })
    }
  }
}
