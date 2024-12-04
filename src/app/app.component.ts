import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutenticadorComponent } from './tools/autenticador/autenticador.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'memories';
  constructor(private loginSheet: MatBottomSheet){}

  onLoginClick(){
    this.loginSheet.open(AutenticadorComponent);
  }
}
