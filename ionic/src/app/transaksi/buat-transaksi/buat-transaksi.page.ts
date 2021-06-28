import { Component } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Pesanan } from 'src/app/interfaces/pesanan';
import { PilihPaketPage } from '../pilih-paket/pilih-paket.page';
import { Paket } from 'src/app/interfaces/paket';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buat-transaksi',
  templateUrl: './buat-transaksi.page.html',
  styleUrls: ['./buat-transaksi.page.scss'],
})
export class BuatTransaksiPage {

  private loading: boolean

  private pesanan: Pesanan = {
    antar: false,
    detail: [],
    ekspres: false,
    totalBiaya: 0
  }

  constructor(
    private actionSheetController: ActionSheetController,
    private apiService: ApiService,
    private modalController: ModalController,
    private router: Router,
    private toastService: ToastService
  ) { }

  private mataUang(nominal: number) {
    return Number(nominal).toLocaleString('id-ID')
  }

  private pesanPesanan() {
    console.log(this.pesanan)
    this.loading = true
    this.apiService.postTransaksi(this.pesanan).subscribe(
      (result: any) => this.toastService.tampilkanPesan(result.result ? 'Berhasil mengirimkan pesanan' : 'Terjadi kesalahan saat mengirimkan pesanan', undefined, result.result ? undefined : 'danger')
      ,
      error => {
        console.error(error)
        this.loading = false
        this.toastService.tampilkanPesan('Terjadi kesalahan saat mengirimkan pesanan', undefined, 'danger')
      },
      () => { this.loading = false }
    )
  }

  private tambahPaket(data: { jenis: number, paket: Paket }) {
    this.pesanan.detail.push({
      biaya: data.paket[data.jenis ? 'dry_clean' : 'press'],
      jenis: data.jenis,
      jumlah: 1,
      paket: data.paket.id,
      paketObject: data.paket
    })
    this.updateTotalBiaya()
  }

  private toggleAntar() {
    this.pesanan.antar = !this.pesanan.antar
  }

  private toggleEkspres() {
    this.pesanan.ekspres = !this.pesanan.ekspres
    this.updateTotalBiaya()
  }

  private ubahJumlah(i: number, tambah: boolean) {
    if (tambah) this.pesanan.detail[i].jumlah++
    else this.pesanan.detail[i].jumlah--
    if (this.pesanan.detail[i].jumlah === 0) this.pesanan.detail.splice(i, 1)
    else this.updateBiaya(i)
    this.updateTotalBiaya()
  }

  private updateBiaya(i: number) {
    this.pesanan.detail[i].biaya = this.pesanan.detail[i].paketObject[this.pesanan.detail[i].jenis ? 'dry_clean' : 'press'] * this.pesanan.detail[i].jumlah
  }

  private updateTotalBiaya() {
    let totalBiaya = 0
    for (let i = 0; i < this.pesanan.detail.length; i++) {
      totalBiaya += this.pesanan.detail[i].biaya
    }
    this.pesanan.totalBiaya = totalBiaya * (this.pesanan.ekspres ? 2 : 1)
  }

  private async pilihJenisPaket(i: number) {
    const actionSheet = await this.actionSheetController.create({
      buttons:
        this.pesanan.detail[i].paketObject.press ?
          [
            {
              text: 'Dry Clean',
              handler: () => {
                this.pesanan.detail[i].jenis = 1
                this.updateBiaya(i)
                this.updateTotalBiaya()
              }
            },
            {
              text: 'Press',
              handler: () => {
                this.pesanan.detail[i].jenis = 0
                this.updateBiaya(i)
                this.updateTotalBiaya()
              }
            }
          ] :
          [
            {
              text: 'Dry Clean',
              handler: () => {
                this.pesanan.detail[i].jenis = 1
                this.updateBiaya(i)
                this.updateTotalBiaya()
              }
            }
          ]
    })
    await actionSheet.present()
  }

  private async pilihPaket() {
    const modal = await this.modalController.create({
      component: PilihPaketPage
    })
    modal.onDidDismiss().then((data: any) => { if (data.data) this.tambahPaket(data.data) })
    return await modal.present()
  }
}