import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CrearPostComponent } from '../../tools/crear-post/crear-post.component';
import { PostComponent } from '../../tools/post/post.component';
import { FirebaseTSFirestore, Limit, OrderBy, Where } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [MatIconModule, CrearPostComponent, PostComponent, NgFor],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.css'
})
export class PostFeedComponent {

  firestore = new FirebaseTSFirestore();
  posts: PostData [] = [];
  constructor(private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.obtenerPublacion();
  }

  crearPublicacionClick() {
    this.dialog.open(CrearPostComponent);
  }
  obtenerPublacion() {
    this.firestore.getCollection(
      {
        path: ["Publicaciones"],
        where: [
          new OrderBy("timestamp", "desc"),
          new Limit(10)
        ],
        onComplete: (result) => {
          result.docs.forEach(
            doc => {
              let post = <PostData>doc.data();
              post.postId = doc.id;
              this.posts.push(post);
            }
          )
        },
        onFail: err => {

        }
      }
    );
  }
}

export interface PostData {
  comment: string;
  creatorId: string;
  imageBase64?: string;
  postId: string;
}
