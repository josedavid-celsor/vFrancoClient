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
import { TipoProductoService } from './services/TipoProducto.service';
import { TipoProductoComponent } from './tipoProducto/tipoProducto.component';
import {MatDialogModule} from '@angular/material/dialog'
import { AuthedGuard } from './guards/authed.guard';
import {MatPaginatorModule} from '@angular/material/paginator';
import {GTTableComponent} from '@aramirezj/ngx-generic-tables';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminGuard } from './guards/admin.guard';
import { ProductoComponent } from './producto/producto.component';
import { GFGenericFormComponent } from '@aramirezj/ngx-generic-form';
import { GFFormService } from '@aramirezj/ngx-generic-form';
import { ShopComponent } from './shop/shop.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { CarritoComponent } from './carrito/carrito.component';
import { CartaProductoComponent } from './carta-producto/carta-producto.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { FacturaComponent } from './factura/factura.component';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrosComponent,
    InicioComponent,
    MenuComponent,
    TipoProductoComponent,
    ProductoComponent,
    ShopComponent,
    CarritoComponent,
    CartaProductoComponent,
    FacturaComponent,
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
    MatDialogModule,
    MatPaginatorModule,
    GTTableComponent,
    MatSnackBarModule,
    GFGenericFormComponent,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    TipoProductoService,
    AuthedGuard,
    AdminGuard,
    GFFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
