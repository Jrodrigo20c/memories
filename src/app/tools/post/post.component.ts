import { Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PostData } from '../../pages/post-feed/post-feed.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ComentariosComponent } from '../comentarios/comentarios.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnChanges {
  @Input() postData?: PostData;
  nombreCreador: string = 'Usuario desconocido';
  descripcionCreador: string = 'Sin descripción disponible';
  firestore = new FirebaseTSFirestore();

  constructor(private dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postData?'] && this.postData?.creatorId) {
      this.creadorInfo();
    }
  }

  comentarioClick(){
    this.dialog.open(ComentariosComponent, {data: this.postData?.postId});
  }

  creadorInfo() {
    const creatorId = this.postData?.creatorId;
    if (!creatorId) {
      console.warn('No se proporcionó un ID de creador.');
      return;
    }
    this.firestore.getDocument(
      {
        path: ['usuarios', creatorId],
        onComplete: result => {
          const userDocument = result.data() as { [key: string]: any } | undefined;
          if (userDocument) {
            this.nombreCreador = userDocument['publicName'] || 'Usuario desconocido';
            this.descripcionCreador = userDocument['description'] || 'Sin descripción disponible';
          } else {
            console.warn(`No se encontró un documento de usuario para el ID: ${creatorId}`);
          }
        },
        onFail: error => {
          console.error('Error al obtener la información del creador:', error);
        }
      }
    );
  }
}
