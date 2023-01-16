import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoProducto } from '../interfaces/TipoProducto';
import { TipoProductoService } from '../services/TipoProducto.service';
import { MatDialog } from '@angular/material/dialog';
import { GTInfiniteTableComponent, GTTableComponent, GT_Action } from '@aramirezj/ngx-generic-tables';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { GF_Form, GF_APIRequest, GFFormService, GF_TypeControl, GF_TypeForm } from '@aramirezj/ngx-generic-form';
import { SubTipoProductoService } from '../services/SubTipoProduto.service';
import { SubTipoProducto } from '../interfaces/SubTipoProducto';

/**
 *
 */
@Component({
  selector: 'app-tipoProducto',
  templateUrl: './tipoProducto.component.html',
  styleUrls: ['./tipoProducto.component.scss']
})
export class TipoProductoComponent implements OnInit {
  listadoTipoProducto: TipoProducto[]
  columnasTipo: string[] = ["ID", "Name", "Code"]
  modeloTipo: string[] = ["id", "nombre", "codigo"]

  totalTipoProductos: number = 0
  FormSearch: FormGroup;
  lastpage: PageEvent;
  lastsearch: string;
  accionesTabla: GT_Action[][] = [[new GT_Action("add", "create a new subtype", 'add'), new GT_Action("edit", "edit a type", 'edit'),
  new GT_Action("delete", "delete a type", 'close'), new GT_Action("view", "view a type", 'visibility')], [new GT_Action("edit", "edit a type", 'edit'),
  new GT_Action("delete", "delete a type", 'close'), new GT_Action("view", "view a type", 'visibility')]];

  peticionSubTipos: GF_APIRequest = new GF_APIRequest(this.subTipoProductoService.getByTipoProducto.bind(this.subTipoProductoService), ["OBJECT"])

  //Para que el formulario al aceptar ejecute el solo la función del servicio
  peticionUpdate: GF_APIRequest = new GF_APIRequest(this.tipoProductoService.edit.bind(this.tipoProductoService), ['OBJECT'])
  peticionCreate: GF_APIRequest = new GF_APIRequest(this.tipoProductoService.create.bind(this.tipoProductoService), ['OBJECT'])
  /**
   * Es un formulario que muestra los campos de tipo producto y dependiendo de su tipo permitira hacer el crud
   */
  formTipo: GF_Form<TipoProducto | SubTipoProducto> = new GF_Form(GF_TypeForm.CREATION, this.modeloTipo, this.columnasTipo, "Creación")
  /**
   * Para tener acceso a los metodos de la tabla (se usa para el refrescar tabla)
   */
  @ViewChild(GTInfiniteTableComponent, { static: false }) tablaTipos: GTInfiniteTableComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private tipoProductoService: TipoProductoService,
    private matDialog: MatDialog,
    private formService: GFFormService,
    private subTipoProductoService: SubTipoProductoService) {
  }

  ngAfterViewInit() {

  }
  ngOnInit() {
    this.getTipoProductoPlist();
    this.formTipo.APIRequest.edition = this.peticionUpdate
    this.formTipo.APIRequest.creation = this.peticionCreate
    this.FormSearch = new FormGroup({
      search: new FormControl(null),
    });
    this.FormSearch.get('search').valueChanges.subscribe(valor => {
      this.lastsearch = valor
      this.paginator.firstPage()
      if (this.paginator.pageIndex === 0) {
        this.getTiposPaginado()
      }

    })
  }

  getOne(tipoProducto: TipoProducto | SubTipoProducto) {
    this.formTipo.changeTypeForm(tipoProducto, GF_TypeForm.INSPECTION, "View Element")
    //Por definición un observable necesita que alguien se suscriba para ejecutarse y hay veces que no necesitas hacer anda con la respuesta
    this.formService.openForm(this.formTipo).subscribe();
  }
  /**
   *
   * @param tipoProducto
   */
  edit(tipoProducto: TipoProducto | SubTipoProducto) {
    this.formTipo.changeTypeForm(tipoProducto, GF_TypeForm.EDITION, "Edit Element")
    this.formTipo.disableControls(['id'])
    this.formService.openForm(this.formTipo).subscribe(tipoUpdate => {
      if (tipoUpdate) {
        /* this.getTipoProductoPlist() */
      }
    });
  }

  create(reinicioApi: boolean = false) {
    if(reinicioApi){
      this.peticionCreate.request = this.tipoProductoService.create.bind(this.tipoProductoService)
      this.peticionCreate.parametersToElement = null;
    }
    this.formTipo.changeTypeForm(null, GF_TypeForm.CREATION, "Create Element")
    this.formTipo.disableControls(['id'])
    this.formService.openForm(this.formTipo).subscribe(tipoUpdate => {
      if (tipoUpdate) {
        this.getTipoProductoPlist()
      }
    });
  }


  getTipoProductoPlist() {
    this.tipoProductoService.getTipoProductoPlist().subscribe(productos => {
      this.listadoTipoProducto = productos.content
      this.totalTipoProductos = productos.totalElements
      if (this.tablaTipos) {
        this.tablaTipos.refreshData(this.listadoTipoProducto)
      }
    })
  }

  notification(event: { action: string, root: TipoProducto, subtipo?: SubTipoProducto }) {
    //cuando clicamos un elemento de tipo el subtipo viene vacio, por lo que gestionamos las acciones del tipo
    console.log(event);
    this.formTipo.extraActions = []
    if (!event.subtipo) {
      switch (event.action) {
        case 'add':
          this.peticionCreate.request = this.subTipoProductoService.create.bind(this.subTipoProductoService);
          this.peticionCreate.parametersToElement = {tipoProducto: event.root};
          this.formTipo.extraActions = [{label: "Generate", function: this.generateSubTipoProducto.bind(this), close: true}]
          this.create()
          break;
        case 'edit':
          this.peticionUpdate.request = this.tipoProductoService.edit.bind(this.tipoProductoService)
          this.edit(event.root)
          break;
        case 'delete':
          this.tipoProductoService.delete(event.root.id).subscribe(() => this.getTipoProductoPlist());
          break;
        case 'view':
          this.getOne(event.root)
          break;
      }
    } else {
      switch (event.action) {
        case 'edit':
          this.peticionUpdate.request = this.subTipoProductoService.edit.bind(this.subTipoProductoService)
          this.edit(event.subtipo)
          break;
        case 'delete':
          this.subTipoProductoService.delete(event.subtipo.id).subscribe(() => this.tablaTipos.childTable.deleteElement(event.subtipo));
          break;
        case 'view':
          this.getOne(event.subtipo)
          break;
      }
    }
  }

  pagina(page: PageEvent) {
    this.lastpage = page
    this.getTiposPaginado()
  }

  getTiposPaginado() {
    this.tipoProductoService.getTipoProductoPlist(this.lastpage?.pageIndex, this.lastpage?.pageSize, this.lastsearch).subscribe(tipoProducto => {
      this.tablaTipos.refreshData(tipoProducto.content)
      this.totalTipoProductos = tipoProducto.totalElements
    })
  }

  ordenar(ordenacion: any) {
    console.log(ordenacion)
  }

  generate() {
    this.tipoProductoService.generate().subscribe(tipoProducto => {
      this.getTiposPaginado()
    })
  }

  generateSubTipoProducto(){
    console.log(this.formTipo)
   this.subTipoProductoService.generate(this.formTipo.APIRequest.creation.parametersToElement["tipoProducto"] as TipoProducto).subscribe(nuevoSubtipo=>{
    this.tablaTipos.addNewChildrenElement(this.formTipo.APIRequest.creation.parametersToElement["tipoProducto"], nuevoSubtipo)
   })
  }
}
