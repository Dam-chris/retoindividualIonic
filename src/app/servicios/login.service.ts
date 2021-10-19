import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../Usuario';

const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'}) 
};

@Injectable({
  providedIn: 'root'
})
//192.168.176.183 ip de maquina symfony
export class LoginService
{
  public url = "http://localhost:8000/ws/login";
  constructor(private httpClient: HttpClient) { }

  combrobarUsuario(usuario:Usuario)
  {
    return this.httpClient.post(this.url, usuario);
  }
}
