import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

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

  constructor() {}

  ngOnInit() {}

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
