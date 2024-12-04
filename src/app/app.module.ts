import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from './app-routing.module';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from "../environments/environment";
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
    declarations: [
      AppComponent,
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatBottomSheetModule,
      MatCardModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule {
    constructor(){
        FirebaseTSApp.init(environment.firebaseConfig);
      }
   }