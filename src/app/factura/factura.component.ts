import { Component, inject, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { GTTableComponent, GT_Action } from '@aramirezj/ngx-generic-tables';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { Factura } from '../interfaces/Factura';
import { TipoProducto } from '../interfaces/TipoProducto';
import { CompraService } from '../services/Compra.service';
import { FacturaService } from '../services/Factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent {
  listadoFactura: Factura[]
  columnasTipo: string[] = ["ID", "Fecha", "Precio Total", "IVA"]
  modeloTipo: string[] = ["id", "fecha", "totalPrecio", "iva"]
  totalFacturas: number = 0
  FormSearch: FormGroup;
  lastpage: PageEvent;
  lastsearch: string;
  listTipo: Array<TipoProducto>
  facturaService: FacturaService = inject(FacturaService);
  compraService: CompraService = inject(CompraService);
  accionesTabla: GT_Action[] = [new GT_Action("download", "dowload a new subtype", 'download'), new GT_Action("view", "view a type", 'visibility')]

  /**
   * Para tener acceso a los metodos de la tabla (se usa para el refrescar tabla)
   */
  @ViewChild(GTTableComponent, { static: false }) tablaTipos: GTTableComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {
    this.getFacturaPlist()
  }
  getFacturaPlist() {
    this.facturaService.getFacturaPlist().subscribe(facturas => {
      this.listadoFactura = facturas.content
      this.totalFacturas = facturas.totalElements
      if (this.tablaTipos) {
        this.tablaTipos.refreshData(this.listadoFactura)
      }
    })
  }

  notification(event: { action: string, entity: Factura }) {
    switch (event.action) {

      case 'download':
        this.downloadAsPDF(event.entity)
        break;
    }
  }
  pagina(page: PageEvent) {
    this.lastpage = page
    this.getFacturaPaginada()
  }

  getFacturaPaginada() {
    this.facturaService.getFacturaPlist(this.lastpage?.pageIndex, this.lastpage?.pageSize, this.lastsearch).subscribe(tipoProducto => {
      this.tablaTipos.refreshData(tipoProducto.content)
      this.totalFacturas = tipoProducto.totalElements
    })
  }

  public downloadAsPDF(factura: Factura) {
    this.compraService.getByFactura(factura).subscribe(compras => {

      const doc = new jsPDF();
      doc.text("Datos factura", 5, 10);
      autoTable(doc, {
        head: [['Fecha', 'Precio Total', 'IVA']],
        body: [
          [factura.fecha.toLocaleString(), factura.totalPrecio, factura.iva],

          // ...
        ],
        tableId: 'Facturas',
        margin: { left: 5 },
        startY: 15
      })
      doc.text("Listado de productos", 5, 45);
      const bodyTabla = []
      for(const compra of compras){
        bodyTabla.push([compra.producto.nombre, compra.cantidad, compra.producto.precio, compra.cantidad*compra.producto.precio])
        console.log(bodyTabla)
      }
      autoTable(doc, {
        head: [['Nombre Producto', 'Cantidad', 'Precio', 'Total']],
        body: bodyTabla,
        tableId: 'Productos',
        margin: { left: 5 },
        startY: 50
      })
      doc.save('table.pdf')
    })
  }
}