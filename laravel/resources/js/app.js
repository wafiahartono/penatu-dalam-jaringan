import DataTable from './simple-data-table'

const csrfToken = document.querySelector('meta[name=csrf-token]').content
const pelanggan = {}
const url = 'https://wafihartono.projects/alpha-laravel/public'

const getPesanKesalahan = aktivitas => `Terjadi kesalahan saat ${aktivitas}. Cek log pada console.`
const getUrlPagination = (path, pagination) => `${url}${path}?item=${pagination.item}&halaman=${pagination.page}&urutkan=${pagination.orderBy}&urutan=${pagination.order}&cari=${pagination.search}`;

// Notifikasi
(() => {
    const updateNotifikasi = () => {
        fetch(`${url}/notifikasi/transaksi`).then(response => response.json()).then(json => {
            document.querySelector('#h3-notifikasi-pesanan').innerText = json.result ? `Ada ${json.result} pesanan masuk` : 'Belum ada pesanan yang masuk'
        })
    }

    document.querySelector('#button-refresh-notifikasi-pesanan').addEventListener('click', () => {
        updateNotifikasi()
    })

    updateNotifikasi()
})();

// Menu
(() => {
    const menu = [
        {
            nama: 'Daftar Transaksi',
            id: 'table-daftar-transaksi'
        },
        {
            nama: 'Detail Transaksi',
            id: 'form-detail-transaksi'
        },
        {
            nama: 'Daftarkan Pelanggan',
            id: 'form-daftarkan-pelanggan'
        },
        {
            nama: 'Daftar Pelanggan',
            id: 'table-daftar-pelanggan'
        },
        {
            nama: 'API Console',
            id: 'container-api-otentikasi'
        },
        {
            nama: 'Daftar Paket',
            id: 'table-daftar-paket'
        },
        {
            nama: 'Buat Transaksi',
            id: 'form-buat-transaksi'
        },
    ]

    menu.forEach((item, i) => {
        const button = document.querySelector('#menu-container').appendChild(document.createElement('button'))
        button.innerText = item.nama
        if (i === 0 || i === menu.length - 1 || i === menu.length - 2) button.disabled = true
    })

    let lastMenuIndex = 0
    let lastButtonElement = document.querySelector('#menu-container > button')
    document.querySelectorAll('#menu-container > *').forEach((element, i) => {
        element.addEventListener('click', () => {
            document.querySelector(`#menu-content > #${menu[lastMenuIndex].id}`).style.display = 'none'
            document.querySelector(`#menu-content > #${menu[i].id}`).style.display = ''
            element.disabled = true
            lastButtonElement.disabled = false
            lastMenuIndex = i
            lastButtonElement = element
        })
    })
})();

// Data tables
(() => {
    const opsiDefault = {
        item: [10, 25, 50, 100],
        message: {
            empty: 'Tidak ada data',
            error: 'Terjadi kesalahan saat mendapatkan data',
            initial: 'Tekan tombol refresh untuk mulai mendapatkan data',
            retrieve: 'Sedang mendapatkan data...'
        },
        order: {
            asc: 'Ascending',
            desc: 'Descending'
        }
    }

    // Daftar transaksi
    new DataTable(
        document.querySelector('#table-daftar-transaksi'), {
            immediate: false,
            message: opsiDefault.message,
            orderByOption: {
                id: 'ID Transaksi',
                created_at: 'Tanggal Pesan',
                tanggal_masuk: 'Tanggal Masuk',
                tanggal_jadi: 'Tanggal Jadi',
                tanggal_selesai: 'Tanggal Selesai'
            },
            orderOption: opsiDefault.order,
            selectItemOption: opsiDefault.item
        },
        (pagination) => fetch(getUrlPagination('/transaksi', pagination)).then(response => response.json()).then(json => json),
        () => {
            document.querySelectorAll('#table-daftar-transaksi .nullable').forEach(item => {
                if (!item.innerText) item.innerText = '-'
            })

            document.querySelectorAll('#table-daftar-transaksi .boolean').forEach(item => {
                if (item.innerText !== '-') item.innerText = item.innerText === '1' ? 'Ya' : 'Tidak'
            })

            document.querySelectorAll('#table-daftar-transaksi .mata-uang').forEach(item => {
                if (item.innerText !== '-') item.innerText = Number(item.innerText).toLocaleString('id-ID')
            })
        }
    );

    // Daftar pelanggan
    new DataTable(
        document.querySelector('#table-daftar-pelanggan'), {
            immediate: false,
            orderOption: opsiDefault.order,
            orderByOption: {
                nama: 'Nama',
                username: 'Username',
                telepon: 'Telepon'
            },
            selectItemOption: opsiDefault.item,
            message: opsiDefault.message
        },
        (pagination) => fetch(getUrlPagination('/pelanggan', pagination)).then(response => response.json()).then(json => json)
    );

    // Daftar paket
    new DataTable(
        document.querySelector('#table-daftar-paket'), {
            immediate: false,
            orderOption: opsiDefault.order,
            orderByOption: {
                id: 'ID Paket',
                nama: 'Nama',
                keterangan: 'Keterangan',
            },
            selectItemOption: opsiDefault.item,
            message: opsiDefault.message
        },
        (pagination) => {
            return fetch(getUrlPagination('/api/paket', pagination), {
                headers: {
                    'Authorization': `Bearer ${pelanggan.token}`
                }
            }).then(response => response.json()).then(json => json)
        },
        () => {
            document.querySelectorAll('#table-daftar-paket .nullable').forEach(item => {
                if (item.innerText === '0') item.innerText = '-'
            })

            document.querySelectorAll('#table-daftar-paket .mata-uang').forEach(item => {
                if (item.innerText !== '-') item.innerText = Number(item.innerText).toLocaleString('id-ID')
            })
        }
    );
})();

// Detail transaksi
(form => {
    let transaksi

    const updateLayout = (ditemukan, masuk, selesai, pesan) => {
        form.elements.tanggal_selesai.disabled = !(ditemukan && masuk && !selesai)
        form.elements.tanggal_jadi.disabled = !(ditemukan && !masuk)
        form.elements.tanggal_masuk.disabled = !(ditemukan && !masuk)
        form.elements.submit.disabled = !(ditemukan && !selesai)

        form.querySelector('.detail-transaksi__id-transaksi').innerText = ditemukan ? transaksi.id : ` ${pesan}`
        form.querySelector('tbody').style.display = ditemukan ? '' : 'none'
        form.querySelector('tfoot').style.display = ditemukan ? '' : 'none'
        if (ditemukan) {
            form.querySelector('.detail-transaksi__tanggal-pesan').innerText = transaksi.created_at
            form.querySelector('.detail-transaksi__nama-pelanggan').innerText = transaksi.pelanggan.nama
            form.querySelector('.detail-transaksi__alamat-pelanggan').innerText = transaksi.pelanggan.alamat
            form.querySelector('.detail-transaksi__telepon-pelanggan').innerText = transaksi.pelanggan.telepon
            form.querySelector('.detail-transaksi__tanggal-masuk').innerText = transaksi.tanggal_masuk ? transaksi.tanggal_masuk : '-'
            form.querySelector('.detail-transaksi__tanggal-jadi').innerText = transaksi.tanggal_jadi ? transaksi.tanggal_jadi : '-'
            form.querySelector('.detail-transaksi__sub-total-biaya').children[1].innerText = Number(transaksi.ekspres ? transaksi.total_biaya / 2 : transaksi.total_biaya).toLocaleString('id-ID')
            form.querySelector('.detail-transaksi__antar').style.display = transaksi.antar ? '' : 'none'
            form.querySelector('.detail-transaksi__ekspres').style.display = transaksi.ekspres ? '' : 'none'
            form.querySelector('.detail-transaksi__ekspres').children[2].innerText = transaksi.ekspres ? Number(transaksi.total_biaya / 2).toLocaleString('id-ID') : ''
            form.querySelector('.detail-transaksi__total-biaya').children[1].innerText = Number(transaksi.total_biaya).toLocaleString('id-ID')
            form.querySelector('.detail-transaksi__selesai').innerText = transaksi.tanggal_selesai ? transaksi.tanggal_selesai : ''
            form.querySelector('.detail-transaksi__selesai').style.display = transaksi.tanggal_selesai ? '' : 'none'

            while (form.querySelector('tbody').childElementCount > 3) form.querySelector('tbody').lastElementChild.remove()
            for (let i = 0; i < transaksi.detail_transaksi.length; i++) {
                const tr = form.querySelector('tbody').appendChild(form.querySelector('.detail-transaksi__row').cloneNode(true))
                tr.style.display = ''
                tr.children[0].innerText = transaksi.detail_transaksi[i].id_paket
                tr.children[1].innerText = `${transaksi.detail_transaksi[i].paket.nama} - ${transaksi.detail_transaksi[i].paket.keterangan}`
                tr.children[2].innerText = transaksi.detail_transaksi[i].jenis ? 'Dry Clean' : 'Press'
                tr.children[3].innerText = transaksi.detail_transaksi[i].jumlah
                tr.children[4].innerText = Number(transaksi.detail_transaksi[i].biaya / transaksi.detail_transaksi[i].jumlah).toLocaleString('id-ID')
                tr.children[5].innerText = Number(transaksi.detail_transaksi[i].biaya).toLocaleString('id-ID')
            }
        }
    }

    const updateTable = () => {
        form.querySelector('.detail-transaksi__id-transaksi').innerText = 'Sedang mendapatkan data transaksi'
        fetch(`${url}/transaksi/${form.elements.id_transaksi.value}`).then(response => response.json()).then(json => {
            if (json.result) {
                transaksi = json.transaksi
                updateLayout(true, json.transaksi.tanggal_masuk ? true : false, json.transaksi.tanggal_selesai ? true : false)
            } else updateLayout(false, false, false, 'Transaksi tidak ditemukan')
        }).catch(e => {
            console.error(e)
            updateLayout(false, false, false, getPesanKesalahan('mendapatkan data transaksi'))
        })
    }

    form.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData()
        if (!form.elements.tanggal_selesai.disabled) formData.append('tanggal_selesai', form.elements.tanggal_selesai.value)
        if (!form.elements.tanggal_jadi.disabled) formData.append('tanggal_jadi', form.elements.tanggal_jadi.value)
        if (!form.elements.tanggal_masuk.disabled) formData.append('tanggal_masuk', form.elements.tanggal_masuk.value)
        formData.append('_token', csrfToken)
        fetch(`${url}/transaksi/${transaksi.id}`, {
            body: formData,
            method: 'post'
        }).then(response => response.json()).then(json => {
            form.querySelector('.pesan').innerText = json.result ? 'Berhasil memperbarui data transaksi' : getPesanKesalahan('memperbarui data transaksi')
            if (json.result) updateTable()
        }).catch(e => {
            console.error(e)
            form.querySelector('.pesan').innerText = getPesanKesalahan('memperbarui data transaksi')
        })
    })

    form.elements.cek.addEventListener('click', () => {
        if (form.elements.id_transaksi.value) updateTable()
    })
})(document.querySelector('#form-detail-transaksi'));

// Daftarkan pelanggan
(form => {
    form.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('username', form.elements.username.value)
        formData.append('password', form.elements.password.value)
        formData.append('nama', form.elements.nama.value)
        formData.append('alamat', form.elements.alamat.value)
        formData.append('telepon', form.elements.telepon.value)
        formData.append('_token', csrfToken)
        fetch(`${url}/pelanggan`, {
            body: formData,
            method: 'post'
        }).then(response => response.json()).then(json => {
            form.querySelector('.pesan').innerText = json.result ? `Berhasil menyimpan data pelanggan ${form.elements.username.value}` : `Username ${form.elements.username.value} telah terdaftar. Pilih yang lain`
        }).catch(e => {
            console.error(e)
            form.querySelector('.pesan').innerText = getPesanKesalahan('menyimpan data pelanggan')
        })
    })
})(document.querySelector('#form-daftarkan-pelanggan'));

// API Console

// API otentikasi
(form => {
    const toggleApiConsole = enable => {
        form.querySelector('input[type=submit]').disabled = enable
        form.querySelector('button[name=cek-token]').disabled = !enable
        form.querySelector('button[name=cabut-token]').disabled = !enable

        document.querySelector('#menu-container :nth-last-child(1)').disabled = !enable
        document.querySelector('#menu-container :nth-last-child(2)').disabled = !enable
    }

    form.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('username', form.elements.username.value)
        formData.append('password', form.elements.password.value)
        fetch(`${url}/api/otentikasi/pelanggan/masuk`, {
            body: formData,
            method: 'post'
        }).then(response => response.json()).then(json => {
            pelanggan.username = json.result ? form.elements.username.value : undefined
            pelanggan.token = json.result ? json.token : undefined
            if (json.result) {
                document.querySelector('#h3-api-otentikasi-status-username').innerText = `Masuk sebagai ${pelanggan.username}`
                document.querySelector('#h3-api-otentikasi-status-token').innerText = pelanggan.token
                toggleApiConsole(true)
            } else document.querySelector('#h3-api-otentikasi-status-pesan').innerText = 'username atau password salah'
        }).catch(e => {
            console.error(e)
            document.querySelector('#h3-api-otentikasi-status-pesan').innerText = getPesanKesalahan('masuk')
        })
    })

    form.querySelector('button[name=cek-token]').addEventListener('click', () => {
        fetch(`${url}/api/otentikasi/pelanggan/token`, {
            headers: {
                'Authorization': `Bearer ${pelanggan.token}`
            }
        }).then(response => response.json()).then(json => {
            document.querySelector('#h3-api-otentikasi-status-pesan').innerText = `Token${json.result ? ' ' : ' tidak '}valid`
        }).catch(e => {
            console.error(e)
            document.querySelector('#h3-api-otentikasi-status-pesan').innerText = getPesanKesalahan('mengecek token')
        })
    })

    form.querySelector('button[name=cabut-token]').addEventListener('click', () => {
        fetch(`${url}/api/otentikasi/pelanggan/keluar`, {
            headers: {
                'Authorization': `Bearer ${pelanggan.token}`
            }
        }).then(() => {
            document.querySelector('#h3-api-otentikasi-status-username').innerText = 'Belum masuk sebagai pelanggan'
            document.querySelector('#h3-api-otentikasi-status-token').innerText = ''
            document.querySelector('#h3-api-otentikasi-status-pesan').innerText = 'Berhasil mencabut token'
            toggleApiConsole(false)
        }).catch(e => {
            console.error(e)
            document.querySelector('#h3-api-otentikasi-status-pesan').innerText = getPesanKesalahan('mencabut token')
        })
    })
})(document.querySelector('#form-api-otentikasi'));

// Buat transaksi
(form => {
    const pesanan = {
        antar: false,
        detail: [],
        ekspres: false,
        totalBiaya: 0
    }

    let paketTerpilih

    const getTotalBiaya = () => {
        let totalBiaya = 0
        for (let i = 0; i < pesanan.detail.length; i++) {
            totalBiaya += pesanan.detail[i]['biaya']
        }
        return totalBiaya * (pesanan.ekspres ? 2 : 1)
    }

    const updateButtons = () => {
        form.elements.tambah.disabled = (!paketTerpilih || (form.elements.jumlah.value < 1 || form.elements.jumlah.value > 50))
        form.elements.submit.disabled = !pesanan.detail.length
    }

    const updateTexts = () => {
        form.querySelector('.buat-transaksi__total-biaya').innerText = `Total biaya pesanan: Rp ${Number(pesanan.totalBiaya / (pesanan.ekspres ? 2 : 1)).toLocaleString('id-ID')}`
        form.querySelector('.buat-transaksi__ekspres').innerText = pesanan.ekspres ? `x 2 (express) = Rp ${Number(pesanan.totalBiaya).toLocaleString('id-ID')}` : ''
    }

    form.addEventListener('submit', event => {
        event.preventDefault()
        fetch(`${url}/api/transaksi`, {
            body: JSON.stringify((() => {
                const pesananUntukDikirim = {
                    antar: pesanan.antar,
                    detail: [],
                    ekspres: pesanan.ekspres,
                    total_biaya: pesanan.totalBiaya
                }
                for (let i = 0; i < pesanan.detail.length; i++) {
                    pesananUntukDikirim.detail.push({
                        jenis: pesanan.detail[i].jenis,
                        jumlah: pesanan.detail[i].jumlah,
                        paket: pesanan.detail[i].paket,
                    })
                }
                return pesananUntukDikirim
            })()),
            headers: {
                'Authorization': `Bearer ${pelanggan.token}`,
                'Content-Type': 'application/json'
            },
            method: 'post'
        }).then(response => response.json()).then(json => {
            form.querySelector('.buat-transaksi__pesan').innerText = json.result ? 'Pesanan berhasil dikirim' : getPesanKesalahan('mengirim pesanan')
        }).catch(e => {
            console.error(e)
            form.querySelector('.buat-transaksi__pesan').innerText = getPesanKesalahan('mengirim pesanan')
        })
    })

    form.elements.paket.addEventListener('change', event => {
        if (event.target.value) {
            fetch(`${url}/api/paket/${event.target.value}`, {
                headers: {
                    'Authorization': `Bearer ${pelanggan.token}`
                }
            }).then(response => response.json()).then(json => {
                if (json.result) {
                    paketTerpilih = json.paket
                    form.querySelector('.buat-transaksi__paket').innerText = `${paketTerpilih['id']} (${paketTerpilih['nama']} - ${paketTerpilih['keterangan']})`
                    form.elements.jenis.lastElementChild.hidden = !paketTerpilih['press']
                    form.elements.jenis.value = 'dry_clean'
                } else {
                    paketTerpilih = undefined
                    form.querySelector('.buat-transaksi__paket').innerText = 'Tidak ditemukan'
                }
                updateButtons()
            }).catch(e => {
                console.error(e)
                form.querySelector('.buat-transaksi__paket').innerText = getPesanKesalahan('mendapatkan data paket')
            })
        } else {
            paketTerpilih = undefined
            updateButtons()
        }
    })

    form.elements.jumlah.addEventListener('change', () => {
        updateButtons()
    })

    form.elements.tambah.addEventListener('click', () => {
        const jenis = form.elements.jenis.value
        const jumlah = form.elements.jumlah.value

        pesanan.detail.push({
            biaya: paketTerpilih[jenis] * jumlah,
            jenis: jenis === 'dry_clean' ? 1 : 0,
            jumlah: jumlah,
            paket: paketTerpilih['id'],
        })
        pesanan.totalBiaya = getTotalBiaya()

        const li = form.querySelector('.buat-transaksi__daftar-pesanan').appendChild(document.createElement('li'))
        li.innerText = `${paketTerpilih['id']} (${paketTerpilih['nama']} - ${paketTerpilih['keterangan']}) - ${Number(paketTerpilih[jenis]).toLocaleString('id-ID')} (${jenis === 'dry_clean' ? 'Dry Clean' : 'Press'}) x ${jumlah} = ${Number(paketTerpilih[jenis] * jumlah).toLocaleString('id-ID')}`

        const button = li.appendChild(document.createElement('button'))
        button.addEventListener('click', event => {
            pesanan.detail.splice(event.target.value, 1)
            pesanan.totalBiaya = getTotalBiaya()
            event.target.parentElement.remove()
            form.querySelectorAll('.buat-transaksi__daftar-pesanan button').forEach((item, i) => {
                item.value = i
            })
            updateButtons()
            updateTexts()
        })
        button.classList.add('button-initial')
        button.innerText = 'Hapus'
        button.style.margin = '0 0 0.25rem 0.5rem'
        button.type = 'button'
        button.value = pesanan.detail.length - 1

        updateButtons()
        updateTexts()
    })

    form.elements.antar.addEventListener('change', event => {
        pesanan.antar = event.target.checked
        form.querySelector('.buat-transaksi__antar').style.display = event.target.checked ? '' : 'none'
    })

    form.elements.ekspres.addEventListener('change', event => {
        pesanan.ekspres = event.target.checked
        pesanan.totalBiaya = getTotalBiaya()
        updateTexts()
    })
})(document.querySelector('#form-buat-transaksi'));

// (form => {
//     form.addEventListener('submit', event => {
//         event.preventDefault()
//         const formData = new FormData()
//         formData.append('pelanggan', form.elements.pelanggan.value)
//         formData.append('paket', form.elements.paket.checked)
//         formData.append('transaksi', form.elements.transaksi.value)
//         formData.append('_token', csrfToken)
//         fetch(`${url}/seed`, {
//             body: formData,
//             method: 'post'
//         }).then(response => {
//             if (response.result) alert('Berhasil seed')
//             else alert('Gagal seed')
//         }).catch(e => {
//             console.error(e)
//             alert('Gagal seed')
//         })
//     })
// })(document.querySelector('#form-seed'));
