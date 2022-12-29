import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrosComponent } from './registros/registros.component';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './inicio/inicio.component';
import { TipoProductoComponent } from './tipoProducto/tipoProducto.component';
import { AuthedGuard } from './guards/authed.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: "", redirectTo: "/inicio", pathMatch: "full"},
  {path: "login", component: LoginComponent, title:"Login", canActivate:[AuthedGuard]},
  {path: "registro", component: RegistrosComponent, title: "Register", canActivate:[AuthedGuard]},
  {path: "inicio", component: InicioComponent, title: "Inicio"},
  {path: "tipoProducto", component: TipoProductoComponent, title: "Tipos De Productos", canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
