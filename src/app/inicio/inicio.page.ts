import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Curso } from '../curso';
import { CursosService } from '../servicios/cursos.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit 
{
  cursos:Curso[] = [];
  public usuariodata:any [] = [];

  constructor(private cursosService:CursosService,
              private loadingController: LoadingController,
              public navCtrl: NavController,
              private userData:Storage) { }

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
//pasar todos los datos a un arrary
public getUserData() {
    var promise = new Promise((resolve, reject) => 
    {
      this.userData.
      forEach((value, key, index) => 
      {
        this.usuariodata.push(value);
      }).then((d) => 
      {
        resolve(this.usuariodata);
      });
    });
    return promise;
}
//get todos los alumnos
getAlumnos(curso)
{
  console.log(curso);
  this.userData.get("rol").then((result) =>
  {
    if(result == "ROLE_ADMIN")
    {
      this.navCtrl.navigateForward('alumnos', {state: curso});
    }
   
  });
}

  ngOnInit() 
  {
    
    this.getCursosHome();
    
    this.getUserData();
  }

}
