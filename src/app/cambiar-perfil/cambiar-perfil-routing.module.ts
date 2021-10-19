import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarPerfilPage } from './cambiar-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarPerfilPageRoutingModule {}
