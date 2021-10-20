
import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PhotoService } from './servicios/photo.service';
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
  
  constructor(private userData:Storage, 
    private loadingController:LoadingController,
    private photoService:PhotoService) {}


  async getphotoProfile(usuarioId)
  {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present(); 
    await this.photoService.getPhoto(usuarioId)
    .subscribe(res =>
      {
        this.usuario.imagen = res.fotoperfil;
        console.log(res);
        
        loading.dismiss();
      }, err =>
      {
        console.log(err); 
        loading.dismiss(); 
      });
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

        this.getphotoProfile(result.id);
     });
  }
}
