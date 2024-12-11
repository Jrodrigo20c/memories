import { Component, Input, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PostData } from '../../pages/post-feed/post-feed.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() postData?: PostData;

  ngOnInit(): void{

  }
}
