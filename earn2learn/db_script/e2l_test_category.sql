-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu1
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jul 20, 2016 at 10:31 AM
-- Server version: 5.7.12-0ubuntu1
-- PHP Version: 7.0.4-7ubuntu2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e2l_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `parent_cat_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `parent_cat_id`, `user_id`, `enable`, `created_at`, `updated_at`) VALUES
(1, 'Science', 0, 1, 1, '2016-04-03 07:39:14', '2016-04-03 07:39:14'),
(2, 'Science (General)', 1, 1, 1, '2016-04-03 07:39:14', '2016-04-03 07:39:14'),
(3, 'Physics', 1, 1, 1, '2016-04-03 07:40:11', '2016-04-03 07:40:11'),
(4, 'Mathematics', 0, 1, 1, '2016-04-03 15:52:03', '2016-04-03 15:52:03'),
(5, 'Mathematics (General)', 4, 1, 1, '2016-04-03 15:52:03', '2016-04-03 15:52:03'),
(6, 'Algebra', 4, 1, 1, '2016-04-03 15:52:25', '2016-04-03 15:52:25'),
(7, 'History', 0, 1, 0, '2016-04-04 01:37:07', '2016-04-04 19:41:56'),
(8, 'History (General)', 7, 1, 1, '2016-04-04 01:37:07', '2016-04-04 19:29:13'),
(9, 'Kindness', 0, 1, 1, '2016-04-04 18:09:08', '2016-04-04 18:09:08'),
(10, 'Kindness (General)', 9, 1, 1, '2016-04-04 18:09:08', '2016-04-04 18:09:08'),
(11, 'Sharing', 9, 1, 1, '2016-04-04 19:13:10', '2016-04-04 19:13:10'),
(12, 'History', 0, 1, 1, '2016-04-04 20:16:40', '2016-04-04 20:16:40'),
(13, 'History (General)', 12, 1, 1, '2016-04-04 20:16:40', '2016-04-04 20:16:40'),
(14, 'US History', 12, 1, 1, '2016-04-04 20:17:58', '2016-04-04 20:17:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
