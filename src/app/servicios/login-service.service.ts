import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../Usuario';

const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'}) 
};

@Injectable({
  providedIn: 'root'
})

export class LoginServiceService 
{
  public url = "http://192.168.176.183:8000/ws/login";
  constructor(private httpClient: HttpClient) { }

  combrobarUsuario(usuario:Usuario)
  {
    return this.httpClient.post(this.url, usuario);
  }
}
