import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabla-generica',
  templateUrl: './tabla-generica.component.html',
  styleUrls: ['./tabla-generica.component.scss']
})
export class TablaGenericaComponent implements OnInit {

  @Input() datos: any[];
  @Input() columnas: string[];
  @Input() modelos: string[];
  @Input() acciones: boolean;
  @Output() borrado: EventEmitter<any> = new EventEmitter();
  @Output() editar: EventEmitter<any> = new EventEmitter();
  @Output() view: EventEmitter<any> = new EventEmitter();
  constructor() { }


  deleteClick(elemento: any){
    this.borrado.emit(elemento);
  }
  editClick(elemento: any){
    this.editar.emit(elemento);
  }
  verClick(elemento: any){
    this.view.emit(elemento);
  }
 
  ngOnInit(): void {

  }
  
}
