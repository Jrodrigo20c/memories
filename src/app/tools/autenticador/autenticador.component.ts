import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-autenticador',
  standalone: true,
  imports: [MatCardModule, NgIf],
  templateUrl: './autenticador.component.html',
  styleUrl: './autenticador.component.css'
})
export class AutenticadorComponent {
  state = AutenticadorCompState.LOGIN;
  constructor(){}
  ngOnInit(): void {}

  ovidasteContrasenaClick(){
    this.state = AutenticadorCompState.OLVIDASTE_CONTRASEÑA;
  }
  registroClick(){
    this.state = AutenticadorCompState.REGISTRO;
  }
  iniciarSesionClick(){
    this.state = AutenticadorCompState.LOGIN;
  }
  isIniciarSesionState(){
    return this.state == AutenticadorCompState.LOGIN;
  }
  isRegistroState(){
    return this.state == AutenticadorCompState.REGISTRO;
  }
  isOlvidasteContrasenaState(){
    return this.state == AutenticadorCompState.OLVIDASTE_CONTRASEÑA;
  }
  getStateText(){
    switch(this.state){
      case AutenticadorCompState.LOGIN:
      return "Login";
      case AutenticadorCompState.REGISTRO:
        return "Crear Cuenta";
      case AutenticadorCompState.OLVIDASTE_CONTRASEÑA:
        return "¿Olvidaste tu Contraseña?";
    }
  }
}
export enum AutenticadorCompState{
  LOGIN,
  REGISTRO,
  OLVIDASTE_CONTRASEÑA
}
