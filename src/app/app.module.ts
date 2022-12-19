import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RegistrosComponent } from './registros/registros.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/Auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ShopComponent } from './shop/shop.component';
import { TipoProductoService } from './services/TipoProducto.service';
import { TablaGenericaComponent } from './tabla-generica/tabla-generica.component';
import { TipoProductoComponent } from './tipoProducto/tipoProducto.component';
import { TipoProductoFormComponent } from './tipo-producto-form/tipo-producto-form.component';
import {MatDialogModule} from '@angular/material/dialog'
import { AuthedGuard } from './guards/authed.guard';

@NgModule({
  declarations: [		
    AppComponent,
    LoginComponent,
    RegistrosComponent,
    InicioComponent,
    MenuComponent,
    ShopComponent,
    TablaGenericaComponent,
    TipoProductoComponent,
    TipoProductoFormComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    TipoProductoService, 
    AuthedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
