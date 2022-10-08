-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2022 at 04:48 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `data_simcard`
--

-- --------------------------------------------------------

--
-- Table structure for table `simcard`
--

CREATE TABLE `simcard` (
  `id` int(11) NOT NULL,
  `tgl_masa_aktif` date DEFAULT NULL,
  `nomer_label` varchar(255) DEFAULT NULL,
  `nomer` varchar(64) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `nik` varchar(64) DEFAULT NULL,
  `data` text DEFAULT NULL,
  `label` text DEFAULT NULL,
  `status` varchar(64) NOT NULL,
  `type` varchar(64) NOT NULL,
  `updatedby` varchar(128) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `simcard`
--

INSERT INTO `simcard` (`id`, `tgl_masa_aktif`, `nomer_label`, `nomer`, `pass`, `nik`, `data`, `label`, `status`, `type`, `updatedby`, `createdAt`, `updatedAt`) VALUES
(10, '2201-01-01', 'TRI 01', '081111111111', 'ndut123', '123415', 'PP 1JAN22', 'dddrfgh', 'public', 'konvensional', 'deye', '2022-10-07 16:23:06', '2022-10-08 14:31:48'),
(12, '2002-03-03', 'hdvshsvdhs', '29301930132113', 'dhwqkhdq', '721312', '213', 'yeyeye', 'PUBLIC', 'SYARIAH', 'ndut', '2022-10-07 17:23:32', '2022-10-07 17:23:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `simcard`
--
ALTER TABLE `simcard`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `simcard`
--
ALTER TABLE `simcard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
