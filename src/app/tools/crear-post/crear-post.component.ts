import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-crear-post',
  standalone: true,
  imports: [MatCardModule, MatIconModule, NgIf],
  templateUrl: './crear-post.component.html',
  styleUrl: './crear-post.component.css'
})
export class CrearPostComponent {
  imagenSeleccionada: File | null = null;
  imagenPrevia: string | null = null;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();

  constructor(private dialog: MatDialogRef<CrearPostComponent>) { }

  ngOnInit(): void { }

  publicacionClick(comentarioInput: HTMLTextAreaElement) {
    let comentario = comentarioInput.value;
    if(comentario.length <= 0) return;
    if(this.imagenSeleccionada){
      this.publicacionImagen(comentario);
    } else {
      this.cargarPublicacion(comentario);
    }
  }

  publicacionImagen(comentario: string) {
    let postId = this.firestore.genDocId();
    let imagenBase64 = this.imagenPrevia ? this.imagenPrevia.split(',')[1] : null;
    this.firestore.create(
      {
        path: ["Publicaciones", postId],
        data: {
          Comment: comentario,
          creatorId: this.auth.getAuth().currentUser?.uid,
          imageBase64: imagenBase64,
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        },
        onComplete: (docId) => {
          this.dialog.close();
        },
        onFail: (err) => {
          console.error("Error al crear la publicación:", err);
        }
      }
    );
  }

  cargarPublicacion(comentario: string){
    this.firestore.create(
      {
        path: ["Publicaciones"],
        data: {
          Comment: comentario,
          creatorId: this.auth.getAuth().currentUser?.uid,
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        },
        onComplete: (docId) => {
          this.dialog.close();
        },
        onFail: (err) => {
          console.error("Error al crear la publicación:", err);
        }
      }
    );
  }

  fotoSeleccionada(seleccionarFoto: HTMLInputElement) {
    if (seleccionarFoto.files && seleccionarFoto.files.length > 0) {
      this.imagenSeleccionada = seleccionarFoto.files[0];

      const lectorArchivo = new FileReader();
      lectorArchivo.onload = () => {
        this.imagenPrevia = lectorArchivo.result as string;
      };
      lectorArchivo.readAsDataURL(this.imagenSeleccionada);
    } else {
      this.imagenSeleccionada = null;
      this.imagenPrevia = null;
      console.warn('No se seleccionó ningún archivo.');
    }
  }
}
