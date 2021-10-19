import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../alumno';
import { Matricula } from '../matricula';

const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'}) 
};

@Injectable({
  providedIn: 'root'
})
export class AlumnosService 
{
  public url = "http://localhost:8000/ws/alumnos";
  constructor(private httpClient: HttpClient) { }
  getAlumnos():Observable<Alumno[]>
  {
    return this.httpClient.get<Alumno[]>(this.url);
  }
  getAlumnosByCurso(cursoId)
  {
    return this.httpClient.get<Alumno[]>(this.url + "/" + cursoId);
  }
  addAlumno(alumno: Alumno)
  {
    return this.httpClient.post(this.url+"/add", alumno);
  }
  addMatricula(matricula:Matricula)
  {
    return this.httpClient.post(this.url+"/addMatricula", matricula);
  }
}
