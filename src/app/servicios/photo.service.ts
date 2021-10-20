import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../alumno';
//https://www.positronx.io/ionic-cordova-camera-plugin-tutorial-with-example/

const httpOptions = { 
  headers: new HttpHeaders({'Content-Type': 'application/json'}) 
};
@Injectable({
  providedIn: 'root'
})
export class PhotoService 
{

  public url = "http://localhost:8000/ws/imagenes";
  
  constructor(private httpClient: HttpClient) { }
  
  saveImage(imageJson)
  {
    return this.httpClient.put(this.url, imageJson);
  }

  getPhoto(alumnoId):Observable<Alumno>
  {
    return this.httpClient.get<Alumno>(this.url + "/get/" +alumnoId );
  }
  
}
