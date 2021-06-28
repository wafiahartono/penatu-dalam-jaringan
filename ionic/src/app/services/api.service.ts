import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Paket } from '../interfaces/paket';
import { Transaksi } from '../interfaces/transaksi';
import { map } from 'rxjs/operators';
import { Pesanan } from '../interfaces/pesanan';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  authorized = false
  initialized = false

  private static readonly STORAGE_KEY_TOKEN = 'auth_token'

  private token: string
  private url = 'http://192.168.43.37:80/alpha-laravel/public/api'

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
  ) {
    console.log('ApiService constructor')
  }

  async masuk(username: string, password: string) {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    return await this.httpClient.post(`${this.url}/otentikasi/pelanggan/masuk`, formData).toPromise()
      .then((response: any) => {
        return response.token
      })
      .then(async (token: string) => {
        if (token) {
          await this.storage.set(ApiService.STORAGE_KEY_TOKEN, token)
          await this.setAuthorized(token)
        }
        return token ? true : false
      })
  }

  getDaftarPaket(cari: string) {
    return this.httpClient.get<Paket[]>(`${this.url}/paket`, {
      headers: { 'Authorization': `Bearer ${this.token}` },
      params: { 'cari': cari }
    })
  }

  getDaftarTransaksi() {
    return this.httpClient.get<Transaksi[]>(`${this.url}/transaksi`, { headers: { 'Authorization': `Bearer ${this.token}` } })
  }

  getNamaPelanggan() {
    return this.httpClient.get<string>(`${this.url}/pelanggan/nama`, { headers: { 'Authorization': `Bearer ${this.token}` } })
      .pipe(map((response: any) => response.nama))
  }

  getTransaksi(id: number) {
    return this.httpClient.get<Transaksi>(`${this.url}/transaksi/${id}`, { headers: { 'Authorization': `Bearer ${this.token}` } })
  }

  keluar() {
    this.httpClient.get(`${this.url}/otentikasi/pelanggan/keluar`, { headers: { 'Authorization': `Bearer ${this.token}` } })
    this.storage.remove(ApiService.STORAGE_KEY_TOKEN)
    this.setAuthorized()
  }

  postTransaksi(pesanan: Pesanan) {
    return this.httpClient.post<Pesanan>(
      `${this.url}/transaksi`,
      (() => {
        const pesananUntukDikirim: Pesanan = {
          antar: pesanan.antar,
          detail: [],
          ekspres: pesanan.ekspres,
          totalBiaya: pesanan.totalBiaya
        }
        for (let i = 0; i < pesanan.detail.length; i++) {
          pesananUntukDikirim.detail.push({
            jenis: pesanan.detail[i].jenis,
            jumlah: pesanan.detail[i].jumlah,
            paket: pesanan.detail[i].paket,
          })
        }
        return pesananUntukDikirim
      })(),
      { headers: { 'Authorization': `Bearer ${this.token}`, } })
  }

  async initialize() {
    console.log('ApiService initialize()')
    this.setAuthorized(await this.storage.get(ApiService.STORAGE_KEY_TOKEN))
    this.initialized = true
    console.log('ApiService initialize() finish')
    return true
  }

  private setAuthorized(token?: string) {
    console.log(`ApiService setAuthorized(${token})`)
    console.log(`ApiService setAuthorized(). token ? (${token ? 'true' : 'false'})`)
    this.authorized = token ? true : false
    this.token = token ? token : undefined
  }
}