
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  constructor(private userData:Storage, 
            private alertController:AlertController,
            private router:Router) {}

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
       if ( result == 'ROLE_ADMIN') 
       {
         this.appPages.splice(1,0,{ title: 'Altas', url: '/altas', icon: 'add'},); 
       }
       
     });
  }
}
