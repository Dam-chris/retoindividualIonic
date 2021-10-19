import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-cambiar-perfil',
  templateUrl: './cambiar-perfil.page.html',
  styleUrls: ['./cambiar-perfil.page.scss'],
})
export class CambiarPerfilPage implements OnInit {

  clickedImage: string;

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private camera: Camera,
              private userData: Storage,
              @Inject(forwardRef(() => AppComponent))private principal: AppComponent) { }

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
          this.userData.set(result.id+"", this.clickedImage);
      });

      this.principal.cargaImg(this.clickedImage);

    },(err) => 
    {
      console.log(err);
      // Handle error
    });
  }

  ngOnInit() 
  {
    this.userData.get("data").then((result) =>
    { 
        this.userData.get(result.id+"").then((result) =>
        {
          console.log(result);
            this.clickedImage = result;
            this.principal.cargaImg(result);
        });
    });
  }
//arancar la app desde el navegador: ionic cordova run browser
//si se queda crasheado con problema de dependencias al hacerr ionic serve -l npm i @ionic/core
//instalar pugin de la camara:  ionic cordova plugin add cordova-plugin-camera, npm install @ionic-native/camera
}
