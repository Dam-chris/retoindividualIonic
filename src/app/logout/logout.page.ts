import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  
  constructor(private alertController:AlertController,
              private router:Router,
              private userData:Storage) { }

 /* async presentAlertConfirm() 
  {
    const alert = await this.alertController.create(
    {
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>¿Esta seguro de quere cerrar la sesion?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => 
          {
            
          }
        }, 
        {
          text: 'Okay',
          handler: () => 
          {
            this.userData.remove("emial");
            this.userData.remove("password");
            this.userData.remove("rol");

            this.router.navigateByUrl('login')
            .then(() => 
            {
              this.principal.cargarMenu();
            });
          }
        }
      ]
    });
    await alert.present();
  }*/

  ngOnInit() 
  {
    //cerrar sesinon
    this.userData.remove("emial");
    this.userData.remove("password");
    this.userData.remove("rol");
    //redirect a inicio
    this.router.navigateByUrl('inicio')
    .then(() =>
    {
      window.location.reload();
    });
  }

}
