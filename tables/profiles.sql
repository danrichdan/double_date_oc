-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Nov 28, 2016 at 10:44 PM
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
-- Table structure for table `profiles`
--

CREATE TABLE IF NOT EXISTS `profiles` (
  `id` bigint(20) NOT NULL COMMENT 'Profile ID',
  `username` varchar(20) NOT NULL COMMENT 'Matches user table',
  `pictureLink` varchar(128) NOT NULL COMMENT 'Link to profile picture',
  `paragraph` varchar(256) NOT NULL COMMENT 'Self-description',
  `zipcode` int(11) NOT NULL COMMENT 'ZIP code',
  `city` varchar(32) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `distanceMax` tinyint(4) NOT NULL COMMENT 'Max miles to match',
  `ourAgeMin` tinyint(4) NOT NULL COMMENT 'Our age range',
  `ourAgeMax` tinyint(4) NOT NULL COMMENT 'Our age range',
  `theirAgeMin` tinyint(4) NOT NULL COMMENT 'Match age range',
  `theirAgeMax` tinyint(4) NOT NULL COMMENT 'Match age range',
  `boardGames` tinyint(1) NOT NULL,
  `cardGames` tinyint(1) NOT NULL,
  `cooking` tinyint(1) NOT NULL,
  `conversation` tinyint(1) NOT NULL,
  `artGalleries` tinyint(1) NOT NULL,
  `comedy` tinyint(1) NOT NULL,
  `classicalConcerts` tinyint(1) NOT NULL,
  `popularConcerts` tinyint(1) NOT NULL,
  `ballroomDancing` tinyint(1) NOT NULL,
  `countryDancing` tinyint(1) NOT NULL,
  `salsaDancing` tinyint(1) NOT NULL,
  `casualDining` tinyint(1) NOT NULL,
  `fineDining` tinyint(1) NOT NULL,
  `karaoke` tinyint(1) NOT NULL,
  `liveTheater` tinyint(1) NOT NULL,
  `movies` tinyint(1) NOT NULL,
  `wineTasting` tinyint(1) NOT NULL,
  `bicycling` tinyint(1) NOT NULL,
  `bowling` tinyint(1) NOT NULL,
  `golf` tinyint(1) NOT NULL,
  `hiking` tinyint(1) NOT NULL,
  `horsebackRiding` tinyint(1) NOT NULL,
  `kayaking` tinyint(1) NOT NULL,
  `motorcycling` tinyint(1) NOT NULL,
  `racquetball` tinyint(1) NOT NULL,
  `tennis` tinyint(1) NOT NULL,
  `walking` tinyint(1) NOT NULL,
  `camping` tinyint(1) NOT NULL,
  `rving` tinyint(1) NOT NULL,
  `domesticTravel` tinyint(1) NOT NULL,
  `foreignTravel` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COMMENT='Profiles of user data, filters, and interests.';

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `username`, `pictureLink`, `paragraph`, `zipcode`, `city`, `latitude`, `longitude`, `distanceMax`, `ourAgeMin`, `ourAgeMax`, `theirAgeMin`, `theirAgeMax`, `boardGames`, `cardGames`, `cooking`, `conversation`, `artGalleries`, `comedy`, `classicalConcerts`, `popularConcerts`, `ballroomDancing`, `countryDancing`, `salsaDancing`, `casualDining`, `fineDining`, `karaoke`, `liveTheater`, `movies`, `wineTasting`, `bicycling`, `bowling`, `golf`, `hiking`, `horsebackRiding`, `kayaking`, `motorcycling`, `racquetball`, `tennis`, `walking`, `camping`, `rving`, `domesticTravel`, `foreignTravel`) VALUES
(1, 'DD123456', 'http://www.imgur.com/123456', 'We like horsies, too.', 92704, 'SANTA ANA', 33.71, -117.9, 8, 57, 58, 45, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2, 'DD999999', 'http://www.picture.com/999999', 'Look at the trees.', 92656, 'ALISO VIEJO', 33.57, -117.72, 4, 26, 35, 24, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(3, 'DD666666', 'http://www.starward.com', 'We like beaches.', 92708, 'FOUNTAIN VALLEY', 33.71, -117.94, 6, 60, 61, 55, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(4, 'DD777777', 'http://www.starward.com', 'We like beaches.', 92708, 'FOUNTAIN VALLEY', 33.71, -117.94, 6, 60, 61, 55, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(5, 'DD888888', 'http://www.snapchat.com/888888', 'We wish we were in the land of cotton...', 92618, 'IRVINE', 33.67, -117.73, 5, 44, 45, 34, 55, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(6, 'DD123457', 'http://www.imgur.com/123456', 'We like horsies, too.', 92704, 'SANTA ANA', 33.71, -117.9, 8, 57, 58, 45, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(7, 'DD123457', 'http://www.imgur.com/123456', 'We like horsies, too.', 92704, 'SANTA ANA', 33.71, -117.9, 8, 57, 58, 45, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(8, 'DD123458', 'http://www.imgur.com/123456', 'We like horsies, too.', 92704, 'SANTA ANA', 33.71, -117.9, 8, 56, 59, 44, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(9, 'DD123460', 'http://www.imgur.com/123456', 'We like horsies, too.', 92704, 'SANTA ANA', 33.71, -117.9, 8, 56, 59, 44, 60, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1),
(10, 'DD123470', 'http://www.imgur.com/123456', 'We like horsies, too.', 92704, 'SANTA ANA', 33.71, -117.9, 10, 56, 59, 44, 60, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0),
(11, 'DD123480', 'http://', 'We like unicorns.', 92656, 'ALISO VIEJO', 33.57, -117.72, 1, 5, 6, 4, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(12, 'DD555550', 'Http://', 'Look at the sky.', 92708, 'FOUNTAIN VALLEY', 33.71, -117.94, 5, 8, 9, 7, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(13, 'DD123490', 'http://www.imgur.com/123456', 'We like horsies, too.', 92704, 'SANTA ANA', 33.71, -117.9, 10, 56, 59, 42, 62, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Profile ID',AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
