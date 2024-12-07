import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-autenticador',
  standalone: true,
  imports: [MatCardModule, NgIf],
  templateUrl: './autenticador.component.html',
  styleUrl: './autenticador.component.css'
})
export class AutenticadorComponent {
  state = AutenticadorCompState.LOGIN;
  firebasetsAuth: FirebaseTSAuth;
  constructor(private bottomSheetRef: MatBottomSheetRef){
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {}


  login(
    loginCorreo: HTMLInputElement,
    loginContrasena: HTMLInputElement,
  ){
    let correo = loginCorreo.value;
    let contrasena = loginContrasena.value;

    if(
      this.isNotEmpty(correo)&&
      this.isNotEmpty(contrasena)){
        this.firebasetsAuth.signInWith(
          {
            email: correo,
            password: contrasena,
            onComplete: (uc) => {
              this.bottomSheetRef.dismiss();
            },
            onFail: (err) => {
              alert("Usuario o contraseña equivocado")
            }
          }
        );
      }
  }

  registroClick(
    registroCorreo: HTMLInputElement,
    registroContrasena: HTMLInputElement,
    registroConfirmarContrasena: HTMLInputElement
  ){
    let correo = registroCorreo.value;
    let contrasena = registroContrasena.value;
    let confirmarContrasena = registroConfirmarContrasena.value;

    if(
      this.isNotEmpty(correo)&&
      this.isNotEmpty(contrasena)&&
      this.isNotEmpty(confirmarContrasena)&&
      this.isAMatch(contrasena, confirmarContrasena)
    ){
      this.firebasetsAuth.createAccountWith(
      {
        email: correo,
        password: contrasena,
        onComplete: (uc) => {
          this.bottomSheetRef.dismiss();
        },
        onFail: (err) => {
          alert("Error al crear tu cuenta (mucho papeleo, ingresa bien tus datos❌)");
        }
      }
    )}
  }

  reiniciar(
    reinicioCorreo: HTMLInputElement,
  ){
    let correo = reinicioCorreo.value;

    if(
      this.isNotEmpty(correo))
    {
      this.firebasetsAuth.sendPasswordResetEmail(
        {
          email: correo,
          onComplete: (err) => {
            this.bottomSheetRef.dismiss();
          }
        }
      );
    }
    }

  isNotEmpty(text: string){
    return text != null && text.length > 0;
  }

  isAMatch(text: string, comparedWith: string){
    return text == comparedWith;
  }

  ovidasteContrasenaClick(){
    this.state = AutenticadorCompState.OLVIDASTE_CONTRASEÑA;
  }
  crearCuentaClick(){
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
        return "Registro";
      case AutenticadorCompState.OLVIDASTE_CONTRASEÑA:
        return "Olvidaste Contraseña";
    }
  }
}
export enum AutenticadorCompState{
  LOGIN,
  REGISTRO,
  OLVIDASTE_CONTRASEÑA
}
