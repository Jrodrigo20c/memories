import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CorreoVerificacionComponent } from './pages/correo-verificacion/correo-verificacion.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path:"correoVerificacion", component: CorreoVerificacionComponent},
    {path: "**", component: HomeComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }