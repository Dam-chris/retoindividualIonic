import { NotasService } from './../servicios/notas.service';
import { LoadingController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Nota } from '../nota';
@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {

  userId:any;
  notas:Nota[] = [];

  constructor(private userData:Storage,
              private loadingController:LoadingController,
              private notasService:NotasService) 
  {}

  async getNotasHome()
  {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present(); 
    await this.notasService.getNotas(this.userId)
    .subscribe(res =>
      {
        this.notas = res;
        console.log(this.notas);
        if(res == null)
        {
          console.log("no tiene notas!!!!!!!!!!!!");
          
        }

        loading.dismiss();
      }, err =>
      {
        console.log(err);

        loading.dismiss(); 
      });
  }

  ngOnInit() 
  {
    this.userData.get("id").then((result) =>
    {
      this.userId = result;
    });
    this.getNotasHome();
  }

}
