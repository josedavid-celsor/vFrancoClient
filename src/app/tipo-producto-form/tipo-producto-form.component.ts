import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoProductoService } from '../services/TipoProducto.service';

@Component({
  selector: 'app-tipo-producto-form',
  templateUrl: './tipo-producto-form.component.html',
  styleUrls: ['./tipo-producto-form.component.scss']
})
export class TipoProductoFormComponent {
  FormRegistro: FormGroup; 
  igotInfo: any;
  constructor(
    private dialogRef: MatDialogRef<TipoProductoFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: any, 
    private tipoProductoService: TipoProductoService){
    this.igotInfo = data;
  }
  ngOnInit(){
    this.FormRegistro = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      id: new FormControl({value: null, disabled: false}),
      productos: new FormControl()
    })
    console.log(this.igotInfo)
    switch(this.igotInfo.modo){
      case "create":

        break;
      case "edit":
      case "inspect":
        this.FormRegistro.setValue(this.igotInfo.elemento);
        break;
    }
  }
  save(){
    switch(this.igotInfo.modo){
      case "create":
        this.tipoProductoService.create(this.FormRegistro.value).subscribe(()=>{
          this.dialogRef.close();
        });
        break;
      case "edit":
        this.tipoProductoService.edit(this.FormRegistro.value).subscribe(()=>{
          this.dialogRef.close();
        });
        break;
    }
  }
  close(){
    this.dialogRef.close()
  }
}
