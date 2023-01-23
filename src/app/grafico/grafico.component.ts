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
  @Input() productosMasVendidos: { nombre: string, cantidad: number }[] = [];

  ngOnInit() {
    this.preparaGrafico();
  }


  preparaGrafico() {
    console.log(this.productosMasVendidos)
    this.grafico = [];
    const nombres = Object.keys(this.productosMasVendidos);
    console.log(nombres);
    nombres.sort();

    for (const producto of nombres) {
      console.log(producto);
      console.log(nombres)
      this.grafico.push({
        name: producto,
        value: this.productosMasVendidos[producto].cantidad
      })
    }
    //console.log(this.grafico)
  }
}
