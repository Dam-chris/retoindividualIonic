import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, of, throwError } from 'rxjs'; 
import { catchError, tap, map } from 'rxjs/operators'; 
import { Curso } from 'src/app/curso'; 

const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'}) 
};

@Injectable({
  providedIn: 'root'
})

export class CursosService 
{
  public url = "http://localhost:8000/ws/cursos";
  constructor(private httpClient: HttpClient) { }

  getCursos():Observable<Curso[]>
  {
    return this.httpClient.get<Curso[]>(this.url);
  }

}
