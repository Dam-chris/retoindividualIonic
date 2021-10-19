import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { LoginService } from '../servicios/login.service';
import { Usuario } from '../Usuario';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit 
{
  usuario:Usuario = {'id': -1, 'email': '', 'password': ''};
  data:any;
  paginaDestino:string;

  constructor(private loadingController:LoadingController, 
              private alertController:AlertController,
              private loginService:LoginService,
              private userData:Storage,
              private router:Router,
              @Inject(forwardRef(() => AppComponent))private principal: AppComponent) 
              { }
//mensaje de error
async errAlert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'No pueden haber campos vacios',
    buttons: ['OK']
  });

  await alert.present();
}
async errUserNotFound() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    message: 'Usuario o contraseña invalidos!!',
    buttons: ['OK']
  });

  await alert.present();
}

//post de la matricula
async enviarLogin()
  {
    const loading = await this.loadingController.create(
    {
      message:'Cargando...'
    });
    await loading.present();
    await this.loginService.combrobarUsuario(this.usuario)
      .subscribe(res => 
      {
        this.data = res;
        console.log(res);
        /*
          Guardado de datos en local storage para manejo de la sesion
        */
        this.userData.set("id", this.data.id);
        this.userData.set("nombre", this.data.nombre);
        this.userData.set("email", this.data.email);
        this.userData.set("password", this.data.password);
        this.userData.set("rol", this.data.rol.nombre );
        this.userData.set("data", this.data);

        if ( this.data.rol.nombre == 'ROLE_ADMIN') 
        {
            this.paginaDestino = 'inicio';
        }
        if( this.data.rol.nombre == 'ROLE_USER')
        {
            this.paginaDestino = 'asignaturas';
        }
       
        //redirect a inicio
        this.router.navigateByUrl(this.paginaDestino)
        .then(() => 
        {
          this.principal.cargarMenu();
        });

        loading.dismiss();
        
      }, err =>
      {
        if (err.status == 404 || err.status == 500) 
        {
            this.errUserNotFound();
        }
        loading.dismiss();
      });
  }

  comprobarLogin()
  {
    if (this.usuario.email == '' || this.usuario.password == '') 
    {
      this.errAlert();
    }
    else
    { 
      this.enviarLogin();
    }
  }
    
  
  ngOnInit() 
  {
    
  }

}
