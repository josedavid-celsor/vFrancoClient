import { Component, ViewChild } from '@angular/core';
import { Producto } from '../interfaces/Producto';
import { MatDialog } from '@angular/material/dialog';
import {  GTPeticionPaginacion, GTTableComponent, GT_TF } from 'ngx-generic-tools';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductoService } from '../services/Producto.service';
import { GFFormService, GF_APIRequest, GF_Form, GF_FormElement, GF_TypeControl, GF_TypeForm } from '@aramirezj/ngx-generic-form';
import { TipoProductoService } from '../services/TipoProducto.service';
import { TipoProducto } from '../interfaces/TipoProducto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  listadoProducto: Producto[]
  columnasTipo: string[] = ["ID", "CODIGO", "NOMBRE", "CANTIDAD", "PRECIO", "TIPO PRODUCTO"]
  modeloTipo: string[]  = ["id", "codigo","nombre", "cantidad", "precio", "tipoProducto.nombre"]
  paginationAsync: GTPeticionPaginacion = new GTPeticionPaginacion(this.productoService.getProductoPlist)
  totalProductos: number = 0
  FormSearch: FormGroup;
  lastpage: PageEvent;
  lastsearch: string;
  listTipo: Array<TipoProducto>
  /**
   * Es un formulario que muestra los campos de tipo producto y dependiendo de su tipo permitira hacer el crud
   */
  formTipo: GF_Form<Producto> = new GF_Form(GF_TypeForm.CREATION, ["id", "codigo","nombre", "cantidad", "precio", "tipoProducto",'fotos'], this.columnasTipo.concat(['Foto']), "Creación")
  /**
   * Para tener acceso a los metodos de la tabla (se usa para el refrescar tabla)
   */
  @ViewChild(GTTableComponent,{static:false}) tablaTipos: GTTableComponent;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  constructor(private productoService: ProductoService,
    private matDialog: MatDialog,
    private formService: GFFormService,
    private tipoProductoService: TipoProductoService ){
    }

    ngAfterViewInit(){

    }
    ngOnInit(){
      this.configForm();
      //Para recuperar los tipos de productos
      this.tipoProductoService.getTipoProductoPlist(0,100).subscribe(productos=>{
        this.listTipo = productos.content
        this.formTipo.getElement("tipoProducto").list = this.listTipo
      })
      this.getProductoPlist();
      this.FormSearch = new FormGroup({
        search: new FormControl(null),
      });
      this.FormSearch.get('search').valueChanges.subscribe(valor=>{
        this.lastsearch = valor
        this.paginator.firstPage()
        if(this.paginator.pageIndex === 0){
          this.getProductoPaginado()
        }

      })
    }

    getOne(producto: Producto){
    this.formTipo.changeTypeForm(producto, GF_TypeForm.INSPECTION, "View  Producto")
    //Por definición un observable necesita que alguien se suscriba para ejecutarse y hay veces que no necesitas hacer anda con la respuesta
    this.formService.openForm(this.formTipo).subscribe();
  }

  /**
   *
   * @param producto
   */
  edit(producto: Producto){
    this.formTipo.changeTypeForm(producto, GF_TypeForm.EDITION, "Editar Tipo Producto")
    this.formTipo.disableControls(['id'])
    this.formService.openForm(this.formTipo).subscribe(tipoUpdate=>{
      if(tipoUpdate){
        this.productoService.edit(tipoUpdate, this.formTipo.images).subscribe(()=>{
          this.getProductoPlist()
        })
      }
    });
  }

  delete(producto: Producto){
    this.productoService.delete(producto.id).subscribe(()=>{
      console.log("borrado")
      this.getProductoPlist();
    })
  }

  create(){
    this.formTipo.changeTypeForm(null, GF_TypeForm.CREATION, "Crear Producto")
    this.formTipo.disableControls(['id'])
    this.formService.openForm(this.formTipo).subscribe(productoUpdate=>{
      if(productoUpdate){
        this.productoService.create(productoUpdate,this.formTipo.images).subscribe(()=>{
          this.getProductoPlist()
        });
      }
    });
  }


  getProductoPlist(){
    this.productoService.getProductoPlist().subscribe(productos=>{
      this.listadoProducto = productos.content
      this.totalProductos = productos.totalElements
      if(this.tablaTipos){
        this.tablaTipos.refrescaTabla(this.listadoProducto)
      }
    })
  }

  notification(event: {accion:string, elemento:Producto}){
    switch(event.accion){
      case 'editar':
        this.edit(event.elemento)
      break;
      case 'eliminarT':
        this.delete(event.elemento)
      break;
      case 'ver':
        this.getOne(event.elemento)
        break;
    }
  }

  pagina(page: PageEvent){
    this.lastpage = page
    this.getProductoPaginado()
  }

  getProductoPaginado(){
    this.productoService.getProductoPlist(this.lastpage?.pageIndex, this.lastpage?.pageSize, this.lastsearch).subscribe(tipoProducto =>{
      this.tablaTipos.refrescaTabla(tipoProducto.content)
      this.totalProductos = tipoProducto.totalElements
    })
  }

  configForm(){
    const typeControl: GF_FormElement = new GF_FormElement("tipoProducto", GF_TypeControl.SELECTMASTER, false, null, "nombre")
    this.formTipo.addElement("tipoProducto",typeControl)
    this.formTipo.changeTypeControl(GF_TypeControl.FILE,["fotos"])
  }

  generate(){
    this.productoService.generate().subscribe(producto=>{
      this.getProductoPaginado()
    })
  }
}
