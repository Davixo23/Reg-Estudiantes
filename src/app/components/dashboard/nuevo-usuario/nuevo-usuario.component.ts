import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestApiService } from '../../../services/rest-api.service';
import { Estudiante } from '../dashboard.component';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [NavbarComponent,MatInputModule,MatFormFieldModule, MatButtonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent {
  private nuevoEstudiante : Estudiante={
    "nombre": "",
    "apellido": "",
    "carrera": "",
    "edad": 0
  };
  constructor(private router:Router){}
  servicio_rest= inject(RestApiService);

  formNuevoEstudiante= new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(60),Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)]),
    apellido:new FormControl('',[Validators.required, Validators.maxLength(60),Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)]),
    carrera: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern(/^[A-Z][a-zA-Z\s.]*$/)
    ]),
    edad: new FormControl(0, [Validators.required, Validators.min(18), Validators.max(65)])

});
// post para añadir a estudiantes
guardarDatos():void{
  if (this.formNuevoEstudiante.value.nombre !== null && this.formNuevoEstudiante.value.nombre !== undefined) {
    this.nuevoEstudiante.nombre = this.formNuevoEstudiante.value.nombre;
  }
  if (this.formNuevoEstudiante.value.apellido !== null && this.formNuevoEstudiante.value.apellido !== undefined) {
    this.nuevoEstudiante.apellido = this.formNuevoEstudiante.value.apellido;
  }
  if (this.formNuevoEstudiante.value.carrera !== null && this.formNuevoEstudiante.value.carrera !== undefined) {
    this.nuevoEstudiante.carrera = this.formNuevoEstudiante.value.carrera;
  }
  if (this.formNuevoEstudiante.value.edad !== null && this.formNuevoEstudiante.value.edad !== undefined) {
    this.nuevoEstudiante.edad = this.formNuevoEstudiante.value.edad;
  }

  this.servicio_rest.guardarEstudiante(this.nuevoEstudiante).subscribe(datos=>{
    console.log("el nuevo estudiante esta guardado");
    console.log(datos);
    alert('Registrado con éxito');
  });
  
  setTimeout(() => {
    this.router.navigate(['/dashboard']);
  },  2000); 
}

}
