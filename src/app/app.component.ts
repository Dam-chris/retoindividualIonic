
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent 
{
  public appPages = [
    { 
      title: 'Inicio', 
      url: '/inicio', 
      icon: 'home'
    },
    { 
      title: 'Log In', 
      url: '/login', 
      icon: 'at' 
    }
  ];

  usuario = {rol:'', nombre:'', apellido1:'', imagen:''};
  link:string = '';
  
  constructor(private userData:Storage) {}


  cargaImg(imagen:string)
  {
    this.usuario.imagen = imagen;
  }

  cargarMenu()
  {
     //comprobar el rol y el inicio de session
     this.userData.get("email").then((result) =>
     {
       if ( result != null) 
       {
         this.appPages.splice(1,1,{title:'Log Out', url:'logout', icon:'share'}); 
       }
       
     });
     this.userData.get("rol").then((result) =>
     {
        this.usuario.rol = result;

       if ( result == 'ROLE_ADMIN') 
       {
          this.appPages.splice(1,0,{ title: 'Altas', url: '/altas', icon: 'add'},);
       }
       if( result == 'ROLE_USER')
       {
          this.appPages[0].url = "/asignaturas";
       }
       if ( result != null) 
       {
          this.link = "cambiar-perfil";
       }
     });
     this.userData.get("data").then((result)=>
     {
        this.usuario.nombre = result.nombre;
        this.usuario.apellido1 = result.apellido1;
     });
  }
}
