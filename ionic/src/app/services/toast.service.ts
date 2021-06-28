import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async tampilkanPesan(pesan: string, durasi: number = 3000, warna: string = 'dark') {
    const toast = await this.toastController.create({
      color: warna,
      duration: durasi,
      keyboardClose: true,
      message: pesan
    })
    toast.present()
  }
}
