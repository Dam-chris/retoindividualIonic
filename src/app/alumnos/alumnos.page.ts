import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Alumno } from '../alumno';
import { AlumnosService } from '../servicios/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit 
{
  curso:any;
  alumnos:Alumno[] = [];
  constructor(public router:Router, 
              private loadingController:LoadingController, 
              private alumnosService:AlumnosService) 
  { 
    if (router.getCurrentNavigation().extras.state) 
    {
      this.curso = this.router.getCurrentNavigation().extras.state;
      console.log(this.curso) 
    }
  }
  async getAlumnos()
  {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present(); 
    await this.alumnosService.getAlumnosByCurso(this.curso.id)
    .subscribe(res =>
      {
        this.alumnos = res;
        loading.dismiss();
      }, err =>
      {
        console.log(err); 
        loading.dismiss(); 
      });
  }
  ngOnInit() 
  {
    this.getAlumnos();
  }

}
