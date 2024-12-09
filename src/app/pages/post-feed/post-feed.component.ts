import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CrearPostComponent } from '../../tools/crear-post/crear-post.component';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [MatIconModule, CrearPostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.css'
})
export class PostFeedComponent {

  constructor(private dialog: MatDialog){

  }
  ngOnInit(): void {}

  crearPublicacionClick(){
    this.dialog.open(CrearPostComponent);
  }
}
