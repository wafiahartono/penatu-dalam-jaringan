export interface Transaksi {
    id: number,
    created_at: string,
    tanggal_masuk: string,
    tanggal_jadi: string,
    antar: boolean,
    ekspres: boolean,
    total_biaya: number,
    tanggal_selesai: string,
    detail_transaksi?: {
        id_paket: string,
        jumlah: number,
        jenis: number,
        biaya: number,
        paket: {
            nama: string,
            keterangan: string
        }
    }[]
}