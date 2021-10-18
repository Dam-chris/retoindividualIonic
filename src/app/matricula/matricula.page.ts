
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Curso } from '../curso';
import { Matricula } from '../matricula';
import { AlumnosService } from '../servicios/alumnos.service';
import { CursosService } from '../servicios/cursos.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.page.html',
  styleUrls: ['./matricula.page.scss'],
})
export class MatriculaPage implements OnInit 
{
  cursos:Curso[] = [];
  public matricula:Matricula = {'id':-1, 'fecha': new Date(),'cursoId':-1, 'alumnoId':-1};

constructor(public router:Router, 
    private loadingController:LoadingController, 
    private alumnosService:AlumnosService,
    private cursosService: CursosService,
    private alertController:AlertController) 
{ 
  if (router.getCurrentNavigation().extras.state) 
  {
    const alumnoData = this.router.getCurrentNavigation().extras.state;
    this.matricula.alumnoId = alumnoData.id;
  }
}
async getCursos()
  {
    await this.cursosService.getCursos()
    .subscribe(res =>
      {
        this.cursos = res;
      }, err =>
      {
        console.log(err);  
      });
  }
//crear matricula
crearMatricula()
{
  
  if(this.matricula.cursoId == -1|| this.matricula.alumnoId == -1)
  {
    this.errAlert();
  }
  else
  {
   
    this.addMatricula();
    this.router.navigateByUrl('inicio');
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

//post de la matricula
async addMatricula()
  {
    const loading = await this.loadingController.create({
      message:'Cargando...'
    });
    await loading.present();
    await this.alumnosService.addMatricula(this.matricula)
      .subscribe(res => {
        console.log(res);
        loading.dismiss();
      }, err =>{
        console.log(err);
        loading.dismiss();
      });
  }
  public cursoId(): void 
  { //here item is an object 
    console.log(this.matricula.cursoId)
    
  }
  
  ngOnInit() 
  {
    this.getCursos();
  }

}
