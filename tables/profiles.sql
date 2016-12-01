-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Dec 01, 2016 at 10:58 PM
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
  `latitude` double(10,6) NOT NULL,
  `longitude` double(10,6) NOT NULL,
  `distanceMax` tinyint(4) NOT NULL COMMENT 'Max miles to match',
  `ourAgeMin` tinyint(4) NOT NULL COMMENT 'Our age range',
  `ourAgeMax` tinyint(4) NOT NULL COMMENT 'Our age range',
  `theirAgeMin` tinyint(4) NOT NULL COMMENT 'Match age range',
  `theirAgeMax` tinyint(4) NOT NULL COMMENT 'Match age range',
  `boardGames` tinyint(1) NOT NULL,
  `cardGames` tinyint(1) NOT NULL,
  `cooking` tinyint(1) NOT NULL,
  `conversation` tinyint(1) NOT NULL,
  `crafts` tinyint(1) NOT NULL,
  `bookClub` tinyint(1) NOT NULL,
  `movieNight` tinyint(1) NOT NULL,
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
  `travelAbroad` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COMMENT='Profiles of user data, filters, and interests.';

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `username`, `pictureLink`, `paragraph`, `zipcode`, `city`, `latitude`, `longitude`, `distanceMax`, `ourAgeMin`, `ourAgeMax`, `theirAgeMin`, `theirAgeMax`, `boardGames`, `cardGames`, `cooking`, `conversation`, `crafts`, `bookClub`, `movieNight`, `artGalleries`, `comedy`, `classicalConcerts`, `popularConcerts`, `ballroomDancing`, `countryDancing`, `salsaDancing`, `casualDining`, `fineDining`, `karaoke`, `liveTheater`, `movies`, `wineTasting`, `bicycling`, `bowling`, `golf`, `hiking`, `horsebackRiding`, `kayaking`, `motorcycling`, `racquetball`, `tennis`, `walking`, `camping`, `rving`, `domesticTravel`, `travelAbroad`) VALUES
(1, 'DD123456', 'uploads/a16070c333d107dc4c12ede63fda763517748b2f', 'We like horsies, too.', 92708, 'FOUNTAIN VALLEY', 33.710000, -117.940000, 8, 57, 58, 45, 65, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2, 'DD100138', 'uploads/2df88f6f879d7821f4979bedf95816a51b1a2d80', 'Looking for some down-home company and enjoyable card games.', 92618, 'IRVINE', 33.670000, -117.730000, 10, 30, 32, 25, 45, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0),
(3, 'DD100161', 'uploads/1f087b0044e500ab648c15c6f179976a20b2f64d', 'We love to go out for karaoke, and then a fine evening of tennis and fine dining.', 92708, 'FOUNTAIN VALLEY', 33.710000, -117.940000, 15, 20, 21, 18, 35, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1),
(4, 'DD100184', 'uploads/8cf84c7d3675fff6df96fb25e868a4dced323485', 'Just about to retire, and looking for what kinds of things we might do with the common people.', 92673, 'SAN CLEMENTE', 33.480000, -117.610000, 20, 55, 58, 45, 70, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0),
(5, 'DD100207', 'uploads/24eeaf697505b8d7dcbf2e61de3ed0f516179294', 'We&#39;re just two regular guys who like doing regular guy stuff, like horseback riding and kayaking.', 90716, 'HAWAIIAN GARDENS', 33.830000, -118.070000, 12, 35, 37, 30, 50, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0),
(6, 'DD100230', 'uploads/1bfa14a8fe05c01893ca218ae00da43be2c1a89a', 'Love meeting new and interesting kinds of people, especially from other planets. Looking for outdoor activities.', 92647, 'HUNTINGTON BEACH', 33.720000, -118.000000, 40, 35, 38, 25, 49, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1),
(7, 'DD100253', 'uploads/29923eddff62ae2db1da7b652c980fc6af2cd246', 'A kiss is just a kiss, but baby, we&#39;re looking for good food and stimulating conversation.', 92626, 'COSTA MESA', 33.670000, -117.900000, 24, 47, 50, 40, 62, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1),
(8, 'DD100276', 'uploads/635d56d961e839643df671976a8a264ad145cf07', 'Ricky works long hours as a bandleader, and Lucy tends the home. When we have an evening, we like to mainly stay indoors.', 92807, 'ANAHEIM', 33.850000, -117.790000, 30, 40, 42, 30, 50, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0),
(9, 'DD100299', 'uploads/9703f0f6a3ec53f62f6e2fcb40fe39c14181c85f', 'We&#39;re just two crazy gals who love doing things together, the wilder the better.', 92782, 'TUSTIN', 33.750000, -117.770000, 5, 40, 42, 30, 45, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1),
(10, 'DD100322', 'uploads/3731e7b8e2f74b4c23173db1001abae2994a05c8', 'People say we look like celebrities, but we are just down-home types who love cooking at home and traveling the world in our private jet.', 92704, 'SANTA ANA', 33.710000, -117.900000, 15, 38, 39, 30, 55, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1),
(11, 'DD100345', 'uploads/fbb691497e0409ca33a178db2e3394abf98ff7d0', 'Love all activities except karrry-oke.', 92630, 'LAKE FOREST', 33.640000, -117.670000, 22, 28, 30, 22, 45, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0),
(12, 'DD100368', 'uploads/d16b9aeb2ec98c517eb8c19f9b1b318a85016cd2', 'Love stimulating conversation about anything except religion. Open to expanded our potential as beings on this limited planet.', 92653, 'LAGUNA HILLS', 33.600000, -117.710000, 50, 47, 53, 45, 60, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1),
(13, 'DD100391', 'uploads/49073a7a5e20cc42bf6429e9d9de323238990f1e', 'We&#39;ve just moved to the states from Britain, and we&#39;re looking to find some new peeps to hang with and do fun stuff.', 92867, 'ORANGE', 33.810000, -117.790000, 30, 42, 44, 30, 50, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0),
(14, 'DD100414', 'uploads/ba9980c0341aaf2e2886941b5a068a04af602a43', 'We&#39;re love camping and fishing and hunting, especially field-dressing a freshly-killed buck.', 92607, 'LAGUNA NIGUEL', 33.520000, -117.700000, 25, 24, 25, 18, 40, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0),
(15, 'DD100437', 'uploads/565187e655ef07aeffb2ee3b8bf8c3719ff7016f', 'We know we&#39;re young and immature, and we want to see how the older generation parties.', 92694, 'LADERA RANCH', 33.560000, -117.630000, 15, 18, 19, 18, 35, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'Profile ID',AUTO_INCREMENT=16;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
