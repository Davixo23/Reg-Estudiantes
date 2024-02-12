import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RestApiService } from '../../services/rest-api.service';
import { ConfirmacionEliminarComponent } from './confirmacion-eliminar/confirmacion-eliminar.component';



export interface Estudiante {
  nombre: string;
  apellido: string;
  edad: number;
  carrera: string;
}// se crea una interface para devolver el tipo de dato y recibir la informacion que se presenta desde el servidor
/* const ELEMENT_DATA: Estudiante[] = [
  {nombre: '', apellido: 'a', edad: 15,carrera: 'sistemas'},
  {nombre: 'Hydrogen', apellido: 'a', edad: 15,carrera: 'sistemas'},
  {nombre: 'Hydrogen', apellido: 'a', edad: 15,carrera: 'sistemas'},
  {nombre: 'Hydrogen', apellido: 'a', edad: 15,carrera: 'sistemas'},
  {nombre: 'Hydrogen', apellido: 'a', edad: 15,carrera: 'sistemas'},
  {nombre: 'Hydrogen', apellido: 'a', edad: 15,carrera: 'sistemas'},
  {nombre: 'Hydrogen', apellido: 'a', edad: 15,carrera: 'sistemas'},
]; */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit{

  @Output() estudianteEliminado = new EventEmitter<string>();

  constructor(public dialog: MatDialog) {}
  servicio_rest= inject(RestApiService);
  ngOnInit(): void {
    this.servicio_rest.getEstudiantes().subscribe((datos: Estudiante[]) => {
      console.log("datos requeridos estudiantes");
      console.log(datos);
      this.listaEstudiantes = datos; 
    });
  }
  nombresColumns: string[] = ['id','nombre', 'apellido', 'edad', 'carrera','acciones'];
  listaEstudiantes : Estudiante[]=[];
  editarEstudiante(id:string):void{}
  eliminarEstudiante(id:string):void{

    const dialogRef = this.dialog.open(ConfirmacionEliminarComponent, {
      width: '350px',
      data: { titulo: 'Confirmar eliminación', mensaje: '¿Estás seguro de eliminar este estudiante?' }
    });

    dialogRef.afterClosed().subscribe(confirmar => {
      if (confirmar) {
        // Lógica para eliminar el estudiante aquí
        // Por ejemplo:
        this.servicio_rest.eliminarEstudiante(id).subscribe(() => {
          this.estudianteEliminado.emit(id);
          this.actualizar();
        });
      }
    });
  }
  actualizar():void{
    this.servicio_rest.getEstudiantes().subscribe((datos: Estudiante[]) => {
      console.log("datos requeridos estudiantes");
      console.log(datos);
      this.listaEstudiantes = datos; 
    });
  }
}
