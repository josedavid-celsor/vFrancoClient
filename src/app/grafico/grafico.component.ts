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
    console.log(this.productosMasVendidos['154541fdsafd']);
  }


  preparaGrafico() {
    console.log(this.productosMasVendidos);
    this.grafico = [];
    const nombres = Object.keys(this.productosMasVendidos);
    console.log(nombres);
    console.log('me ejecuto ' + nombres.length);

    nombres.sort();
    /* this.productosMasVendidos.forEach( producto => {
      console.log(producto);
    }); */
    for(const nombre of nombres) {
      this.grafico.push({
        name: nombre,
        value: this.productosMasVendidos[nombre].cantidad
      })
      }
    console.log(this.grafico);
  }
}
