import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesmatricularPageRoutingModule } from './desmatricular-routing.module';

import { DesmatricularPage } from './desmatricular.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesmatricularPageRoutingModule
  ],
  declarations: [DesmatricularPage]
})
export class DesmatricularPageModule {}
