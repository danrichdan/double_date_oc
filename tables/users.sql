-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Dec 11, 2016 at 05:15 PM
-- Server version: 5.5.49-log
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doubledateoc`
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
  `failedLogins` int(11) NOT NULL COMMENT 'Failed login count.',
  `locked` tinyint(1) NOT NULL COMMENT 'True if locked out',
  `lockReason` enum('none','incomplete','resigned','moderated','failedlogins') NOT NULL COMMENT 'Why locked out',
  `created` datetime NOT NULL COMMENT 'Record created',
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record updated'
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1 COMMENT='Valid DoubleDate users and administrators.';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `userLevel`, `failedLogins`, `locked`, `lockReason`, `created`, `modified`) VALUES
(1, 'dan.riches', '090a512b2a11ed98ce466a8d7260c4b4e003b775', 'Dan Riches', 'driches@ymail.com', 'administrator', 0, 0, 'none', '2016-11-22 14:48:12', '2016-11-22 23:41:08'),
(2, 'junie.hyun', 'c297a1a5d47715d15607a776757e32feee851f0e', 'Junie Hyun', 'juniehyun@gmail.com', 'administrator', 0, 0, 'none', '2016-11-22 14:49:45', '2016-11-23 03:49:59'),
(3, 'wade.wooldridge', '8089cfc55657a56803a06619de8d9783081a1ba0', 'Wade Wooldridge', 'waderwooldridge@gmail.com', 'administrator', 0, 0, 'none', '2016-11-22 14:50:42', '2016-11-22 23:41:08'),
(4, 'moderator63', 'ba0cce1eea8cfb0e854750b841517b8ac261ec08', 'Neville Chamberlain', 'appeaser@gmail.com', 'moderator', 0, 0, 'none', '2016-11-22 14:51:22', '2016-12-10 01:34:26'),
(5, 'DD123456', '98a16c09b0759e63ef7df53592724e8eeddb953a', 'Earl and Joyce Wooldridge', 'earl_and_joyce@gmail.com', 'normal', 0, 0, 'none', '2016-11-22 14:52:18', '2016-11-22 22:52:18'),
(6, 'DD100138', '89752435b5db3bf6b7630bf310726530be46c58b', 'Justin and Jessica', 'jandj@gmail.com', 'normal', 0, 0, 'none', '2016-12-01 14:20:13', '2016-12-01 22:20:13'),
(7, 'DD100161', '2f62f3c96d4592ec425d857fc099087c37557511', 'Donny and Marie', 'osmonds@osmondsfamily.com', 'normal', 0, 0, 'none', '2016-12-01 14:24:05', '2016-12-01 22:24:05'),
(8, 'DD100184', 'dd65009d551d3b346ff1ff7c7878c53e6610ac23', 'Barack and Michelle', 'president@whitehouse.guv', 'normal', 0, 0, 'none', '2016-12-01 14:27:44', '2016-12-01 22:27:44'),
(9, 'DD100207', '63ae2d4e7eb4832048f2c393a64a76a48c155516', 'Bert and Ernie', 'the_guys@sesamestreet.org', 'normal', 0, 0, 'none', '2016-12-01 14:30:02', '2016-12-01 22:30:02'),
(10, 'DD100230', 'ecbbba077ff754e97278ae22cdb84e21a1a36171', 'Han and Leia', 'waderwooldridge@gmail.com', 'normal', 0, 0, 'none', '2016-12-01 14:33:28', '2016-12-09 00:07:52'),
(11, 'DD100253', '9b7f52378335107adcdc4235f419b1d6dc3ff12a', 'Humphrey and Lauren', 'akissisjustakiss@hollywood.net', 'normal', 0, 0, 'none', '2016-12-01 14:36:27', '2016-12-01 22:36:27'),
(12, 'DD100276', '3becfe229860c5cecc0cf246f98538ccfce99c2d', 'Ricky and Lucy', 'ilovelucy@gmail.com', 'normal', 0, 0, 'none', '2016-12-01 14:38:42', '2016-12-01 22:38:42'),
(13, 'DD100299', 'cd5a34466271e73c2ee9eae32320c3e68ae2335c', 'Thelma and Louise', 'wildandcrazygals@gmail.com', 'normal', 0, 0, 'none', '2016-12-01 14:41:07', '2016-12-01 22:41:07'),
(14, 'DD100322', '140ce6a56d735d73d0e90f149bd09c43b15ac2c9', 'Brad and Angelina', 'waderwooldridge@gmail.com', 'normal', 0, 0, 'none', '2016-12-01 14:43:13', '2016-12-09 00:07:25'),
(15, 'DD100345', '6b25ecfa6b4258213b02ac39f117bada90a1af57', 'Jay-Z and Beyonce', 'perfectcouple@farmersonly.com', 'normal', 0, 0, 'none', '2016-12-01 14:45:43', '2016-12-01 22:45:43'),
(16, 'DD100368', 'cf03e66c4d3d16031d814431b06536adee9cb685', 'John and Kelly', 'welovedachsunds@gmail.com', 'normal', 0, 0, 'none', '2016-12-01 14:48:05', '2016-12-01 22:48:05'),
(17, 'DD100391', '8d6364ea252f75981935368cbf8578c90cce0482', 'David and Victoria', 'perfectsmile@gmail.com', 'normal', 0, 0, 'none', '2016-12-01 14:50:37', '2016-12-01 22:50:37'),
(18, 'DD100414', '9ae406135e0eaf8f306171d7d07113b4bdeb2982', 'Stephen and Anna', 'barelylegal@fox.com', 'normal', 0, 0, 'none', '2016-12-01 14:53:11', '2016-12-01 22:53:11'),
(19, 'DD100437', '0f526124d9c0e976cbf9d963b7d30ed5af1dc21f', 'Austin and Vanessa', 'newlove@gmail.com', 'normal', 0, 0, 'none', '2016-12-01 14:55:42', '2016-12-01 22:55:42');

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'User ID',AUTO_INCREMENT=20;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
