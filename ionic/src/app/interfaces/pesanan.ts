import { Paket } from './paket';

export interface Pesanan {
    antar: boolean,
    detail: {
        biaya?: number,
        jenis: number,
        jumlah: number,
        paket: string,
        paketObject?: Paket
    }[],
    ekspres: boolean,
    totalBiaya: number
}