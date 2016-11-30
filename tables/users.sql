-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Nov 28, 2016 at 08:38 PM
-- Server version: 5.5.49-log
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `double_date`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL COMMENT 'User ID',
  `username` varchar(20) NOT NULL COMMENT 'e.g. DD123456',
  `password` varchar(64) NOT NULL COMMENT 'Hashed password',
  `name` varchar(64) NOT NULL COMMENT 'People''s names',
  `email` varchar(64) NOT NULL COMMENT 'Contact email',
  `userLevel` enum('normal','moderator','administrator') NOT NULL COMMENT 'Privilege level',
  `locked` tinyint(1) NOT NULL COMMENT 'True if locked out',
  `lockReason` enum('none','incomplete','resigned','moderated') NOT NULL COMMENT 'Why locked out',
  `created` datetime NOT NULL COMMENT 'Record created',
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record updated'
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COMMENT='Valid DoubleDate users and administrators.';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `userLevel`, `locked`, `lockReason`, `created`, `modified`) VALUES
(1, 'dan.riches', '090a512b2a11ed98ce466a8d7260c4b4e003b775', 'Dan Riches', 'driches@ymail.com', 'administrator', 0, 'none', '2016-11-22 14:48:12', '2016-11-22 23:41:08'),
(2, 'junie.hyun', 'c297a1a5d47715d15607a776757e32feee851f0e', 'Junie Hyun', 'juniehyun@gmail.com', 'administrator', 0, 'none', '2016-11-22 14:49:45', '2016-11-23 03:49:59'),
(3, 'wade.wooldridge', '8089cfc55657a56803a06619de8d9783081a1ba0', 'Wade Wooldridge', 'waderwooldridge@gmail.com', 'administrator', 0, 'none', '2016-11-22 14:50:42', '2016-11-22 23:41:08'),
(4, 'moderator63', 'c8156e735c6732221885e3b849447f9676f95d61', 'Neville Chamberlain', 'appeaser@gmail.com', 'moderator', 0, 'none', '2016-11-22 14:51:22', '2016-11-22 22:51:22'),
(5, 'DD123456', '98a16c09b0759e63ef7df53592724e8eeddb953a', 'Earl and Joyce Wooldridge', 'earl_and_joyce@gmail.com', 'normal', 0, 'none', '2016-11-22 14:52:18', '2016-11-22 22:52:18'),
(6, 'DD987654', '568f9d0dd83109d84f54e67e3fbc5e8170bb0c40', 'Bob and Leslie Hahn', 'bob_and_leslie@gmail.com', 'normal', 0, 'none', '2016-11-22 14:52:54', '2016-11-22 22:52:54'),
(7, 'DD100161', '76e56a88aadf8aa7109d770e4d391a6e64d7f5e8', 'Barack and Michelle Obama', 'president@whitehouse.gov', 'normal', 0, 'none', '2016-11-23 11:14:41', '2016-11-23 19:14:41'),
(8, 'DD100184', 'ac10b5cce6c30ba92a75ddc9a382b43ba3b929e4', 'Dan and Diane Pelletier', 'dan@gmail.com', 'normal', 0, 'none', '2016-11-23 11:16:58', '2016-11-23 19:16:58'),
(9, 'DD100207', 'd1794e362f124e2e4ac35eee54262122a8f326f6', 'Ricky and Lucy Arnaz', 'ricky.ricardo@mgm.com', 'normal', 0, 'none', '2016-11-23 13:45:09', '2016-11-23 21:45:09'),
(10, 'DD100230', '483a64fa956ad1c848328c52f15dcc0bce1ca232', 'Bob and Carol', 'xxx@xxx', 'normal', 0, 'none', '2016-11-23 15:47:04', '2016-11-23 23:47:04'),
(11, 'DD100253', 'cf60cd2d12b30664050eeed09f642062d7efcf7b', 'Doug and Diana Lithgow', 'doug@ibm.com', 'normal', 0, 'none', '2016-11-24 08:12:56', '2016-11-24 16:12:56'),
(12, 'DD100276', '9da7a552a3c2c925b1d6c21aa9ccfd0537587ba1', 'Rick Dale and Karyn Allen', 'rick@oc.gov', 'normal', 0, 'none', '2016-11-24 08:18:20', '2016-11-24 16:18:20'),
(13, 'DD100299', '9da7a552a3c2c925b1d6c21aa9ccfd0537587ba1', 'Rick Dale and Karyn Allen', 'rick@oc.gov', 'normal', 0, 'none', '2016-11-24 08:19:28', '2016-11-24 16:19:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'User ID',AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
