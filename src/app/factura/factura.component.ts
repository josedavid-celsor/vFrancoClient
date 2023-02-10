import { AuthService } from './../services/Auth.service';
import { User } from './../interfaces/User';
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
  listadoFactura: Factura[];
  user: User;
  columnasTipo: string[] = ["ID", "Fecha", "Precio Total", "IVA"]
  modeloTipo: string[] = ["id", "fecha", "totalPrecio", "iva"]
  totalFacturas: number = 0
  FormSearch: FormGroup;
  lastpage: PageEvent;
  lastsearch: string;
  listTipo: Array<TipoProducto>
  facturaService: FacturaService = inject(FacturaService);
  compraService: CompraService = inject(CompraService);
  authService: AuthService = inject(AuthService);
  accionesTabla: GT_Action[] = [new GT_Action("download", "dowload a new subtype", 'download')]

  /**
   * Para tener acceso a los metodos de la tabla (se usa para el refrescar tabla)
   */
  @ViewChild(GTTableComponent, { static: false }) tablaTipos: GTTableComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {
    this.getFacturaPlist()
    this.getUser();
  }
  getFacturaPlist() {
    this.facturaService.getFacturaPlist().subscribe(facturas => {
      this.listadoFactura = facturas.content;
      this.totalFacturas = facturas.totalElements;
      this.listadoFactura.forEach(factura => {
        factura.totalPrecio = parseFloat(factura.totalPrecio.toFixed(2));
      });
      if (this.tablaTipos) {
        this.tablaTipos.refreshData(this.listadoFactura)
      }
    })
  }

  getUser() {
    this.user = this.authService.getUser();
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
    this.facturaService.getFacturaPlist(this.lastpage?.pageIndex, this.lastpage?.pageSize, this.lastsearch)
    .subscribe(tipoProducto => {
      this.tablaTipos.refreshData(tipoProducto.content);
      this.totalFacturas = tipoProducto.totalElements;
      tipoProducto.content.forEach(factura => {
        factura.totalPrecio = parseFloat(factura.totalPrecio.toFixed(2));
      });
    })
  }

  public downloadAsPDF(factura: Factura) {
    this.compraService.getByFactura(factura).subscribe(compras => {

      const doc = new jsPDF();

      const img = new Image();
      img.src = "assets/img/logo.png"
      doc.addImage(img, "png", 160, 7, 40, 20);

      doc.setFontSize(35);
      doc.setFont('helvetica', 'normal', 'bold');
      doc.text("DATOS DE FACTURA", 15, 20);

      doc.setFontSize(14);
      doc.text("CLIENTE", 15, 35);
      doc.text("FECHA:", 75, 35);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal', 'normal');
      doc.text(this.user.nombre + " " + this.user.apellido + " " + this.user.apellido2, 15, 42);
      doc.text(this.user.email, 15, 47);

      doc.setFontSize(11);
      doc.text(factura.fecha.toLocaleString(), 95, 34.8);

      const bodyTabla = []
      let subTotal = 0;
      for (const compra of compras) {
        bodyTabla.push([compra.producto.nombre, compra.cantidad, compra.producto.precio.toFixed(2), compra.cantidad * compra.producto.precio])
        subTotal += compra.cantidad * compra.producto.precio;
      }
      bodyTabla.push([' ', ' ', ' ', ' ']);
      bodyTabla.push([' ', ' ', 'Subtotal', subTotal.toFixed(2)]);
      bodyTabla.push([' ', ' ', 'IVA', factura.iva + " %"]);
      bodyTabla.push([' ', ' ', 'Total', factura.totalPrecio.toFixed(2) + " €"]);
      autoTable(doc, {
        head: [['Nombre Producto', 'Cantidad', 'Precio Unitario', 'Importe']],
        headStyles: { fillColor: '#4054b4' },
        body: bodyTabla,
        willDrawCell: (data) => {
          let rows = data.table.body;
          if (data.row.index === rows.length - 1) {
            doc.setFont('helvetica', 'normal', 'bold');
          }
          if (data.row.index === rows.length - 1 || data.row.index === rows.length - 2 || data.row.index === rows.length - 3 || data.row.index === rows.length - 4) {
            doc.setFillColor('white');
          }
        },
        tableId: 'Productos',
        margin: { left: 15 },
        startY: 60,

      })
      doc.save('DatosFactura.pdf')
    })
  }
}
