import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'masuk', loadChildren: './masuk/masuk.module#MasukPageModule', canActivate: [GuestGuard] },
  { path: 'buat-transaksi', loadChildren: './transaksi/buat-transaksi/buat-transaksi.module#BuatTransaksiPageModule', canActivate: [AuthGuard] },
  { path: 'pilih-paket', loadChildren: './transaksi/pilih-paket/pilih-paket.module#PilihPaketPageModule', canActivate: [AuthGuard] },
  { path: 'detail-transaksi', loadChildren: './transaksi/detail-transaksi/detail-transaksi.module#DetailTransaksiPageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
