import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuatTransaksiPage } from './buat-transaksi.page';

const routes: Routes = [
  {
    path: '',
    component: BuatTransaksiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BuatTransaksiPage]
})
export class BuatTransaksiPageModule {}
