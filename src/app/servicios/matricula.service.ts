import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'}) 
};

@Injectable({
  providedIn: 'root'
})
export class MatriculaService 
{
  public url = "http://192.168.176.183:8000/ws/matricula";

  constructor(private httpClient: HttpClient) { }

  deleteMatricula(alumnoId)
  {
    return this.httpClient.delete(this.url + "/delete/" + alumnoId);
  }
}
