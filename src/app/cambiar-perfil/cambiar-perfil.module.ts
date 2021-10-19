import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarPerfilPageRoutingModule } from './cambiar-perfil-routing.module';

import { CambiarPerfilPage } from './cambiar-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarPerfilPageRoutingModule
  ],
  declarations: [CambiarPerfilPage]
})
export class CambiarPerfilPageModule {}
