import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent {
  colorScheme: any = {
    domain: ['#D66FED', '#82B4ED', '#A02929', '#EDAC82']
  };
  grafico: { name: string, value: number }[] = [];
  @Input() productosMasVendidos: { nombre: string, cantidad: number }[];

  ngOnInit() {
    this.preparaGrafico();
  }


  preparaGrafico() {
    this.grafico = [];
    const nombres = Object.keys(this.productosMasVendidos);

    nombres.sort();
    for(const nombre of nombres) {
      this.grafico.push({
        name: nombre,
        value: this.productosMasVendidos[nombre].cantidad
      })
      }
  }
}
