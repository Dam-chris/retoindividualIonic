import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Curso } from '../curso';
import { CursosService } from '../servicios/cursos.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit 
{
  cursos:Curso[] = [];

  constructor(private cursosService:CursosService,
              private loadingController: LoadingController,
              public navCtrl: NavController) { }

  async getCursosHome()
  {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present(); 
    await this.cursosService.getCursos()
    .subscribe(res =>
      {
        this.cursos = res;
        loading.dismiss();
      }, err =>
      {
        console.log(err); 
        loading.dismiss(); 
      });
  }

getAlumnos(curso)
{
  console.log(curso);
  this.navCtrl.navigateForward('alumnos', {state: curso});
}

  ngOnInit() 
  {
    this.getCursosHome();
  }

}
