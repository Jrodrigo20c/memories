import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AutenticadorComponent } from './tools/autenticador/autenticador.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'memories';
  auth = new FirebaseTSAuth();
  
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
              
            },
            whenSignedInAndEmailNotVerified: user => {
              this.router.navigate(["correoVerificacion"]);
            },
            whenSignedInAndEmailVerified: user => {

            },
            whenChanged: user => {

            }
          }
        );
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
