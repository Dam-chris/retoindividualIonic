import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from '../nota';

const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'}) 
};

@Injectable({
  providedIn: 'root'
})
export class NotasService 
{
  public url = "http://localhost:8000/ws/notas";

  constructor(private httpClient: HttpClient) { }

  getNotas(alumnoId):Observable<Nota[]>
  {
    return this.httpClient.get<Nota[]>(this.url + "/" + alumnoId);
  }
}
