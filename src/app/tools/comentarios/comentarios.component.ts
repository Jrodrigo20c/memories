import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent {
  firestore = new FirebaseTSFirestore();

  constructor(@Inject(MAT_DIALOG_DATA) private postId:string){}

  enviarClick(comentarioInput: HTMLInputElement){
    this.firestore.create(
      {
        path: ["posts", this.postId, "postsComentarios"],
        data: {
          comment: comentarioInput.value,
          creatorId: "",
          creatorName: "",
          timestamp: FirebaseTSApp.getFirestoreTimestamp()
        }
      }
    )
  }
}
