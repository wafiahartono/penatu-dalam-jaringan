import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Observable, of } from 'rxjs';
import { Transaksi } from '../interfaces/transaksi';
import { tap, map, catchError, finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private daftarTransaksi: Observable<Transaksi[]>
  private loading: boolean
  private namaPelanggan: Observable<string>
  private pesan: string

  constructor(
    private alertController: AlertController,
    private apiService: ApiService,
    private router: Router,
    private toastService: ToastService
  ) { console.log('HomePage constructor()') }

  ionViewWillEnter() {
    console.log('HomePage ionViewWillEnter()')
    this.getData()
  }

  ngOnInit() {
    console.log('HomePage ngOnInit()')
    moment.locale('id')
  }

  private async keluar() {
    const alert = await this.alertController.create({
      subHeader: 'Apakah kamu yakin untuk keluar?',
      buttons: [
        {
          role: 'cancel',
          text: 'Batalkan'
        },
        {
          text: 'Ya',
          handler: () => {
            this.apiService.keluar()
            this.router.navigateByUrl('/masuk')
          }
        }
      ]
    })
    alert.present()
  }

  private getData(refresher?: any) {
    if (!refresher) this.loading = true
    this.daftarTransaksi = this.apiService.getDaftarTransaksi().pipe(
      tap(daftarTransaksi => { this.pesan = daftarTransaksi.length === 0 ? 'Kamu tidak memiliki pesanan apa-apa' : undefined }),
      catchError(e => {
        console.error(e)
        this.pesan = 'Terjadi kesalahan saat mendapatkan data transaksi'
        this.toastService.tampilkanPesan('Terjadi kesalahan saat mendapatkan data transaksi', undefined, 'danger')
        return of([])
      }),
      finalize(() => {
        if (refresher) refresher.target.complete()
        else this.loading = false
      })
    )
    this.namaPelanggan = this.apiService.getNamaPelanggan().pipe(
      map(nama => nama.substring(nama, nama.indexOf(' '))),
      catchError(e => {
        console.error(e)
        return of('pelanggan')
      })
    )
  }

  private getDeskripsi(antar: boolean, tanggalJadi: string, tanggalSelesai: string) {
    if (tanggalSelesai) {
      return `Pesanan kamu telah ${antar ? 'kami antar' : 'kamu ambil'} pada ${moment(tanggalSelesai).format('LLLL')}`
    } else if (tanggalJadi) {
      return `Pesanan kamu akan jadi pada ${moment(tanggalJadi).format('LLLL')}`
    } else {
      return 'Pesanan kamu belum kami terima. Silahkan tunggu sampai agen kami mengambilnya'
    }
  }

  private getJudul(tanggalMasuk: string, tanggalSelesai: string) {
    if (tanggalSelesai) {
      return 'Pesanan telah selesai'
    } else if (tanggalMasuk) {
      return 'Pesanan dalam proses'
    } else {
      return 'Pesanan belum kami terima'
    }
  }

  private getSapaan() {
    const hour = moment().hour()
    if (hour > 17) return 'malam'
    else if (hour > 14) return 'sore'
    else if (hour > 10) return 'siang'
    else return 'pagi'
  }

  private mataUang(nominal: number) {
    return Number(nominal).toLocaleString('id-ID')
  }

}
