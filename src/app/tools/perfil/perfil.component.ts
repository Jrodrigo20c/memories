import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgClass, MatButtonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  
  @Input() show: boolean = false;

  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;

  constructor(){
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
  }

  togglePerfil() {
    this.show = !this.show;
  }

  ngOnInit(){
  }

  continuarClick(
    nombreInput: HTMLInputElement,
    descripcionInput: HTMLTextAreaElement
  ) {
    let nombre = nombreInput.value.trim();
    let descripcion = descripcionInput.value.trim();
    if (!nombre || !descripcion) {
      alert("Por favor completar todos los campos");
      return;
    }

    const currentUser = this.auth.getAuth().currentUser;
    if(!currentUser) {
      alert("Usuario no autenticado");
      return;
    }
    this.firestore.create(
      {
        path: ["users", currentUser.uid],
        data: {
          publicName: nombre,
          description: descripcion
        },
        onComplete: (docId) => {
          alert("Perfil creado");
          nombreInput.value = "";
          descripcionInput.value = "";
          this.togglePerfil();
        },
        onFail: (err) => {
          console.error("Error creando el perfil:", err);
          alert("Error al crear tu perfil. Por favor intentarlo nuevamente.");
        }
      }
    );
  }

}
