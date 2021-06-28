<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Laundry Oasis Console</title>
        <link href="css/app.css" rel="stylesheet">
    </head>
    <body>
        <h1>Laundry Oasis Console 🚧</h1>
        <h3>Masuk sebagai {{ auth()->user()->username }}. <a href="{{ route('admin/keluar') }}">Keluar</a></h3>

        {{-- Notifikasi --}}
        <div style="margin-bottom: 1rem">
            <h3 id="h3-notifikasi-pesanan" style="margin: 0 0 1rem"></h3>
            <button id="button-refresh-notifikasi-pesanan">Refresh</button>
        </div>

        <h2>Menu</h2>
        <div id="menu-container"></div>

        <div id="menu-content">
            <!-- Daftar transaksi -->
            <div id="table-daftar-transaksi" class="dt__table">
                <h4 class="dt__title">Daftar Transaksi</h4>
                <button class="dt__button-refresh">Refresh</button>
                <input class="dt__input-search" placeholder="Pencarian berdasarkan id atau username pelanggan">
                <div class="dt__actions">
                    <p>Urutan berdasarkan</p>
                    <select class="dt__select-order-by"></select>
                    <select class="dt__select-order"></select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username Pelanggan</th>
                            <th>Tanggal Pesan</th>
                            <th>Tanggal Masuk</th>
                            <th>Tanggal Jadi</th>
                            <th>Antar</th>
                            <th>Ekspres</th>
                            <th>Total Biaya</th>
                            <th>Tanggal Selesai</th>
                        </tr>
                    </thead>
                    <tbody class="dt__row">
                        <tr class="tac">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="nullable"></td>
                            <td class="nullable"></td>
                            <td class="boolean"></td>
                            <td class="boolean"></td>
                            <td class="mata-uang"></td>
                            <td class="nullable"></td>
                        </tr>
                    </tbody>
                </table>
                <div class="dt__actions">
                    <p>Menampilkan <span class="dt__text-item-from">0</span> - <span class="dt__text-item-to">0</span> dari <span class="dt__text-item-total">0</span> item. Item per halaman</p>
                    <select class="dt__select-item"></select>
                </div>
                <div class="dt__actions">
                    <p>Halaman</p>
                    <input class="dt__input-page">
                    <p>dari <span class="dt__text-page-total">1</span> halaman.</p>
                    <button class="dt__button-previous">Sebelumnya</button>
                    <button class="dt__button-next">Selanjutnya</button>
                </div>
            </div>

            <!-- Detail transaksi -->
            <form id="form-detail-transaksi" class="form detail-transaksi" style="display: none">
                <h4>Detail Transaksi</h4>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th class="detail-transaksi__id-transaksi" colspan="5"></th>
                                <th class="detail-transaksi__tanggal-pesan"></th>
                            </tr>
                        </thead>
                        <tbody style="display: none">
                            <tr>
                                <td colspan="5">
                                    <b>Pelanggan:</b>
                                    <p class="detail-transaksi__nama-pelanggan"></p>
                                    <p class="detail-transaksi__alamat-pelanggan"></p>
                                    <p class="detail-transaksi__telepon-pelanggan"></p>
                                </td>
                                <td>
                                    <b>Tanggal Masuk</b>
                                    <p class="detail-transaksi__tanggal-masuk"></p>
                                    <br>
                                    <b>Tanggal Jadi</b>
                                    <p class="detail-transaksi__tanggal-jadi"></p>
                                </td>
                            </tr>
                            <tr>
                                <th>ID Paket</th>
                                <th>Deskripsi Paket</th>
                                <th>Jenis</th>
                                <th>Jumlah</th>
                                <th>Harga @</th>
                                <th>Biaya</th>
                            </tr>
                            <tr class="detail-transaksi__row" style="display: none">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td class="mata-uang"></td>
                                <td class="mata-uang"></td>
                            </tr>
                        </tbody>
                        <tfoot style="display: none">
                            <tr class="detail-transaksi__sub-total-biaya">
                                <th class="tal" colspan="5">Sub Total</th>
                                <th class="mata-uang"></th>
                            </tr>
                            <tr class="detail-transaksi__antar">
                                <th class="tal" colspan="5">Antar</th>
                                <th class="mata-uang">-</th>
                            </tr>
                            <tr class="detail-transaksi__ekspres">
                                <th class="tal" colspan="4">Ekspres</th>
                                <th class="tal">x 1 sub total</th>
                                <th class="mata-uang"></th>
                            </tr>
                            <tr class="detail-transaksi__total-biaya">
                                <th class="tal" colspan="5">Total Biaya</th>
                                <th class="mata-uang"></th>
                            </tr>
                            <tr>
                                <th class="detail-transaksi__selesai" colspan="6"></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <label>ID Transaksi<input name="id_transaksi" min="1" type="number"></label>
                <button name="cek" type="button">Cek ID</button>
                <p class="pesan"></p>
                <label>Tanggal Masuk<input name="tanggal_masuk" type="datetime-local" required disabled></label>
                <label>Tanggal Jadi<input name="tanggal_jadi" type="datetime-local" required disabled></label>
                <label>Tanggal Selesai<input name="tanggal_selesai" type="datetime-local" required disabled></label>
                <input name="submit" type="submit" value="Simpan" disabled>
            </form>

            <!-- Daftarkan Pelanggan -->
            <form id="form-daftarkan-pelanggan" class="form" style="display: none">
                <h4>Daftarkan Pelanggan</h4>
                <p class="pesan"></p>
                <label>Username<input autocomplete="username" name="username" type="text" required></label>
                <label>Password<input autocomplete="new-password" name="password" type="password" required></label>
                <label>Nama<input name="nama" type="text" required></label>
                <label>Alamat<input name="alamat" type="text" required></label>
                <label>Telepon<input name="telepon" type="tel" required></label>
                <input type="submit" value="Simpan">
            </form>

            <!-- Daftar pelanggan -->
            <div id="table-daftar-pelanggan" class="dt__table" style="display: none">
                <h4 class="dt__title">Daftar Pelanggan</h4>
                <button class="dt__button-refresh">Refresh</button>
                <input class="dt__input-search" placeholder="Pencarian berdasarkan username, nama, atau telepon">
                <div class="dt__actions">
                    <p>Urutan berdasarkan</p>
                    <select class="dt__select-order-by"></select>
                    <select class="dt__select-order"></select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Telepon</th>
                        </tr>
                    </thead>
                    <tbody class="dt__row">
                        <tr>
                            <td class="tac"></td>
                            <td></td>
                            <td></td>
                            <td class="tac"></td>
                        </tr>
                    </tbody>
                </table>
                <div class="dt__actions">
                    <p>Menampilkan <span class="dt__text-item-from">0</span> - <span class="dt__text-item-to">0</span> dari <span class="dt__text-item-total">0</span> item. Item per halaman</p>
                    <select class="dt__select-item"></select>
                </div>
                <div class="dt__actions">
                    <p>Halaman</p>
                    <input class="dt__input-page">
                    <p>dari <span class="dt__text-page-total">1</span> halaman.</p>
                    <button class="dt__button-previous">Sebelumnya</button>
                    <button class="dt__button-next">Selanjutnya</button>
                </div>
            </div>

            <!-- API otentikasi -->
            <div id="container-api-otentikasi" style="display: none">
                <h3 id="h3-api-otentikasi-status-username" style="margin-bottom: 0">Belum masuk sebagai pelanggan</h3>
                <h3 id="h3-api-otentikasi-status-token" style="margin: 0"></h3>
                <h3 id="h3-api-otentikasi-status-pesan" class="pesan" style="margin-top: 0"></h3>
                <form id="form-api-otentikasi" class="form">
                    <h4>API Otentikasi</h4>
                    <label>Username<input autocomplete="username" name="username" type="text" required></label>
                    <label>Password<input autocomplete="current-password" name="password" type="password" required></label>
                    <input name="submit" type="submit" value="Masuk">
                    <button name="cek-token" type="button" disabled>Cek Token</button>
                    <button name="cabut-token" type="button" disabled>Cabut Token</button>
                </form>
            </div>

            <!-- Daftar paket -->
            <div id="table-daftar-paket" class="dt__table" style="display: none">
                <h4 class="dt__title">Daftar paket</h4>
                <button class="dt__button-refresh">Refresh</button>
                <input class="dt__input-search" placeholder="Pencarian berdasarkan id, nama, atau keterangan">
                <div class="dt__actions">
                    <p>Urutan berdasarkan</p>
                    <select class="dt__select-order-by"></select>
                    <select class="dt__select-order"></select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Keterangan</th>
                            <th>Dry Clean</th>
                            <th>Press</th>
                        </tr>
                    </thead>
                    <tbody class="dt__row">
                        <tr>
                            <td class="tac"></td>
                            <td></td>
                            <td></td>
                            <td class="nullable mata-uang"></td>
                            <td class="nullable mata-uang"></td>
                        </tr>
                    </tbody>
                </table>
                <div class="dt__actions">
                    <p>Menampilkan <span class="dt__text-item-from">0</span> - <span class="dt__text-item-to">0</span> dari <span class="dt__text-item-total">0</span> item. Item per halaman</p>
                    <select class="dt__select-item"></select>
                </div>
                <div class="dt__actions">
                    <p>Halaman</p>
                    <input class="dt__input-page">
                    <p>dari <span class="dt__text-page-total">1</span> halaman.</p>
                    <button class="dt__button-previous">Sebelumnya</button>
                    <button class="dt__button-next">Selanjutnya</button>
                </div>
            </div>

            <!-- Buat transaksi -->
            <form id="form-buat-transaksi" class="form buat-transaksi" style="display: none;">
                <h4>Buat Transaksi</h4>
                <div>
                    <p>Daftar pesanan:</p>
                    <ol class="buat-transaksi__daftar-pesanan"></ol>
                    <b class="buat-transaksi__total-biaya-container">
                        <p class="buat-transaksi__total-biaya">Total biaya pesanan:</p>
                        <p class="buat-transaksi__ekspres"></p>
                        <p class="buat-transaksi__antar" style="display: none">(antar)</p>
                    </b>
                    <p class="buat-transaksi__paket"></p>
                    <p class="buat-transaksi__pesan"></p>
                </div>
                <label>Paket<input name="paket" type="text"></label>
                <label>Jumlah<input min="1" max="50" name="jumlah" type="number" value="1"></label>
                <label>
                    Jenis
                    <select name="jenis">
                        <option value="dry_clean" selected>Dry clean</option>
                        <option value="press">Press</option>
                    </select>
                </label>
                <button name="tambah" type="button" disabled>Tambah</button>
                <div class="checkbox"><label><input name="antar" type="checkbox">Antar</label></div>
                <div class="checkbox"><label><input name="ekspres" type="checkbox">Ekspres</label></div>
                <input name="submit" type="submit" value="Pesan" disabled>
            </form>
        </div>

        <!-- Footer -->
        <div class="tac" style="width: 100%">
            <p>Made with ❤ by <a href="https://github.com/wafiazmihartono/">wafiazmihartono</a></p>
        </div>

        {{-- <form id="form-seed" class="form">
            <label>Pelanggan<input name="pelanggan" type="number" required></label>
            <div class="checkbox"><label><input name="paket" type="checkbox" required>Paket</label></div>
            <label>Transaksi<input name="transaksi" type="number" required></label>
            <input name="submit" type="submit" value="Seed">
        </form> --}}
        <script src="js/app.js" type="application/javascript"></script>
    </body>
</html>
