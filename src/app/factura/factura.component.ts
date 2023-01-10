import { Component, inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { GTTableComponent } from '@aramirezj/ngx-generic-tables';
import { Factura } from '../interfaces/Factura';
import { TipoProducto } from '../interfaces/TipoProducto';
import { FacturaService } from '../services/Factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent {
  listadoFactura: Factura[]
  columnasTipo: string[] = ["ID", "Fecha", "Precio Total", "IVA"]
  modeloTipo: string[]  = ["id", "fecha","totalPrecio", "iva"]
  totalFacturas: number = 0
  FormSearch: FormGroup;
  lastpage: PageEvent;
  lastsearch: string;
  listTipo: Array<TipoProducto>
  facturaService: FacturaService = inject(FacturaService);
  
  /**
   * Para tener acceso a los metodos de la tabla (se usa para el refrescar tabla)
   */
  @ViewChild(GTTableComponent,{static:false}) tablaTipos: GTTableComponent;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;


  ngOnInit(){
    this.getFacturaPlist()
  }
  getFacturaPlist(){
    this.facturaService.getFacturaPlist().subscribe(facturas=>{
      this.listadoFactura = facturas.content
      this.totalFacturas = facturas.totalElements
      if(this.tablaTipos){
        this.tablaTipos.refreshData(this.listadoFactura)
      }
    })
  }

  notification(event: {action:string, entity:Factura}){
    switch(event.action){
     
     /*  case 'autoDelete':
        this.delete(event.entity)
      break;
    } */
  }
}
pagina(page: PageEvent){
  this.lastpage = page
  this.getFacturaPaginada()
}

getFacturaPaginada(){
  this.facturaService.getFacturaPlist(this.lastpage?.pageIndex, this.lastpage?.pageSize, this.lastsearch).subscribe(tipoProducto =>{
    this.tablaTipos.refreshData(tipoProducto.content)
    this.totalFacturas = tipoProducto.totalElements
  })
}
}
