-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2019 at 10:31 AM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laundry_oasis`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`created_at`, `updated_at`, `username`, `password`, `remember_token`) VALUES
('2019-09-30 09:24:53', '2019-09-30 09:24:53', 'admin', '$2y$10$oiUtyV4qtCwMCDrT7lA3XuV3UwG6T9VTodz.tPO2bx5fhFtkA2/3y', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_transaksi` bigint(20) UNSIGNED NOT NULL,
  `id_paket` char(10) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `jumlah` tinyint(3) UNSIGNED NOT NULL,
  `jenis` tinyint(1) NOT NULL,
  `biaya` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`created_at`, `updated_at`, `id`, `id_transaksi`, `id_paket`, `jumlah`, `jenis`, `biaya`) VALUES
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 1, 1, 'PK00000007', 5, 1, 55000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 2, 1, 'PK00000008', 1, 0, 18500),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 3, 2, 'PK00000017', 2, 1, 25300),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 4, 2, 'PK00000009', 3, 0, 75000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 5, 2, 'PK00000013', 1, 1, 17500),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 6, 3, 'PK00000016', 5, 0, 85000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 7, 3, 'PK00000023', 4, 1, 82800),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 8, 4, 'PK00000023', 1, 1, 20700),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 9, 4, 'PK00000019', 5, 1, 115000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 10, 5, 'PK00000004', 4, 1, 152000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 11, 5, 'PK00000015', 2, 1, 80000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 12, 5, 'PK00000009', 5, 0, 125000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 13, 6, 'PK00000016', 3, 0, 51000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 14, 6, 'PK00000010', 3, 1, 190500),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 15, 6, 'PK00000022', 3, 0, 33000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 16, 7, 'PK00000025', 3, 0, 69000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 17, 8, 'PK00000014', 3, 1, 31500),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 18, 8, 'PK00000019', 3, 0, 42000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 19, 8, 'PK00000017', 2, 1, 25300),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 20, 9, 'PK00000004', 4, 1, 152000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 21, 9, 'PK00000011', 3, 1, 34500),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 22, 10, 'PK00000024', 1, 0, 16000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 23, 10, 'PK00000023', 3, 1, 62100),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 24, 10, 'PK00000020', 2, 0, 28000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 25, 11, 'PK00000025', 1, 1, 28750),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 26, 11, 'PK00000018', 2, 0, 28000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 27, 12, 'PK00000012', 5, 1, 75000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 28, 12, 'PK00000025', 5, 1, 143750),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 29, 12, 'PK00000014', 1, 1, 10500),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 30, 12, 'PK00000021', 3, 0, 55500),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 31, 13, 'PK00000011', 4, 0, 24000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 32, 13, 'PK00000008', 3, 0, 55500),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 33, 13, 'PK00000005', 3, 0, 60000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 34, 13, 'PK00000026', 5, 0, 92500),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 35, 14, 'PK00000022', 3, 1, 51750),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 36, 14, 'PK00000018', 1, 1, 20700),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 37, 14, 'PK00000006', 5, 1, 30000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 38, 15, 'PK00000020', 3, 0, 42000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 39, 15, 'PK00000007', 5, 0, 40000),
('2019-07-29 09:08:05', '2019-07-29 09:08:05', 40, 16, 'PK00000022', 4, 0, 44000),
('2019-07-29 11:24:46', '2019-07-29 11:24:46', 41, 17, 'PK00000011', 10, 0, 60000),
('2019-07-29 11:31:49', '2019-07-29 11:31:49', 42, 18, 'PK00000008', 2, 1, 48000),
('2019-07-29 11:31:49', '2019-07-29 11:31:49', 43, 18, 'PK00000006', 5, 1, 30000),
('2019-09-03 23:39:33', '2019-09-03 23:39:33', 44, 19, 'PK00000006', 4, 1, 28000),
('2019-09-27 13:43:52', '2019-09-27 13:43:52', 45, 20, 'PK00000003', 2, 0, 28000),
('2019-09-27 13:43:52', '2019-09-27 13:43:52', 46, 20, 'PK00000002', 1, 0, 12000),
('2019-09-30 09:23:12', '2019-09-30 09:23:12', 47, 21, 'PK00000002', 3, 1, 48000);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_01_01_000001_create_paket_table', 1),
(2, '2019_01_01_000002_create_pelanggan_table', 1),
(3, '2019_01_01_000003_create_transaksi_table', 1),
(4, '2019_01_01_000004_create_detail_transaksi_table', 1),
(5, '2019_07_16_000005_create_admin_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `paket`
--

CREATE TABLE `paket` (
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id` char(10) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `keterangan` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `dry_clean` mediumint(8) UNSIGNED NOT NULL,
  `press` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `paket`
--

INSERT INTO `paket` (`created_at`, `updated_at`, `id`, `nama`, `keterangan`, `dry_clean`, `press`) VALUES
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000002', 'T-Shirt', 'Gentleman', 16000, 12000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000003', 'Trousers', 'Gentleman', 18500, 14000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000004', 'Toga Tebal', 'Gentleman', 38000, 30000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000005', 'Toga Tipis', 'Gentleman', 27500, 20000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000006', 'Underwear', 'Gentleman', 7000, 0),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000007', 'Undershirt', 'Gentleman', 11000, 8000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000008', 'Jacket', 'Gentleman', 24000, 18500),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000009', 'Jacket Modif', 'Gentleman', 34500, 25000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000010', 'Jacket Semi Leather', 'Gentleman', 63500, 50000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000011', 'Necktie', 'Gentleman', 11500, 6000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000012', 'Vest', 'Gentleman', 15000, 12000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000013', 'Vest Tebal', 'Gentleman', 17500, 11500),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000014', 'Boxer', 'Gentleman', 10500, 0),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000015', 'Suit Ladies', 'Ladies', 40000, 30000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000016', 'Blouse Variasi', 'Ladies', 22000, 17000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000017', 'Scarf/Syal', 'Ladies', 12650, 0),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000018', 'Dress', 'Ladies', 20700, 14000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000019', 'Dress Variasi', 'Ladies', 23000, 14000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000020', 'Long Dress', 'Ladies', 23000, 14000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000021', 'Long Dress Variasi', 'Ladies', 25300, 18500),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000022', 'Skirt', 'Ladies', 17250, 11000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000023', 'Skirt Variasi', 'Ladies', 20700, 16000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000024', 'Long Skirt', 'Ladies', 20700, 16000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000025', 'Long Skirt Variasi', 'Ladies', 28750, 23000),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 'PK00000026', 'Long Coat', 'Ladies', 28750, 18500);

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `api_token` varchar(80) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `alamat` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `telepon` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`created_at`, `updated_at`, `username`, `password`, `api_token`, `nama`, `alamat`, `telepon`) VALUES
('2019-07-29 03:09:48', '2019-09-30 09:18:40', 'cnarpati', '$2y$10$Sd76z.4s9OO9PcfmQYtN5u0DOe6J0Rao7/49TyUKHafWkDamGx9oC', '9ad6ac1663c7a913052d6f0e4593f2fb43b043e9826218ca04833f113e50035a', 'Fitria Syahrini Sudiati S.IP', 'Kpg. Bata Putih No. 771', '081718638859'),
('2019-07-29 03:09:48', '2019-07-29 14:25:21', 'kezia.megantara', '$2y$10$rDPCfAOsF38cf/AzqyiQGes/nofLSh1yY8p9CLJx.3yNB8VHh2C/S', 'd68d0a7677d23194c5526b2fda0f1fac6719e8c0befc343b37674c19db5a853f', 'Gaduh Kuswoyo', 'Ki. Sutarjo No. 719', '08199521291'),
('2019-07-29 03:09:48', '2019-07-29 11:27:03', 'wijayanti.gina', '$2y$10$soYAjhlSUpkRJkRrvejTh.JhWM7PuVV0dEfhiTcMQRJiWmu60c.Ke', '87247e8bba51747758e73fa9853d5a1e17ad1bb0c0f728bb9e2a480d3d5a2b4b', 'Maimunah Novitasari', 'Jln. Otista No. 235', '081228071620');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `id` bigint(20) UNSIGNED NOT NULL,
  `username_pelanggan` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `tanggal_masuk` datetime DEFAULT NULL,
  `tanggal_jadi` datetime DEFAULT NULL,
  `antar` tinyint(1) NOT NULL,
  `ekspres` tinyint(1) NOT NULL,
  `total_biaya` mediumint(8) UNSIGNED NOT NULL,
  `tanggal_selesai` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`created_at`, `updated_at`, `id`, `username_pelanggan`, `tanggal_masuk`, `tanggal_jadi`, `antar`, `ekspres`, `total_biaya`, `tanggal_selesai`) VALUES
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 1, 'kezia.megantara', NULL, NULL, 0, 0, 73500, NULL),
('2019-07-29 03:09:48', '2019-09-27 02:55:21', 2, 'cnarpati', '2019-07-29 10:09:48', '2019-08-01 17:45:09', 0, 1, 235600, '2019-09-27 02:55:00'),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 3, 'wijayanti.gina', NULL, NULL, 1, 1, 335600, NULL),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 4, 'kezia.megantara', '2019-07-29 10:09:48', '2019-08-01 11:53:58', 1, 0, 135700, '2019-08-04 04:33:49'),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 5, 'wijayanti.gina', '2019-07-29 10:09:48', '2019-07-31 18:47:49', 1, 1, 714000, '2019-08-04 04:02:51'),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 6, 'wijayanti.gina', NULL, NULL, 0, 1, 549000, NULL),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 7, 'kezia.megantara', NULL, NULL, 0, 0, 69000, NULL),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 8, 'kezia.megantara', NULL, NULL, 1, 0, 98800, NULL),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 9, 'kezia.megantara', '2019-07-29 10:09:48', '2019-07-31 04:36:41', 1, 0, 186500, '2019-08-04 00:34:44'),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 10, 'kezia.megantara', '2019-07-29 10:09:48', '2019-08-01 04:50:18', 0, 0, 106100, NULL),
('2019-07-29 03:09:48', '2019-07-29 11:29:39', 11, 'wijayanti.gina', '2019-07-29 12:15:00', '2019-07-30 14:00:00', 1, 1, 113500, '2019-07-30 15:10:00'),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 12, 'cnarpati', NULL, NULL, 1, 0, 284750, NULL),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 13, 'cnarpati', '2019-07-29 10:09:48', '2019-07-30 16:14:33', 0, 0, 232000, NULL),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 14, 'cnarpati', NULL, NULL, 1, 0, 102450, NULL),
('2019-07-29 03:09:48', '2019-07-29 03:09:48', 15, 'kezia.megantara', '2019-07-29 10:09:48', '2019-07-31 17:12:00', 1, 1, 164000, NULL),
('2019-07-29 09:08:05', '2019-07-29 09:08:05', 16, 'cnarpati', NULL, NULL, 1, 1, 88000, NULL),
('2019-07-29 11:24:46', '2019-07-29 11:26:15', 17, 'wijayanti.gina', '2019-07-29 20:00:00', '2019-07-30 10:00:00', 1, 1, 120000, '2019-07-30 12:00:00'),
('2019-07-29 11:31:49', '2019-07-29 11:31:49', 18, 'wijayanti.gina', NULL, NULL, 1, 0, 78000, NULL),
('2019-09-03 23:39:33', '2019-09-03 23:39:33', 19, 'cnarpati', NULL, NULL, 1, 1, 56000, NULL),
('2019-09-27 13:43:52', '2019-09-27 13:43:52', 20, 'cnarpati', NULL, NULL, 0, 0, 40000, NULL),
('2019-09-30 09:23:12', '2019-09-30 09:27:41', 21, 'cnarpati', '2019-09-30 09:26:00', '2019-10-02 09:26:00', 1, 1, 96000, '2019-10-02 09:27:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `detail_transaksi_id_transaksi_foreign` (`id_transaksi`),
  ADD KEY `detail_transaksi_id_paket_foreign` (`id_paket`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `pelanggan_api_token_unique` (`api_token`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaksi_username_pelanggan_foreign` (`username_pelanggan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `detail_transaksi_id_paket_foreign` FOREIGN KEY (`id_paket`) REFERENCES `paket` (`id`),
  ADD CONSTRAINT `detail_transaksi_id_transaksi_foreign` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_username_pelanggan_foreign` FOREIGN KEY (`username_pelanggan`) REFERENCES `pelanggan` (`username`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
