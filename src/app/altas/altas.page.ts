import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Alumno } from '../alumno';
import { AlumnosService } from '../servicios/alumnos.service';

@Component({
  selector: 'app-altas',
  templateUrl: './altas.page.html',
  styleUrls: ['./altas.page.scss'],
})
export class AltasPage
{
  public alumno:Alumno = { 'id': -1, 'nombre': '','apellido1':'',
                    'apellido2':'', 'fechaNac':new Date(), 'email':'',
                    'password':'', 'rol_id':2};

  constructor(private loadingController: LoadingController,
    private alertController: AlertController,
    private alumnoService:AlumnosService,
    private navCtrl: NavController) { }

//crear alumno
crearAlumno()
{
  if(this.alumno.nombre == '' || this.alumno.email == '' || this.alumno.password == '')
  {
    this.errAlert();
  }
  else
  {
    this.altaAlumno();
    this.navCtrl.navigateForward('matricula', {state: this.alumno});
  }
}

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
//ALTA A ALUMNO
async altaAlumno()
  {
    const loading = await this.loadingController.create({
      message:'Cargando...'
    });
    await loading.present();
    await this.alumnoService.addAlumno(this.alumno)
      .subscribe(res => {
        console.log(res);
        loading.dismiss();
      }, err =>{
        console.log(err);
        loading.dismiss();
      });
  }

}
