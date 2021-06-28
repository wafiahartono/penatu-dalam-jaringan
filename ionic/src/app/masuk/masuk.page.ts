import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-masuk',
  templateUrl: './masuk.page.html',
  styleUrls: ['./masuk.page.scss'],
})
export class MasukPage {

  private credential: { username: string, password: string } = { username: '', password: '' }

  constructor(
    private alertController: AlertController,
    private apiService: ApiService,
    private router: Router,
    private toastService: ToastService
  ) { }

  private async daftar() {
    const alert = await this.alertController.create({
      header: 'Daftar sebagai pelanggan',
      message: 'Silahkan mengunjungi Laundry Oasis untuk mendapatkan username dan password'
    })
    alert.present()
  }

  private masuk() {
    this.apiService.masuk(this.credential.username, this.credential.password).then(result => {
      if (result) this.router.navigateByUrl('/home')
      else this.toastService.tampilkanPesan('Username atau password salah')
    }).catch(e => {
      console.error(e)
      this.toastService.tampilkanPesan('Terjadi kesalahan saat mencoba masuk', undefined, 'danger')
    })
  }

}