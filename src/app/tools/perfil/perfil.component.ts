import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
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
  
  @Input() show = true;
  imagePreview: string | null = null;

  firestore: FirebaseTSFirestore;
  auth: FirebaseTSAuth;

  constructor(private router: Router){
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
  }

  ngOnInit(){
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  continuarClick(
    nombreInput: HTMLInputElement,
    apellidoInput: HTMLInputElement,
    descripcionInput: HTMLTextAreaElement
  ) {
    let nombre = nombreInput.value.trim();
    let apellido = apellidoInput.value.trim();
    let descripcion = descripcionInput.value.trim();
    if (!nombre || !descripcion || !apellido) {
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
          publicLastName: apellido,
          description: descripcion
        },
        onComplete: (docId) => {
          alert("Perfil creado");
          nombreInput.value = "";
          apellidoInput.value = "";
          descripcionInput.value = "";
          this.show = false;
          this.router.navigate(['postFeed']);
        },
        onFail: (err) => {
          console.error("Error creando el perfil:", err);
          alert("Error al crear tu perfil. Por favor intentarlo nuevamente.");
        }
      }
    );
  }

}
