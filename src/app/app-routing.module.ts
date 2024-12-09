import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CorreoVerificacionComponent } from './pages/correo-verificacion/correo-verificacion.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path:"correoVerificacion", component: CorreoVerificacionComponent},
    {path:"postFeed", component: PostFeedComponent},
    {path: "**", component: HomeComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }