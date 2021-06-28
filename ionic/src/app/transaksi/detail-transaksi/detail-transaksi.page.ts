import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Transaksi } from 'src/app/interfaces/transaksi';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-transaksi',
  templateUrl: './detail-transaksi.page.html',
  styleUrls: ['./detail-transaksi.page.scss'],
})
export class DetailTransaksiPage implements OnInit {

  private transaksi: Transaksi

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.apiService.getTransaksi(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(transaksi => { this.transaksi = transaksi })
    moment.locale('id')
  }

  private getDeskripsiTransaksi(antar: boolean, tanggalJadi: string, tanggalSelesai: string) {
    if (tanggalSelesai) {
      return `Pesanan kamu telah ${antar ? 'kami antar' : 'kamu ambil'} pada ${moment(tanggalSelesai).format('LLLL')}`
    } else if (tanggalJadi) {
      return `Pesanan kamu akan jadi pada ${moment(tanggalJadi).format('LLLL')}`
    } else {
      return 'Pesanan kamu belum kami terima. Silahkan tunggu sampai agen kami mengambilnya'
    }
  }

  private getStatusTransaksi(tanggalMasuk: string, tanggalSelesai: string) {
    if (tanggalSelesai) {
      return 'Pesanan telah selesai'
    } else if (tanggalMasuk) {
      return 'Pesanan dalam proses'
    } else {
      return 'Pesanan belum kami terima'
    }
  }

  private mataUang(nominal: number) {
    return Number(nominal).toLocaleString('id-ID')
  }

}
