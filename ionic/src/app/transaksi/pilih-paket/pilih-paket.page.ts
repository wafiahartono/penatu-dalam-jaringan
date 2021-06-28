import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Paket } from 'src/app/interfaces/paket';
import { Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-pilih-paket',
  templateUrl: './pilih-paket.page.html',
  styleUrls: ['./pilih-paket.page.scss'],
})
export class PilihPaketPage implements OnInit {

  private daftarPaket: Observable<Paket[]>
  private loading: boolean
  private pesan: string

  constructor(
    private apiService: ApiService,
    private modalController: ModalController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    console.log('PilihPaketPage ngOnInit called')
    this.updateDaftarPaket('')
  }

  private updateDaftarPaket(kataKunci: string) {
    this.loading = true
    this.daftarPaket = this.apiService.getDaftarPaket(kataKunci).pipe(
      tap(daftarPaket => { this.pesan = daftarPaket.length === 0 ? 'Paket tidak ditemukan' : undefined }),
      catchError(e => {
        console.error(e)
        this.pesan = 'Terjadi kesalahan saat medapatkan data paket'
        this.toastService.tampilkanPesan('Terjadi kesalahan saat medapatkan data paket', undefined, 'danger')
        return of([])
      }),
      finalize(() => {
        this.loading = false
      })
    )
  }

  private mataUang(nominal: number) {
    return Number(nominal).toLocaleString('id-ID')
  }

  private pilih(paket: Paket, jenis: number) {
    this.modalController.dismiss({ paket: paket, jenis: jenis })
  }

}
