import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrosComponent } from './registros/registros.component';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './inicio/inicio.component';
import { TipoProductoComponent } from './tipoProducto/tipoProducto.component';
import { AuthedGuard } from './guards/authed.guard';
import { AdminGuard } from './guards/admin.guard';
import { ProductoComponent } from './producto/producto.component';
import { ShopComponent } from './shop/shop.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FacturaComponent } from './factura/factura.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

const routes: Routes = [
  {path: "", redirectTo: "/inicio", pathMatch: "full"},
  {path: "login", component: LoginComponent, title:"Login", canActivate:[AuthedGuard]},
  {path: "registro", component: RegistrosComponent, title: "Register", canActivate:[AuthedGuard]},
  {path: "inicio", component: InicioComponent, title: "Inicio"},
  {path: "tipoProducto", component: TipoProductoComponent, title: "Tipos De Productos", canActivate:[AdminGuard]},
  {path: "producto", component: ProductoComponent, title: "Productos", canActivate:[AdminGuard]},
  {path: "shop/:codigo", component: ShopComponent, title: "Tienda"},
  {path: "carrito", component: CarritoComponent, title: "Carrito"},
  {path: "factura", component: FacturaComponent, title: "Factura"},
  {path: "estadisticas", component: EstadisticasComponent, title: "Estadisticas"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
