import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AutenticadorComponent } from './tools/autenticador/autenticador.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { NgIf } from '@angular/common';
import { PerfilComponent } from './tools/perfil/perfil.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, PerfilComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'memories';
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userTienePerfil = true;
  userDocument: userDocument | null = null;
  
  constructor(private loginSheet: MatBottomSheet,
    private router: Router
  ){
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {
              
              
            },
            whenSignedOut: user => {
              this.userDocument = null;
              this.userTienePerfil = false;
            },
            whenSignedInAndEmailNotVerified: user => {
              this.router.navigate(["correoVerificacion"]);
            },
            whenSignedInAndEmailVerified: user => {
              this.obtenerPerfil();
            },
            whenChanged: user => {

            }
          }
        );
      }
    );
  }
  
obtenerPerfil(){
  const currentUser = this.auth.getAuth().currentUser;
  if (!currentUser) {
    console.warn("Usuario no autenticado. No se puede obtener el perfil.");
    this.userTienePerfil = false;
    return;
  }

  this.firestore.listenToDocument(
    {
      name: "Obteniendo documento",
      path: ["Usuarios", currentUser.uid],
      onUpdate: (result) => {
        this.userDocument = <userDocument>result.data();
        this.userTienePerfil = result.exists;
        //if (result.exists) {
        //  this.userDocument = result.data() as userDocument;
        //  this.userTienePerfil = true;
        //} else {
        //  this.userTienePerfil = false;
        //}
      }
    }
  );
}

  salirClick(){
    this.auth.signOut();
  }

  conectado(){
    return this.auth.isSignedIn();
  }

  accederClick(){
    this.loginSheet.open(AutenticadorComponent);
  }
}

export interface userDocument {
  publicName: string;
  description: string;
}