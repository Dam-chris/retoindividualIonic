import { Component, forwardRef, Inject, Injectable, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppComponent } from '../app.component';
import { PhotoService } from '../servicios/photo.service';
@Component({
  selector: 'app-cambiar-perfil',
  templateUrl: './cambiar-perfil.page.html',
  styleUrls: ['./cambiar-perfil.page.scss'],
})
export class CambiarPerfilPage implements OnInit {

  clickedImage: string;
  data = { 'alumnoId': -1, 'fotoperfil':'' };

  options: CameraOptions = {
    quality: 15,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
 
  constructor(private camera: Camera,
              private userData: Storage,
              private loadingController:LoadingController,
              private photoService:PhotoService,
              @Inject(forwardRef(() => AppComponent)) private principal: AppComponent) { }

  captureImage() 
  {
    this.camera.getPicture(this.options).then((imageData) => 
    {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
      //gurado la imagen en la bbddlocal
      this.userData.get("data").then((result) =>
      {
          //pasrle los datos al servicio que hace put de l aimagen de eprfil en usuario
          this.data.alumnoId = result.id;
          this.data.fotoperfil = this.clickedImage;
          console.log(this.data);
          
          
          this.setImage(this.data);

          //mostrar la imagen
          this.principal.getphotoProfile(result.id);
      });

    },(err) => 
    {
      console.log(err);
      // Handle error
    });
  }
  getImg(data)
  {

  }
  //enviar img
  async setImage(datos:any)
  {
    await this.photoService.saveImage(datos)
      .subscribe(res => 
        {
          console.log(res);

        }, err =>
        {
          console.log(err);
        });
  }

  ngOnInit() 
  {
    
  }
//arancar la app desde el navegador: ionic cordova run browser
//si se queda crasheado con problema de dependencias al hacerr ionic serve -l npm i @ionic/core
//instalar pugin de la camara:  ionic cordova plugin add cordova-plugin-camera, npm install @ionic-native/camera
}
