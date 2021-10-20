import { MatriculaService } from './../servicios/matricula.service';
import { Curso } from './../curso';
import { LoadingController } from '@ionic/angular';
import { CursosService } from './../servicios/cursos.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-desmatricular',
  templateUrl: './desmatricular.page.html',
  styleUrls: ['./desmatricular.page.scss'],
})
export class DesmatricularPage implements OnInit {

  cursos:Curso[] = [];
  alumnoId:any;
  cursoNom:any;
  constructor(private cursosService: CursosService, 
              private loadingController: LoadingController,
              private userData:Storage,
              private matriculaServie:MatriculaService) { }


async getCursos()
  {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present(); 
    await this.cursosService.getCursosByAlumno(this.alumnoId)
    .subscribe(res =>
      {
        this.cursos = res;
        console.log(res);
        loading.dismiss();
      }, err =>
      {
        console.log(err); 
        loading.dismiss(); 
      });
  }


  async borrarMatricula()
  {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present(); 
    await this.matriculaServie.deleteMatricula(this.alumnoId)
    .subscribe(res =>
      {
        console.log(res);
        loading.dismiss();
      }, err =>
      {
        console.log(err); 
        loading.dismiss(); 
      });
  }

cursoId()
{
  console.log(this.cursoNom);
}
  

  
  
ngOnInit() 
{
  this.userData.get("data").then((result) =>
  {
    this.alumnoId = result.id;
  });
  this.getCursos();
}

}
