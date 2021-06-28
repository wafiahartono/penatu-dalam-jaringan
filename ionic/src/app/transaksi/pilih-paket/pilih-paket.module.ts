import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PilihPaketPage } from './pilih-paket.page';

const routes: Routes = [
  {
    path: '',
    component: PilihPaketPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PilihPaketPage]
})
export class PilihPaketPageModule {}
