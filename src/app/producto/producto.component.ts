import { Component, ViewChild, inject } from '@angular/core';
import { Producto } from '../interfaces/Producto';
import { MatDialog } from '@angular/material/dialog';
import { GTTableComponent } from '@aramirezj/ngx-generic-tables';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../services/Producto.service';
import { GFFormService, GF_APIRequest, GF_Form, GF_FormElement, GF_TypeControl, GF_TypeForm } from '@aramirezj/ngx-generic-form';
import { TipoProductoService } from '../services/TipoProducto.service';
import { SubTipoProductoService } from '../services/SubTipoProduto.service';
import { SubTipoProducto } from '../interfaces/SubTipoProducto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  listadoProducto: Producto[]
  columnasTipo: string[] = ["ID", "Code", "Name", "Stock", "Price", "Type", "Sub-Type"]
  modeloTipo: string[] = ["id", "codigo", "nombre", "cantidad", "precio", "subTipoProducto.tipoProducto.nombre", "subTipoProducto.nombre"]
  totalProductos: number = 0
  FormSearch: FormGroup;
  lastpage: PageEvent;
  lastsearch: string;
  listSubTipo: Array<SubTipoProducto>
  productoService: ProductoService = inject(ProductoService);
  matDialog: MatDialog = inject(MatDialog);
  formService: GFFormService = inject(GFFormService);
  subTipoProductoService: SubTipoProductoService = inject(SubTipoProductoService);
  tipoProductoService: TipoProductoService = inject(TipoProductoService)
  /**
   * Es un formulario que muestra los campos de tipo producto y dependiendo de su tipo permitira hacer el crud
   */
  formTipo: GF_Form<Producto> = new GF_Form(GF_TypeForm.CREATION, ["id", "codigo", "nombre", "cantidad", "precio", "tipoProducto", "subTipoProducto", 'fotos'], this.columnasTipo.concat(['Foto']), "Creación")
  /**
   * Para tener acceso a los metodos de la tabla (se usa para el refrescar tabla)
   */
  @ViewChild(GTTableComponent, { static: false }) tablaTipos: GTTableComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngAfterViewInit() {

  }
  ngOnInit() {
    this.configForm();
    //Para recuperar los tipos de productos
    this.subTipoProductoService.getSubTipoProductoPlist(0, 100).subscribe(productos => {
    })
    this.getProductoPlist();
    this.FormSearch = new FormGroup({
      search: new FormControl(null),
    });
    this.FormSearch.get('search').valueChanges.subscribe(valor => {
      this.lastsearch = valor
      this.paginator.firstPage()
      if (this.paginator.pageIndex === 0) {
        this.getProductoPaginado()
      }

    })
  }

  getOne(producto: Producto) {
    this.formTipo.changeTypeForm(producto, GF_TypeForm.INSPECTION, "View  Producto")
    //Por definición un observable necesita que alguien se suscriba para ejecutarse y hay veces que no necesitas hacer anda con la respuesta
    this.formService.openForm(this.formTipo).subscribe();
  }

  /**
   *
   * @param producto
   */
  edit(producto: Producto) {
    console.log(producto)
    producto ["tipoProducto"] = producto.subTipoProducto?.tipoProducto
    this.formTipo.changeTypeForm(producto, GF_TypeForm.EDITION, "Editar Producto")
    this.formTipo.disableControls(['id'])
    this.formTipo.enableControls(['subTipoProducto'])
    this.formService.openForm(this.formTipo).subscribe(tipoUpdate => {
      if (tipoUpdate) {
        this.productoService.edit(tipoUpdate, this.formTipo.images).subscribe(() => {
          this.getProductoPlist()
        })
      }
    });
  }

  delete(producto: Producto) {
    this.productoService.delete(producto.id).subscribe(() => {
      console.log("borrado")
      this.getProductoPlist();
    })
  }

  create() {
    this.formTipo.changeTypeForm(null, GF_TypeForm.CREATION, "Crear Producto")
    this.formTipo.disableControls(['id'])
    this.formTipo.disableControls(['subTipoProducto'])
    this.formService.openForm(this.formTipo).subscribe(productoUpdate => {
      if (productoUpdate) {
        this.productoService.create(productoUpdate, this.formTipo.images).subscribe(() => {
          this.getProductoPlist()
        });
      }
    });
  }


  getProductoPlist() {
    this.productoService.getProductoPlist().subscribe(productos => {
      this.listadoProducto = productos.content
      this.totalProductos = productos.totalElements
      if (this.tablaTipos) {
        this.tablaTipos.refreshData(this.listadoProducto)
      }
    })
  }

  notification(event: { action: string, entity: Producto }) {
    switch (event.action) {
      case 'edit':
        this.edit(event.entity)
        break;
      case 'autoDelete':
        this.delete(event.entity)
        break;
      case 'inspect':
        this.getOne(event.entity)
        break;
    }
  }

  pagina(page: PageEvent) {
    this.lastpage = page
    this.getProductoPaginado()
  }

  getProductoPaginado() {
    this.productoService.getProductoPlist(this.lastpage?.pageIndex, this.lastpage?.pageSize, this.lastsearch).subscribe(tipoProducto => {
      this.tablaTipos.refreshData(tipoProducto.content)
      this.totalProductos = tipoProducto.totalElements
    })
  }

  configForm() {
    //SubTipo Form
    const SubtypeControl: GF_FormElement = new GF_FormElement("subTipoProducto", GF_TypeControl.SELECTMASTER, false, null, "nombre", null, null, null, "id")
    this.formTipo.addElement("subTipoProducto", SubtypeControl)

    //Tipo Producto Form
    const typeControl: GF_FormElement = new GF_FormElement("tipoProducto", GF_TypeControl.SELECTMASTER, false, this.tipoProductoService.getAll(), "nombre", null, null, null, "id")
    this.formTipo.addElement("tipoProducto", typeControl)
    this.formTipo.disableControls(["subTipoProducto"])
    this.formTipo.getElement("tipoProducto").control.valueChanges.subscribe(nuevoValor => {
      if (nuevoValor) {
        this.formTipo.getElement("subTipoProducto").list = this.subTipoProductoService.getByTipoProducto(nuevoValor);
        this.formTipo.getElement("subTipoProducto").control.enable()
      }else{
        this.formTipo.getElement("subTipoProducto").list = [];
        this.formTipo.getElement("subTipoProducto").control.disable();
      }
    })
    this.formTipo.changeTypeControl(GF_TypeControl.FILE, ["fotos"])
    this.formTipo.setValidations([Validators.required, Validators.minLength(5)], ["nombre"])
    this.formTipo.setValidations([Validators.required, Validators.minLength(10)], ["codigo"])
    this.formTipo.setValidations([Validators.required, Validators.min(1)], ["cantidad"])
    this.formTipo.setValidations([Validators.required, Validators.min(1), Validators.max(9999)], ["precio"])
    this.formTipo.setValidations([Validators.required, Validators.minLength(1)], ["tipoProducto"])
    this.formTipo.setValidations([Validators.required, Validators.minLength(1)], ["subTipoProducto"])
  }

  generate() {
    this.productoService.generate().subscribe(producto => {
      this.getProductoPaginado()
    })
  }
}
