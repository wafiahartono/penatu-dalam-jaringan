/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simple_data_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simple-data-table */ "./resources/js/simple-data-table.js");

var csrfToken = document.querySelector('meta[name=csrf-token]').content;
var pelanggan = {};
var url = 'https://wafihartono.projects/alpha-laravel/public';

var getPesanKesalahan = function getPesanKesalahan(aktivitas) {
  return "Terjadi kesalahan saat ".concat(aktivitas, ". Cek log pada console.");
};

var getUrlPagination = function getUrlPagination(path, pagination) {
  return "".concat(url).concat(path, "?item=").concat(pagination.item, "&halaman=").concat(pagination.page, "&urutkan=").concat(pagination.orderBy, "&urutan=").concat(pagination.order, "&cari=").concat(pagination.search);
}; // Notifikasi


(function () {
  var updateNotifikasi = function updateNotifikasi() {
    fetch("".concat(url, "/notifikasi/transaksi")).then(function (response) {
      return response.json();
    }).then(function (json) {
      document.querySelector('#h3-notifikasi-pesanan').innerText = json.result ? "Ada ".concat(json.result, " pesanan masuk") : 'Belum ada pesanan yang masuk';
    });
  };

  document.querySelector('#button-refresh-notifikasi-pesanan').addEventListener('click', function () {
    updateNotifikasi();
  });
  updateNotifikasi();
})(); // Menu


(function () {
  var menu = [{
    nama: 'Daftar Transaksi',
    id: 'table-daftar-transaksi'
  }, {
    nama: 'Detail Transaksi',
    id: 'form-detail-transaksi'
  }, {
    nama: 'Daftarkan Pelanggan',
    id: 'form-daftarkan-pelanggan'
  }, {
    nama: 'Daftar Pelanggan',
    id: 'table-daftar-pelanggan'
  }, {
    nama: 'API Console',
    id: 'container-api-otentikasi'
  }, {
    nama: 'Daftar Paket',
    id: 'table-daftar-paket'
  }, {
    nama: 'Buat Transaksi',
    id: 'form-buat-transaksi'
  }];
  menu.forEach(function (item, i) {
    var button = document.querySelector('#menu-container').appendChild(document.createElement('button'));
    button.innerText = item.nama;
    if (i === 0 || i === menu.length - 1 || i === menu.length - 2) button.disabled = true;
  });
  var lastMenuIndex = 0;
  var lastButtonElement = document.querySelector('#menu-container > button');
  document.querySelectorAll('#menu-container > *').forEach(function (element, i) {
    element.addEventListener('click', function () {
      document.querySelector("#menu-content > #".concat(menu[lastMenuIndex].id)).style.display = 'none';
      document.querySelector("#menu-content > #".concat(menu[i].id)).style.display = '';
      element.disabled = true;
      lastButtonElement.disabled = false;
      lastMenuIndex = i;
      lastButtonElement = element;
    });
  });
})(); // Data tables


(function () {
  var opsiDefault = {
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
    } // Daftar transaksi

  };
  new _simple_data_table__WEBPACK_IMPORTED_MODULE_0__["default"](document.querySelector('#table-daftar-transaksi'), {
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
  }, function (pagination) {
    return fetch(getUrlPagination('/transaksi', pagination)).then(function (response) {
      return response.json();
    }).then(function (json) {
      return json;
    });
  }, function () {
    document.querySelectorAll('#table-daftar-transaksi .nullable').forEach(function (item) {
      if (!item.innerText) item.innerText = '-';
    });
    document.querySelectorAll('#table-daftar-transaksi .boolean').forEach(function (item) {
      if (item.innerText !== '-') item.innerText = item.innerText === '1' ? 'Ya' : 'Tidak';
    });
    document.querySelectorAll('#table-daftar-transaksi .mata-uang').forEach(function (item) {
      if (item.innerText !== '-') item.innerText = Number(item.innerText).toLocaleString('id-ID');
    });
  }); // Daftar pelanggan

  new _simple_data_table__WEBPACK_IMPORTED_MODULE_0__["default"](document.querySelector('#table-daftar-pelanggan'), {
    immediate: false,
    orderOption: opsiDefault.order,
    orderByOption: {
      nama: 'Nama',
      username: 'Username',
      telepon: 'Telepon'
    },
    selectItemOption: opsiDefault.item,
    message: opsiDefault.message
  }, function (pagination) {
    return fetch(getUrlPagination('/pelanggan', pagination)).then(function (response) {
      return response.json();
    }).then(function (json) {
      return json;
    });
  }); // Daftar paket

  new _simple_data_table__WEBPACK_IMPORTED_MODULE_0__["default"](document.querySelector('#table-daftar-paket'), {
    immediate: false,
    orderOption: opsiDefault.order,
    orderByOption: {
      id: 'ID Paket',
      nama: 'Nama',
      keterangan: 'Keterangan'
    },
    selectItemOption: opsiDefault.item,
    message: opsiDefault.message
  }, function (pagination) {
    return fetch(getUrlPagination('/api/paket', pagination), {
      headers: {
        'Authorization': "Bearer ".concat(pelanggan.token)
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      return json;
    });
  }, function () {
    document.querySelectorAll('#table-daftar-paket .nullable').forEach(function (item) {
      if (item.innerText === '0') item.innerText = '-';
    });
    document.querySelectorAll('#table-daftar-paket .mata-uang').forEach(function (item) {
      if (item.innerText !== '-') item.innerText = Number(item.innerText).toLocaleString('id-ID');
    });
  });
})(); // Detail transaksi


(function (form) {
  var transaksi;

  var updateLayout = function updateLayout(ditemukan, masuk, selesai, pesan) {
    form.elements.tanggal_selesai.disabled = !(ditemukan && masuk && !selesai);
    form.elements.tanggal_jadi.disabled = !(ditemukan && !masuk);
    form.elements.tanggal_masuk.disabled = !(ditemukan && !masuk);
    form.elements.submit.disabled = !(ditemukan && !selesai);
    form.querySelector('.detail-transaksi__id-transaksi').innerText = ditemukan ? transaksi.id : " ".concat(pesan);
    form.querySelector('tbody').style.display = ditemukan ? '' : 'none';
    form.querySelector('tfoot').style.display = ditemukan ? '' : 'none';

    if (ditemukan) {
      form.querySelector('.detail-transaksi__tanggal-pesan').innerText = transaksi.created_at;
      form.querySelector('.detail-transaksi__nama-pelanggan').innerText = transaksi.pelanggan.nama;
      form.querySelector('.detail-transaksi__alamat-pelanggan').innerText = transaksi.pelanggan.alamat;
      form.querySelector('.detail-transaksi__telepon-pelanggan').innerText = transaksi.pelanggan.telepon;
      form.querySelector('.detail-transaksi__tanggal-masuk').innerText = transaksi.tanggal_masuk ? transaksi.tanggal_masuk : '-';
      form.querySelector('.detail-transaksi__tanggal-jadi').innerText = transaksi.tanggal_jadi ? transaksi.tanggal_jadi : '-';
      form.querySelector('.detail-transaksi__sub-total-biaya').children[1].innerText = Number(transaksi.ekspres ? transaksi.total_biaya / 2 : transaksi.total_biaya).toLocaleString('id-ID');
      form.querySelector('.detail-transaksi__antar').style.display = transaksi.antar ? '' : 'none';
      form.querySelector('.detail-transaksi__ekspres').style.display = transaksi.ekspres ? '' : 'none';
      form.querySelector('.detail-transaksi__ekspres').children[2].innerText = transaksi.ekspres ? Number(transaksi.total_biaya / 2).toLocaleString('id-ID') : '';
      form.querySelector('.detail-transaksi__total-biaya').children[1].innerText = Number(transaksi.total_biaya).toLocaleString('id-ID');
      form.querySelector('.detail-transaksi__selesai').innerText = transaksi.tanggal_selesai ? transaksi.tanggal_selesai : '';
      form.querySelector('.detail-transaksi__selesai').style.display = transaksi.tanggal_selesai ? '' : 'none';

      while (form.querySelector('tbody').childElementCount > 3) {
        form.querySelector('tbody').lastElementChild.remove();
      }

      for (var i = 0; i < transaksi.detail_transaksi.length; i++) {
        var tr = form.querySelector('tbody').appendChild(form.querySelector('.detail-transaksi__row').cloneNode(true));
        tr.style.display = '';
        tr.children[0].innerText = transaksi.detail_transaksi[i].id_paket;
        tr.children[1].innerText = "".concat(transaksi.detail_transaksi[i].paket.nama, " - ").concat(transaksi.detail_transaksi[i].paket.keterangan);
        tr.children[2].innerText = transaksi.detail_transaksi[i].jenis ? 'Dry Clean' : 'Press';
        tr.children[3].innerText = transaksi.detail_transaksi[i].jumlah;
        tr.children[4].innerText = Number(transaksi.detail_transaksi[i].biaya / transaksi.detail_transaksi[i].jumlah).toLocaleString('id-ID');
        tr.children[5].innerText = Number(transaksi.detail_transaksi[i].biaya).toLocaleString('id-ID');
      }
    }
  };

  var updateTable = function updateTable() {
    form.querySelector('.detail-transaksi__id-transaksi').innerText = 'Sedang mendapatkan data transaksi';
    fetch("".concat(url, "/transaksi/").concat(form.elements.id_transaksi.value)).then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.result) {
        transaksi = json.transaksi;
        updateLayout(true, json.transaksi.tanggal_masuk ? true : false, json.transaksi.tanggal_selesai ? true : false);
      } else updateLayout(false, false, false, 'Transaksi tidak ditemukan');
    })["catch"](function (e) {
      console.error(e);
      updateLayout(false, false, false, getPesanKesalahan('mendapatkan data transaksi'));
    });
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData();
    if (!form.elements.tanggal_selesai.disabled) formData.append('tanggal_selesai', form.elements.tanggal_selesai.value);
    if (!form.elements.tanggal_jadi.disabled) formData.append('tanggal_jadi', form.elements.tanggal_jadi.value);
    if (!form.elements.tanggal_masuk.disabled) formData.append('tanggal_masuk', form.elements.tanggal_masuk.value);
    formData.append('_token', csrfToken);
    fetch("".concat(url, "/transaksi/").concat(transaksi.id), {
      body: formData,
      method: 'post'
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      form.querySelector('.pesan').innerText = json.result ? 'Berhasil memperbarui data transaksi' : getPesanKesalahan('memperbarui data transaksi');
      if (json.result) updateTable();
    })["catch"](function (e) {
      console.error(e);
      form.querySelector('.pesan').innerText = getPesanKesalahan('memperbarui data transaksi');
    });
  });
  form.elements.cek.addEventListener('click', function () {
    if (form.elements.id_transaksi.value) updateTable();
  });
})(document.querySelector('#form-detail-transaksi')); // Daftarkan pelanggan


(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData();
    formData.append('username', form.elements.username.value);
    formData.append('password', form.elements.password.value);
    formData.append('nama', form.elements.nama.value);
    formData.append('alamat', form.elements.alamat.value);
    formData.append('telepon', form.elements.telepon.value);
    formData.append('_token', csrfToken);
    fetch("".concat(url, "/pelanggan"), {
      body: formData,
      method: 'post'
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      form.querySelector('.pesan').innerText = json.result ? "Berhasil menyimpan data pelanggan ".concat(form.elements.username.value) : "Username ".concat(form.elements.username.value, " telah terdaftar. Pilih yang lain");
    })["catch"](function (e) {
      console.error(e);
      form.querySelector('.pesan').innerText = getPesanKesalahan('menyimpan data pelanggan');
    });
  });
})(document.querySelector('#form-daftarkan-pelanggan')); // API Console
// API otentikasi


(function (form) {
  var toggleApiConsole = function toggleApiConsole(enable) {
    form.querySelector('input[type=submit]').disabled = enable;
    form.querySelector('button[name=cek-token]').disabled = !enable;
    form.querySelector('button[name=cabut-token]').disabled = !enable;
    document.querySelector('#menu-container :nth-last-child(1)').disabled = !enable;
    document.querySelector('#menu-container :nth-last-child(2)').disabled = !enable;
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData();
    formData.append('username', form.elements.username.value);
    formData.append('password', form.elements.password.value);
    fetch("".concat(url, "/api/otentikasi/pelanggan/masuk"), {
      body: formData,
      method: 'post'
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      pelanggan.username = json.result ? form.elements.username.value : undefined;
      pelanggan.token = json.result ? json.token : undefined;

      if (json.result) {
        document.querySelector('#h3-api-otentikasi-status-username').innerText = "Masuk sebagai ".concat(pelanggan.username);
        document.querySelector('#h3-api-otentikasi-status-token').innerText = pelanggan.token;
        toggleApiConsole(true);
      } else document.querySelector('#h3-api-otentikasi-status-pesan').innerText = 'username atau password salah';
    })["catch"](function (e) {
      console.error(e);
      document.querySelector('#h3-api-otentikasi-status-pesan').innerText = getPesanKesalahan('masuk');
    });
  });
  form.querySelector('button[name=cek-token]').addEventListener('click', function () {
    fetch("".concat(url, "/api/otentikasi/pelanggan/token"), {
      headers: {
        'Authorization': "Bearer ".concat(pelanggan.token)
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      document.querySelector('#h3-api-otentikasi-status-pesan').innerText = "Token".concat(json.result ? ' ' : ' tidak ', "valid");
    })["catch"](function (e) {
      console.error(e);
      document.querySelector('#h3-api-otentikasi-status-pesan').innerText = getPesanKesalahan('mengecek token');
    });
  });
  form.querySelector('button[name=cabut-token]').addEventListener('click', function () {
    fetch("".concat(url, "/api/otentikasi/pelanggan/keluar"), {
      headers: {
        'Authorization': "Bearer ".concat(pelanggan.token)
      }
    }).then(function () {
      document.querySelector('#h3-api-otentikasi-status-username').innerText = 'Belum masuk sebagai pelanggan';
      document.querySelector('#h3-api-otentikasi-status-token').innerText = '';
      document.querySelector('#h3-api-otentikasi-status-pesan').innerText = 'Berhasil mencabut token';
      toggleApiConsole(false);
    })["catch"](function (e) {
      console.error(e);
      document.querySelector('#h3-api-otentikasi-status-pesan').innerText = getPesanKesalahan('mencabut token');
    });
  });
})(document.querySelector('#form-api-otentikasi')); // Buat transaksi


(function (form) {
  var pesanan = {
    antar: false,
    detail: [],
    ekspres: false,
    totalBiaya: 0
  };
  var paketTerpilih;

  var getTotalBiaya = function getTotalBiaya() {
    var totalBiaya = 0;

    for (var i = 0; i < pesanan.detail.length; i++) {
      totalBiaya += pesanan.detail[i]['biaya'];
    }

    return totalBiaya * (pesanan.ekspres ? 2 : 1);
  };

  var updateButtons = function updateButtons() {
    form.elements.tambah.disabled = !paketTerpilih || form.elements.jumlah.value < 1 || form.elements.jumlah.value > 50;
    form.elements.submit.disabled = !pesanan.detail.length;
  };

  var updateTexts = function updateTexts() {
    form.querySelector('.buat-transaksi__total-biaya').innerText = "Total biaya pesanan: Rp ".concat(Number(pesanan.totalBiaya / (pesanan.ekspres ? 2 : 1)).toLocaleString('id-ID'));
    form.querySelector('.buat-transaksi__ekspres').innerText = pesanan.ekspres ? "x 2 (express) = Rp ".concat(Number(pesanan.totalBiaya).toLocaleString('id-ID')) : '';
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    fetch("".concat(url, "/api/transaksi"), {
      body: JSON.stringify(function () {
        var pesananUntukDikirim = {
          antar: pesanan.antar,
          detail: [],
          ekspres: pesanan.ekspres,
          total_biaya: pesanan.totalBiaya
        };

        for (var i = 0; i < pesanan.detail.length; i++) {
          pesananUntukDikirim.detail.push({
            jenis: pesanan.detail[i].jenis,
            jumlah: pesanan.detail[i].jumlah,
            paket: pesanan.detail[i].paket
          });
        }

        return pesananUntukDikirim;
      }()),
      headers: {
        'Authorization': "Bearer ".concat(pelanggan.token),
        'Content-Type': 'application/json'
      },
      method: 'post'
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      form.querySelector('.buat-transaksi__pesan').innerText = json.result ? 'Pesanan berhasil dikirim' : getPesanKesalahan('mengirim pesanan');
    })["catch"](function (e) {
      console.error(e);
      form.querySelector('.buat-transaksi__pesan').innerText = getPesanKesalahan('mengirim pesanan');
    });
  });
  form.elements.paket.addEventListener('change', function (event) {
    if (event.target.value) {
      fetch("".concat(url, "/api/paket/").concat(event.target.value), {
        headers: {
          'Authorization': "Bearer ".concat(pelanggan.token)
        }
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.result) {
          paketTerpilih = json.paket;
          form.querySelector('.buat-transaksi__paket').innerText = "".concat(paketTerpilih['id'], " (").concat(paketTerpilih['nama'], " - ").concat(paketTerpilih['keterangan'], ")");
          form.elements.jenis.lastElementChild.hidden = !paketTerpilih['press'];
          form.elements.jenis.value = 'dry_clean';
        } else {
          paketTerpilih = undefined;
          form.querySelector('.buat-transaksi__paket').innerText = 'Tidak ditemukan';
        }

        updateButtons();
      })["catch"](function (e) {
        console.error(e);
        form.querySelector('.buat-transaksi__paket').innerText = getPesanKesalahan('mendapatkan data paket');
      });
    } else {
      paketTerpilih = undefined;
      updateButtons();
    }
  });
  form.elements.jumlah.addEventListener('change', function () {
    updateButtons();
  });
  form.elements.tambah.addEventListener('click', function () {
    var jenis = form.elements.jenis.value;
    var jumlah = form.elements.jumlah.value;
    pesanan.detail.push({
      biaya: paketTerpilih[jenis] * jumlah,
      jenis: jenis === 'dry_clean' ? 1 : 0,
      jumlah: jumlah,
      paket: paketTerpilih['id']
    });
    pesanan.totalBiaya = getTotalBiaya();
    var li = form.querySelector('.buat-transaksi__daftar-pesanan').appendChild(document.createElement('li'));
    li.innerText = "".concat(paketTerpilih['id'], " (").concat(paketTerpilih['nama'], " - ").concat(paketTerpilih['keterangan'], ") - ").concat(Number(paketTerpilih[jenis]).toLocaleString('id-ID'), " (").concat(jenis === 'dry_clean' ? 'Dry Clean' : 'Press', ") x ").concat(jumlah, " = ").concat(Number(paketTerpilih[jenis] * jumlah).toLocaleString('id-ID'));
    var button = li.appendChild(document.createElement('button'));
    button.addEventListener('click', function (event) {
      pesanan.detail.splice(event.target.value, 1);
      pesanan.totalBiaya = getTotalBiaya();
      event.target.parentElement.remove();
      form.querySelectorAll('.buat-transaksi__daftar-pesanan button').forEach(function (item, i) {
        item.value = i;
      });
      updateButtons();
      updateTexts();
    });
    button.classList.add('button-initial');
    button.innerText = 'Hapus';
    button.style.margin = '0 0 0.25rem 0.5rem';
    button.type = 'button';
    button.value = pesanan.detail.length - 1;
    updateButtons();
    updateTexts();
  });
  form.elements.antar.addEventListener('change', function (event) {
    pesanan.antar = event.target.checked;
    form.querySelector('.buat-transaksi__antar').style.display = event.target.checked ? '' : 'none';
  });
  form.elements.ekspres.addEventListener('change', function (event) {
    pesanan.ekspres = event.target.checked;
    pesanan.totalBiaya = getTotalBiaya();
    updateTexts();
  });
})(document.querySelector('#form-buat-transaksi')); // (form => {
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

/***/ }),

/***/ "./resources/js/simple-data-table.js":
/*!*******************************************!*\
  !*** ./resources/js/simple-data-table.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataTable; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2019 Wafi Azmi Hartono
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DataTable = // init = {
//     immediate: false,
//     orderOption: {
//         asc: 'Ascending',
//         desc: 'Descending'
//     },
//     orderByOption: {
//         username: 'Username',
//         nama: 'Nama',
//         telepon: 'Telepon'
//     },
//     selectItemOption: [10, 25, 50, 100],
//     message: {
//         empty: 'Tidak ada data',
//         error: 'Terjadi kesalahan saat mendapatkan data',
//         initial: 'Tekan tombol refresh untuk mulai mendapatkan data',
//         retrieve: 'Sedang mendapatkan data...',
//     }
// }
function DataTable(root, init, updateCallback, updateFinishCallback) {
  _classCallCheck(this, DataTable);

  var layout = {
    buttonNext: root.querySelector('.dt__button-next') ? true : false,
    buttonPrevious: root.querySelector('.dt__button-previous') ? true : false,
    buttonRefresh: root.querySelector('.dt__button-refresh') ? true : false,
    inputPage: root.querySelector('.dt__input-page') ? true : false,
    inputSearch: root.querySelector('.dt__input-search') ? true : false,
    selectItem: root.querySelector('.dt__select-item') ? true : false,
    selectOrder: root.querySelector('.dt__select-order') ? true : false,
    selectOrderBy: root.querySelector('.dt__select-order-by') ? true : false,
    textItemFrom: root.querySelector('.dt__text-item-from') ? true : false,
    textItemTo: root.querySelector('.dt__text-item-to') ? true : false,
    textItemTotal: root.querySelector('.dt__text-item-total') ? true : false,
    textPageTotal: root.querySelector('.dt__text-page-total') ? true : false
  };
  var pagination = {
    item: undefined,
    order: undefined,
    orderBy: undefined,
    page: 1,
    search: ''
  };

  var displayMessage = function displayMessage(show) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    root.querySelector('.dt__tbody').style.display = show ? 'none' : '';
    root.querySelector('.dt__message>tr>td').innerText = message;
    root.querySelector('.dt__message').style.display = show ? '' : 'none';
  };

  var updateData = function updateData() {
    displayMessage(true, init.message.retrieve);
    updateCallback(pagination).then(function (pageData) {
      if (pageData.data.length) {
        (function (row, item) {
          if (row < item) {
            for (var i = 0; i < item - row; i++) {
              root.querySelector('.dt__tbody').appendChild(root.querySelector('table>.dt__row').firstElementChild.cloneNode(true));
            }
          } else if (row > item) {
            root.querySelectorAll('.dt__tbody>tr').forEach(function (el, index) {
              if (index > item - 1) el.style.display = 'none';
            });
          }

          root.querySelectorAll('.dt__tbody>tr').forEach(function (el, index) {
            if (index < item) {
              el.style.display = '';
              el.querySelectorAll('td').forEach(function (el1, index1) {
                el1.innerText = Object.values(pageData.data[index])[index1];
              });
            }
          });
        })(root.querySelector('.dt__tbody').childElementCount, 1 + pageData.item_to - pageData.item_from);

        displayMessage(false);
      } else displayMessage(true, init.message.empty);

      if (layout.buttonNext) root.querySelector('.dt__button-next').disabled = pageData.page_current === pageData.page_total;
      if (layout.buttonPrevious) root.querySelector('.dt__button-previous').disabled = pageData.page_current === 1;
      if (layout.inputPage) root.querySelector('.dt__input-page').max = pageData.page_total;
      if (layout.inputPage) root.querySelector('.dt__input-page').value = pageData.page_current;
      if (layout.textItemFrom) root.querySelector('.dt__text-item-from').innerText = pageData.item_from;
      if (layout.textItemTo) root.querySelector('.dt__text-item-to').innerText = pageData.item_to;
      if (layout.textItemTotal) root.querySelector('.dt__text-item-total').innerText = pageData.item_total;
      if (layout.textPageTotal) root.querySelector('.dt__text-page-total').innerText = pageData.page_total;
      if (updateFinishCallback) updateFinishCallback();
    })["catch"](function (error) {
      console.error(error);
      displayMessage(true, init.message.error);
    });
  };

  (function () {
    var tbody = root.querySelector('table').insertBefore(document.createElement('tbody'), root.querySelector('table>.dt__row'));
    tbody.className = 'dt__tbody';
    tbody.style.display = 'none';
  })();

  (function () {
    var tbody = root.querySelector('table').appendChild(document.createElement('tbody'));
    tbody.className = 'dt__message';
    var td = tbody.appendChild(document.createElement('tr')).appendChild(document.createElement('td'));
    td.colSpan = root.querySelector('table>.dt__row>tr').childElementCount;
    td.innerText = init.message.initial;
  })();

  if (layout.buttonNext) {
    root.querySelector('.dt__button-next').disabled = true;
    root.querySelector('.dt__button-next').addEventListener('click', function () {
      pagination.page++;
      updateData();
    });
  }

  if (layout.buttonPrevious) {
    root.querySelector('.dt__button-previous').disabled = true;
    root.querySelector('.dt__button-previous').addEventListener('click', function () {
      pagination.page--;
      updateData();
    });
  }

  if (layout.buttonRefresh) {
    root.querySelector('.dt__button-refresh').addEventListener('click', function () {
      updateData();
    });
  }

  if (layout.inputPage) {
    root.querySelector('.dt__input-page').max = 1;
    root.querySelector('.dt__input-page').min = 1;
    root.querySelector('.dt__input-page').type = 'number';
    root.querySelector('.dt__input-page').value = 1;
    root.querySelector('.dt__input-page').addEventListener('change', function (event) {
      pagination.page = event.target.value;
      updateData();
    });
  }

  if (layout.inputSearch) {
    root.querySelector('.dt__input-search').type = 'search';
    root.querySelector('.dt__input-search').addEventListener('change', function (event) {
      pagination.page = 1;
      pagination.search = event.target.value;
      updateData();
    });
  }

  if (layout.selectItem) {
    for (var i = 0; i < init.selectItemOption.length; i++) {
      var option = document.createElement('option');
      option.innerText = init.selectItemOption[i];
      option.value = init.selectItemOption[i];
      root.querySelector('.dt__select-item').add(option);
    }

    pagination.item = root.querySelector('.dt__select-item').value;
    root.querySelector('.dt__select-item').addEventListener('change', function (event) {
      pagination.item = event.target.value;
      pagination.page = 1;
      updateData();
    });
  }

  if (layout.selectOrder) {
    for (var val in init.orderOption) {
      var _option = document.createElement('option');

      _option.innerText = init.orderOption[val];
      _option.value = val;
      root.querySelector('.dt__select-order').add(_option);
    }

    pagination.order = root.querySelector('.dt__select-order').value;
    root.querySelector('.dt__select-order').addEventListener('change', function (event) {
      pagination.order = event.target.value;
      updateData();
    });
  }

  if (layout.selectOrderBy) {
    for (var _val in init.orderByOption) {
      var _option2 = document.createElement('option');

      _option2.innerText = init.orderByOption[_val];
      _option2.value = _val;
      root.querySelector('.dt__select-order-by').add(_option2);
    }

    pagination.orderBy = root.querySelector('.dt__select-order-by').value;
    root.querySelector('.dt__select-order-by').addEventListener('change', function (event) {
      pagination.orderBy = event.target.value;
      updateData();
    });
  }

  if (init.immediate) updateData();
};



/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\Projects\alpha-laravel\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! D:\Projects\alpha-laravel\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });