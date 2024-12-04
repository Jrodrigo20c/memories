import { Component } from '@angular/core';
import { AutenticadorComponent } from '../../tools/autenticador/autenticador.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private loginsheet: MatBottomSheet){}

  ngOnInit(): void{}
  
  onGetStartedClick(){
    this.loginsheet.open(AutenticadorComponent)
  }

}
