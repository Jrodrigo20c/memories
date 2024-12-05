import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-correo-verificacion',
  standalone: true,
  imports: [],
  templateUrl: './correo-verificacion.component.html',
  styleUrl: './correo-verificacion.component.css'
})
export class CorreoVerificacionComponent {
  
  auth = new FirebaseTSAuth();

  constructor(private router: Router) {}

  ngOnInit(): void {
    if(
      this.auth.isSignedIn() &&
      !this.auth.getAuth()?.currentUser?.emailVerified
    ) {
      this.auth.sendVerificationEmail();
    } else {
      this.router.navigate([""]);
    }
  }

  reenviarClick(){
    this.auth.sendVerificationEmail();
  }
}
