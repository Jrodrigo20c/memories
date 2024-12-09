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
  mostrarPerfil = false;
  userDocument: userDocument | null = null;
  
  constructor(private loginSheet: MatBottomSheet, private router: Router) {
    this.auth.listenToSignInStateChanges(
      user => {
        if (user) {
          this.auth.checkSignInState({
            whenSignedIn: (user) => {
              if (user.emailVerified) {
                this.obtenerPerfil(); 
              } else {
                this.router.navigate(['correoVerificacion']); 
              }
            },
            whenSignedOut: () => {
              console.log('Usuario no autenticado');
              this.userTienePerfil = false;
              this.mostrarPerfil = false;
            }
          });
        }
      });
    }
  
    obtenerPerfil() {
      const currentUser = this.auth.getAuth().currentUser;
      if (!currentUser) {
        console.warn('Usuario no autenticado. No se puede obtener el perfil.');
        this.userTienePerfil = false;
        return;
      }
  
      this.firestore.getDocument({
        
        path: ['Usuarios', currentUser.uid],
        onComplete: (result) => {
          this.userTienePerfil = result.exists;
          if (this.userTienePerfil) {
            this.router.navigate(['postFeed']); 
          } else {
            this.mostrarPerfil = true;
            console.warn('No se encontró un perfil. Mostrando la interfaz de creación de perfil.');
          }
        },
        onFail: (err) => {
          console.error('Error al verificar el perfil:', err);
        },
      });
    }
  
    accederClick() {
      this.loginSheet.open(AutenticadorComponent);
    }
  
    salirClick() {
      this.auth.signOut();
    }
  
    conectado() {
      return this.auth.isSignedIn();
    }
  }
export interface userDocument {
  publicName: string;
  description: string;
}