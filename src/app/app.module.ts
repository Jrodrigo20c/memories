import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from './app-routing.module';
import { environment } from "../environments/environment";
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire/compat";
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from "./pages/home/home.component";
import { AutenticadorComponent } from "./tools/autenticador/autenticador.component";
import { CorreoVerificacionComponent } from "./pages/correo-verificacion/correo-verificacion.component";
import { PerfilComponent } from "./tools/perfil/perfil.component";
import { PostFeedComponent } from "./pages/post-feed/post-feed.component";
import { CrearPostComponent } from "./tools/crear-post/crear-post.component";

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      AutenticadorComponent,
      CorreoVerificacionComponent,
      PerfilComponent,
      PostFeedComponent,
      CrearPostComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatBottomSheetModule,
      MatCardModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      MatDialogModule,
      MatIconModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule {
    
   }