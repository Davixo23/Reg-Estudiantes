import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../components/dashboard/dashboard.component';



@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private urlApi='http://192.168.0.13:3000/estudiantes';
  constructor(private http:HttpClient) { }
  getEstudiantes():Observable<any>{
    console.log("devuelo estudiantes");
    return this.http.get(this.urlApi);
  }
  guardarEstudiante(nuevoEstudiante:Estudiante):Observable<any>{
    console.log("creamos estudiante");
    return this.http.post(this.urlApi,nuevoEstudiante);
  }
  eliminarEstudiante(id:string):Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/${id}`);
  }
}
