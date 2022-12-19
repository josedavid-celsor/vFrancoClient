import { Component, OnInit } from '@angular/core';
import { TipoProducto } from '../interfaces/TipoProducto';
import { TipoProductoService } from '../services/TipoProducto.service';
import { MatDialog } from '@angular/material/dialog';
import { TipoProductoFormComponent } from '../tipo-producto-form/tipo-producto-form.component';

@Component({
  selector: 'app-tipoProducto',
  templateUrl: './tipoProducto.component.html',
  styleUrls: ['./tipoProducto.component.scss']
})
export class TipoProductoComponent implements OnInit {
  listadoTipoProducto: TipoProducto[]
  columnasTipo: string[] = ["ID", "Nombre"]
  modeloTipo: string[]  = ["id", "nombre"]
  constructor(private tipoProductoService: TipoProductoService,
    private matDialog: MatDialog){
  }

  getOne(tipoProducto: TipoProducto){
    this.matDialog.open(TipoProductoFormComponent, {width:'50vw', data: {
      elemento: tipoProducto,
      modo: "inspect"
    }})
  }
  
  edit(tipoProducto: TipoProducto){
    const dialogRef = this.matDialog.open(TipoProductoFormComponent, {width:'50vw', data: {
      elemento: tipoProducto,
      modo: "edit"
    }})
    dialogRef.afterClosed().subscribe(()=>{
      this.getTipoProductoPlist();
    })
  }

  delete(tipoProducto: TipoProducto){
    this.tipoProductoService.delete(tipoProducto.id).subscribe(()=>{
      console.log("borrado")
      this.getTipoProductoPlist();
    })
  }

  create(){
    const dialogRef = this.matDialog.open(TipoProductoFormComponent, {width:'50vw', data: {
      elemento: null,
      modo: "create"
    }})
    dialogRef.afterClosed().subscribe(()=>{
      this.getTipoProductoPlist();
    })
  }


  getTipoProductoPlist(){
    this.tipoProductoService.getTipoProductoPlist().subscribe(productos=>{
      this.listadoTipoProducto = productos.content
 
    })
  }


  ngOnInit(){
    this.getTipoProductoPlist();
    
 
}
}
