-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: May 27, 2016 at 11:11 AM
-- Server version: 10.1.14-MariaDB
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wsolusco_e2learn`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `answers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `answer` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `question_id` int(11) NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT '0',
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=63 ;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `answer`, `question_id`, `is_correct`, `enable`, `created_at`, `updated_at`) VALUES
(1, 'Answer 1', 1, 1, 1, '2016-04-04 02:13:54', '2016-04-04 02:13:54'),
(2, 'Answer 2', 1, 0, 1, '2016-04-04 02:13:54', '2016-04-04 02:13:54'),
(3, 'Answer 3', 1, 0, 1, '2016-04-04 02:13:54', '2016-04-04 02:13:54'),
(4, 'Answer 4', 1, 0, 1, '2016-04-04 02:13:54', '2016-04-04 02:13:54'),
(5, 'TRUE', 2, 1, 1, '2016-04-04 02:13:54', '2016-04-04 02:13:54'),
(6, 'FALSE', 2, 0, 1, '2016-04-04 02:13:54', '2016-04-04 02:13:54'),
(7, 'TRUE', 3, 1, 1, '2016-04-04 02:23:24', '2016-04-04 02:23:24'),
(8, 'FALSE', 3, 0, 1, '2016-04-04 02:23:24', '2016-04-04 02:23:24'),
(9, 'TRUE', 4, 1, 1, '2016-04-04 13:05:30', '2016-04-04 13:05:30'),
(10, 'FALSE', 4, 0, 1, '2016-04-04 13:05:30', '2016-04-04 13:05:30'),
(11, 'TRUE', 5, 1, 1, '2016-04-04 19:16:06', '2016-04-04 19:16:06'),
(12, 'FALSE', 5, 0, 1, '2016-04-04 19:16:06', '2016-04-04 19:16:06'),
(13, 'Blue', 6, 1, 1, '2016-04-04 19:16:06', '2016-04-04 19:16:06'),
(14, 'Red', 6, 0, 1, '2016-04-04 19:16:06', '2016-04-04 19:16:06'),
(15, 'Orange', 6, 0, 1, '2016-04-04 19:16:06', '2016-04-04 19:16:06'),
(16, 'Purple', 6, 0, 1, '2016-04-04 19:16:06', '2016-04-04 19:16:06'),
(17, 'TRUE', 7, 1, 1, '2016-04-04 19:16:06', '2016-04-04 19:16:06'),
(18, 'FALSE', 7, 0, 1, '2016-04-04 19:16:06', '2016-04-04 19:16:06'),
(19, 'TRUE', 8, 1, 1, '2016-04-04 19:21:45', '2016-04-04 19:21:45'),
(20, 'FALSE', 8, 0, 1, '2016-04-04 19:21:45', '2016-04-04 19:21:45'),
(21, 'Bear', 9, 1, 1, '2016-04-04 19:21:45', '2016-04-04 19:21:45'),
(22, 'Raccoon', 9, 0, 1, '2016-04-04 19:21:45', '2016-04-04 19:21:45'),
(23, 'Alligator', 9, 0, 1, '2016-04-04 19:21:45', '2016-04-04 19:21:45'),
(24, 'Bird', 9, 0, 1, '2016-04-04 19:21:45', '2016-04-04 19:21:45'),
(25, 'TRUE', 10, 1, 1, '2016-04-04 20:22:57', '2016-04-04 20:22:57'),
(26, 'FALSE', 10, 0, 1, '2016-04-04 20:22:57', '2016-04-04 20:22:57'),
(27, 'Bear', 11, 0, 1, '2016-04-04 20:22:57', '2016-04-04 20:22:57'),
(28, 'Buffalo', 11, 0, 1, '2016-04-04 20:22:57', '2016-04-04 20:22:57'),
(29, 'Turkey', 11, 1, 1, '2016-04-04 20:22:57', '2016-04-04 20:22:57'),
(30, 'Chicken', 11, 0, 1, '2016-04-04 20:22:57', '2016-04-04 20:22:57'),
(31, 'TRUE', 12, 1, 1, '2016-04-04 20:22:57', '2016-04-04 20:22:57'),
(32, 'FALSE', 12, 0, 1, '2016-04-04 20:22:57', '2016-04-04 20:22:57'),
(33, 'Good', 13, 1, 1, '2016-04-06 03:07:32', '2016-04-06 03:07:32'),
(34, 'Not so good.', 13, 0, 1, '2016-04-06 03:07:32', '2016-04-06 03:07:32'),
(35, 'TRUE', 14, 1, 1, '2016-04-06 03:07:32', '2016-04-06 03:07:32'),
(36, 'FALSE', 14, 0, 1, '2016-04-06 03:07:32', '2016-04-06 03:07:32'),
(37, 'TRUE', 15, 1, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(38, 'FALSE', 15, 0, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(39, 'doctor', 16, 0, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(40, 'teacher', 16, 0, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(41, 'young girl', 16, 0, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(42, 'construction worker', 16, 1, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(43, 'TRUE', 17, 1, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(44, 'FALSE', 17, 0, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(45, 'TRUE', 18, 1, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(46, 'FALSE', 18, 0, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(47, 'Greeting cards', 19, 0, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(48, 'Shopping carts', 19, 1, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(49, 'Golf carts', 19, 0, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(50, 'Tennis shoes', 19, 0, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(51, 'TRUE', 20, 1, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(52, 'FALSE', 20, 0, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(53, 'Insults', 21, 0, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(54, 'Encouragement', 21, 1, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(55, 'TRUE', 22, 1, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(56, 'FALSE', 22, 0, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(57, 'TRUE', 23, 1, 1, '2016-04-14 15:13:32', '2016-04-14 15:13:32'),
(58, 'FALSE', 23, 0, 1, '2016-04-14 15:13:32', '2016-04-14 15:13:32'),
(59, 'TRUE', 24, 1, 1, '2016-04-14 15:13:32', '2016-04-14 15:13:32'),
(60, 'FALSE', 24, 0, 1, '2016-04-14 15:13:32', '2016-04-14 15:13:32'),
(61, 'TRUE', 25, 0, 1, '2016-04-14 15:13:32', '2016-04-14 15:13:32'),
(62, 'FALSE', 25, 1, 1, '2016-04-14 15:13:32', '2016-04-14 15:13:32');

-- --------------------------------------------------------

--
-- Table structure for table `attempts`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `attempts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `house_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `allocation_id` int(11) NOT NULL,
  `total_qus` int(11) NOT NULL DEFAULT '0',
  `correct_ans` int(11) NOT NULL DEFAULT '0',
  `score_percentage` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: started, 1: skipped, 2: finished',
  `is_passed` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0:fail 1:pass',
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=13 ;

--
-- Dumping data for table `attempts`
--

INSERT INTO `attempts` (`id`, `house_id`, `quiz_id`, `allocation_id`, `total_qus`, `correct_ans`, `score_percentage`, `status`, `is_passed`, `enable`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 2, 2, 0, 0, 2, 0, 1, '2016-04-04 02:20:01', '2016-04-04 02:20:30'),
(2, 2, 1, 2, 2, 2, 100, 2, 1, 1, '2016-04-04 02:20:37', '2016-04-04 02:20:49'),
(3, 1, 3, 4, 1, 0, 0, 2, 0, 1, '2016-04-04 03:58:43', '2016-04-04 03:59:01'),
(4, 1, 3, 4, 1, 1, 100, 2, 1, 1, '2016-04-04 04:00:18', '2016-04-04 04:00:27'),
(5, 2, 4, 6, 2, 2, 100, 2, 1, 1, '2016-04-04 13:45:18', '2016-04-04 14:44:00'),
(6, 3, 5, 8, 2, 0, 0, 2, 0, 1, '2016-04-04 16:53:12', '2016-04-04 16:53:29'),
(7, 3, 5, 8, 2, 2, 100, 2, 1, 1, '2016-04-04 16:53:35', '2016-04-04 16:53:45'),
(8, 5, 7, 10, 3, 3, 100, 2, 1, 1, '2016-04-04 21:00:18', '2016-04-04 21:13:04'),
(9, 5, 6, 9, 2, 2, 100, 2, 1, 1, '2016-04-04 21:24:42', '2016-04-04 21:24:56'),
(10, 5, 8, 11, 3, 3, 100, 2, 1, 1, '2016-04-06 02:32:28', '2016-04-06 02:33:07'),
(11, 5, 9, 12, 2, 0, 0, 2, 0, 1, '2016-04-06 03:08:49', '2016-04-06 03:11:53'),
(12, 5, 9, 12, 2, 1, 50, 2, 1, 1, '2016-04-06 03:12:16', '2016-04-06 03:12:26');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `parent_cat_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=15 ;

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

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `certificates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `certificate_id` varchar(255) NOT NULL,
  `child_id` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `issue_date` datetime NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `certificates`
--

INSERT INTO `certificates` (`id`, `certificate_id`, `child_id`, `house_id`, `category_id`, `issue_date`, `enable`, `created_at`, `updated_at`) VALUES
(1, 'E2L/CRT/H2C9CT7/1459736449', 9, 2, 7, '2016-04-04 02:20:49', 1, '2016-04-04 02:20:49', '2016-04-04 02:20:49'),
(2, 'E2L/CRT/H1C3CT4/1459742427', 3, 1, 4, '2016-04-04 04:00:27', 1, '2016-04-04 04:00:27', '2016-04-04 04:00:27'),
(3, 'E2L/CRT/H2C9CT4/1459781040', 9, 2, 4, '2016-04-04 14:44:00', 1, '2016-04-04 14:44:00', '2016-04-04 14:44:00'),
(4, 'E2L/CRT/H3C10CT7/1459788825', 10, 3, 7, '2016-04-04 16:53:45', 1, '2016-04-04 16:53:45', '2016-04-04 16:53:45'),
(5, 'E2L/CRT/H5C13CT9/1459804384', 13, 5, 9, '2016-04-04 21:13:04', 1, '2016-04-04 21:13:04', '2016-04-04 21:13:04'),
(6, 'E2L/CRT/H5C13CT9/1459805096', 13, 5, 9, '2016-04-04 21:24:56', 1, '2016-04-04 21:24:56', '2016-04-04 21:24:56'),
(7, 'E2L/CRT/H5C13CT12/1459909987', 13, 5, 12, '2016-04-06 02:33:07', 1, '2016-04-06 02:33:07', '2016-04-06 02:33:07'),
(8, 'E2L/CRT/H5C13CT4/1459912346', 13, 5, 4, '2016-04-06 03:12:26', 1, '2016-04-06 03:12:26', '2016-04-06 03:12:26');

-- --------------------------------------------------------

--
-- Table structure for table `childgiftcards`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `childgiftcards` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `housecard_id` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `child_id` int(11) NOT NULL,
  `is_approved` tinyint(1) NOT NULL COMMENT '0: pending, 1: approved, 2: rejected',
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

--
-- Dumping data for table `childgiftcards`
--

INSERT INTO `childgiftcards` (`id`, `housecard_id`, `house_id`, `child_id`, `is_approved`, `enable`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 10, 1, 0, '2016-04-04 17:40:31', '2016-04-04 17:41:07'),
(2, 1, 3, 10, 1, 0, '2016-04-04 18:02:01', '2016-04-04 18:02:23'),
(3, 2, 3, 10, 1, 0, '2016-04-04 18:02:07', '2016-04-04 18:02:30'),
(4, 2, 3, 10, 1, 0, '2016-04-04 18:06:05', '2016-04-04 18:06:20'),
(5, 1, 3, 10, 1, 0, '2016-04-04 18:07:45', '2016-04-04 18:08:01'),
(6, 3, 3, 10, 0, 1, '2016-04-04 18:12:30', '2016-04-04 18:12:30'),
(7, 1, 3, 10, 1, 0, '2016-04-04 18:13:14', '2016-04-04 18:13:33'),
(8, 6, 5, 13, 1, 0, '2016-04-06 02:22:04', '2016-04-06 02:25:57'),
(9, 7, 2, 9, 0, 1, '2016-04-19 04:38:07', '2016-04-19 04:38:07');

-- --------------------------------------------------------

--
-- Table structure for table `childhouses`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `childhouses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `house_id` int(11) NOT NULL,
  `child_id` int(11) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

--
-- Dumping data for table `childhouses`
--

INSERT INTO `childhouses` (`id`, `house_id`, `child_id`, `enable`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 1, '2016-04-03 01:29:52', '2016-04-03 01:29:52'),
(2, 2, 5, 1, '2016-04-03 02:46:06', '2016-04-03 02:46:06'),
(3, 4, 8, 1, '2016-04-03 17:54:56', '2016-04-03 17:54:56'),
(4, 2, 9, 1, '2016-04-03 20:38:01', '2016-04-03 20:38:01'),
(5, 3, 10, 1, '2016-04-04 01:32:01', '2016-04-04 01:32:01'),
(6, 1, 11, 1, '2016-04-04 03:23:20', '2016-04-04 03:23:20'),
(7, 5, 13, 1, '2016-04-04 20:31:03', '2016-04-04 20:31:03'),
(8, 7, 16, 1, '2016-04-14 16:04:56', '2016-04-14 16:04:56'),
(9, 7, 17, 1, '2016-04-15 00:15:31', '2016-04-15 00:15:31');

-- --------------------------------------------------------

--
-- Table structure for table `childquizallocations`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `childquizallocations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `child_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: not started, 1: started, 2: skipped, 3: finished',
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=13 ;

--
-- Dumping data for table `childquizallocations`
--

INSERT INTO `childquizallocations` (`id`, `child_id`, `quiz_id`, `status`, `enable`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 3, 1, '2016-04-03 07:44:43', '2016-04-03 07:48:38'),
(2, 9, 1, 3, 1, '2016-04-04 02:18:56', '2016-04-04 02:20:49'),
(3, 5, 1, 0, 1, '2016-04-04 02:18:56', '2016-04-04 02:18:56'),
(4, 3, 3, 3, 1, '2016-04-04 03:58:01', '2016-04-04 04:00:27'),
(5, 11, 3, 0, 1, '2016-04-04 03:58:03', '2016-04-04 03:58:03'),
(6, 9, 4, 3, 1, '2016-04-04 13:19:47', '2016-04-04 14:44:00'),
(7, 5, 4, 0, 1, '2016-04-04 13:19:48', '2016-04-04 13:19:48'),
(8, 10, 5, 3, 1, '2016-04-04 16:52:34', '2016-04-04 16:53:45'),
(9, 13, 6, 3, 1, '2016-04-04 20:40:08', '2016-04-04 21:24:56'),
(10, 13, 7, 3, 1, '2016-04-04 20:41:18', '2016-04-04 21:13:04'),
(11, 13, 8, 3, 1, '2016-04-06 02:31:58', '2016-04-06 02:33:07'),
(12, 13, 9, 3, 1, '2016-04-06 03:08:15', '2016-04-06 03:12:26');

-- --------------------------------------------------------

--
-- Table structure for table `homegiftcards`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `homegiftcards` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `card_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `child_id` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

--
-- Dumping data for table `homegiftcards`
--

INSERT INTO `homegiftcards` (`id`, `card_id`, `child_id`, `house_id`, `points`, `enable`, `created_at`, `updated_at`) VALUES
(1, 'amazoncom', 10, 3, 5, 1, '2016-04-04 17:40:10', '2016-04-04 17:40:10'),
(2, 'gap', 10, 3, 15, 1, '2016-04-04 18:00:45', '2016-04-04 18:00:45'),
(3, 'kohls_physical', 10, 3, 10, 1, '2016-04-04 18:11:48', '2016-04-04 18:11:48'),
(4, 'nike', 13, 5, 15, 1, '2016-04-04 20:33:13', '2016-04-04 20:33:13'),
(5, 'gap', 13, 5, 15, 1, '2016-04-04 20:47:35', '2016-04-04 20:47:35'),
(6, 'amazoncom', 13, 5, 5, 1, '2016-04-04 20:47:47', '2016-04-04 20:47:47'),
(7, 'nike', 9, 2, 10, 1, '2016-04-06 06:48:36', '2016-04-06 06:48:36'),
(8, 'amazoncom', 5, 2, 25, 0, '2016-04-06 06:49:40', '2016-04-06 11:02:26'),
(9, 'amazoncom', 5, 2, 10, 1, '2016-04-07 18:34:47', '2016-04-07 18:34:47');

-- --------------------------------------------------------

--
-- Table structure for table `house`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `house` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'default-house.jpg',
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

--
-- Dumping data for table `house`
--

INSERT INTO `house` (`id`, `name`, `description`, `user_id`, `image`, `enable`, `created_at`, `updated_at`) VALUES
(1, 'Morgan', NULL, 2, 'default-house.jpg', 1, '2016-04-03 01:20:26', '2016-04-03 01:20:26'),
(2, 'chaminda71''s house', NULL, 4, 'default-house.jpg', 1, '2016-04-03 02:45:10', '2016-04-03 02:45:10'),
(3, 'pgishantha.fit''s house', NULL, 6, 'default-house.jpg', 1, '2016-04-03 14:58:58', '2016-04-03 14:58:58'),
(4, 'ghgunasekara''s house', NULL, 7, 'default-house.jpg', 1, '2016-04-03 17:54:17', '2016-04-03 17:54:17'),
(5, 'jhm1982''s house', NULL, 12, 'house_5.jpg', 1, '2016-04-04 20:02:46', '2016-04-04 20:30:04'),
(6, 'Budweiser', NULL, 14, 'default-house.jpg', 1, '2016-04-06 02:38:06', '2016-04-06 02:38:06'),
(7, 'jkatz''s house', NULL, 15, 'default-house.jpg', 1, '2016-04-14 16:02:43', '2016-04-14 16:02:43'),
(8, 'upekagalgewala''s house', NULL, 18, 'default-house.jpg', 1, '2016-04-16 15:42:20', '2016-04-16 15:42:20'),
(9, 'kkk', NULL, 19, 'default-house.jpg', 1, '2016-05-13 23:47:43', '2016-05-13 23:47:43');

-- --------------------------------------------------------

--
-- Table structure for table `mailsubscriptions`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `mailsubscriptions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `payment` tinyint(1) NOT NULL DEFAULT '1',
  `giftcard` tinyint(1) NOT NULL DEFAULT '1',
  `lesson` tinyint(1) NOT NULL DEFAULT '1',
  `task` tinyint(1) NOT NULL DEFAULT '1',
  `newsletter` tinyint(1) NOT NULL DEFAULT '1',
  `enable` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

--
-- Dumping data for table `mailsubscriptions`
--

INSERT INTO `mailsubscriptions` (`id`, `user_id`, `payment`, `giftcard`, `lesson`, `task`, `newsletter`, `enable`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 1, 1, 1, 0, 1, '2016-04-03 01:20:26', '2016-04-12 00:56:08'),
(2, 4, 1, 1, 1, 1, 1, 1, '2016-04-03 02:45:10', '2016-04-03 02:45:10'),
(3, 6, 0, 0, 0, 0, 0, 1, '2016-04-03 14:58:58', '2016-04-22 01:42:20'),
(4, 7, 1, 1, 1, 1, 1, 1, '2016-04-03 17:54:17', '2016-04-03 17:54:17'),
(5, 12, 1, 1, 1, 1, 0, 1, '2016-04-04 20:02:46', '2016-04-12 00:56:31'),
(6, 14, 1, 1, 1, 1, 1, 1, '2016-04-06 02:38:06', '2016-04-06 02:38:06'),
(7, 15, 1, 1, 1, 1, 1, 1, '2016-04-14 16:02:43', '2016-04-14 16:02:43'),
(8, 18, 1, 1, 1, 1, 1, 1, '2016-04-16 15:42:20', '2016-04-16 15:42:20'),
(9, 19, 1, 1, 1, 1, 1, 1, '2016-05-13 23:47:43', '2016-05-13 23:47:43');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `expiry` datetime NOT NULL,
  `enable` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `expiry`, `enable`, `created_at`, `updated_at`) VALUES
('johnhmorgan@gmail.com', 'tBvJlMdQX2Tfz7obkiZjAcpwUVsg0P8HGYDSOarxL3R1Eym54KNWFun6Ch9eIq', '2016-04-19 00:57:02', 1, '2016-04-12 00:57:02', '2016-04-12 00:57:02');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `payments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL COMMENT 'by cents',
  `currency` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'usd',
  `charge_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'stripe charge id',
  `refund_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'stripe refund id',
  `source` mediumtext COLLATE utf8_unicode_ci NOT NULL COMMENT 'stripe payment source summary',
  `ref_id` int(11) NOT NULL COMMENT 'like: child-giftcard id',
  `type` tinyint(1) NOT NULL COMMENT '1: gift card payment / 2: monthly payment',
  `status` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'payment status: succeeded, pending, or failed',
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `payments_charge_id_unique` (`charge_id`),
  UNIQUE KEY `payments_refund_id_unique` (`refund_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=12 ;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `user_id`, `amount`, `currency`, `charge_id`, `refund_id`, `source`, `ref_id`, `type`, `status`, `enable`, `created_at`, `updated_at`) VALUES
(1, 6, 500, 'usd', 'ch_17walwKmhlhEiTCUUBGXGvv5', 'txn_17walwKmhlhEiTCU45lvHk2B', 'Stripe\\Card JSON: {\n    "id": "card_17waluKmhlhEiTCUvWuDiwL9",\n    "object": "card",\n    "address_city": null,\n    "address_country": null,\n    "address_line1": null,\n    "address_line1_check": null,\n    "address_line2": null,\n    "address_state": null,\n    "address_zip": null,\n    "address_zip_check": null,\n    "brand": "American Express",\n    "country": "US",\n    "customer": "cus_8D0nuZOCDc5aAK",\n    "cvc_check": "pass",\n    "dynamic_last4": null,\n    "exp_month": 3,\n    "exp_year": 2022,\n    "fingerprint": "SrqQnzX3gTCTl8fh",\n    "funding": "credit",\n    "last4": "0005",\n    "metadata": [],\n    "name": null,\n    "tokenization_method": null\n}', 0, 2, 'succeeded', 1, '2016-04-04 16:41:52', '2016-04-04 16:41:52'),
(2, 4, 1000, 'usd', 'ch_17wbFFKmhlhEiTCUiGpMrFig', 'txn_17wbFFKmhlhEiTCUl2tSuwIu', 'Stripe\\Card JSON: {\n    "id": "card_17wbFDKmhlhEiTCUHiPUdKCI",\n    "object": "card",\n    "address_city": null,\n    "address_country": null,\n    "address_line1": null,\n    "address_line1_check": null,\n    "address_line2": null,\n    "address_state": null,\n    "address_zip": null,\n    "address_zip_check": null,\n    "brand": "Visa",\n    "country": "US",\n    "customer": "cus_8D1HnLJi0kECcO",\n    "cvc_check": "pass",\n    "dynamic_last4": null,\n    "exp_month": 5,\n    "exp_year": 2018,\n    "fingerprint": "iVNL0nuDKe2sCEEM",\n    "funding": "credit",\n    "last4": "4242",\n    "metadata": [],\n    "name": null,\n    "tokenization_method": null\n}', 0, 2, 'succeeded', 1, '2016-04-04 17:12:09', '2016-04-04 17:12:09'),
(3, 6, 500, 'usd', 'ch_17wbhHKmhlhEiTCUHa4GzpoE', 'txn_17wbhHKmhlhEiTCUGPbuy66P', 'Stripe\\Card JSON: {\n    "id": "card_17wanKKmhlhEiTCUV1BQAd26",\n    "object": "card",\n    "address_city": null,\n    "address_country": null,\n    "address_line1": null,\n    "address_line1_check": null,\n    "address_line2": null,\n    "address_state": null,\n    "address_zip": null,\n    "address_zip_check": null,\n    "brand": "American Express",\n    "country": "US",\n    "customer": "cus_8D0nuZOCDc5aAK",\n    "cvc_check": null,\n    "dynamic_last4": null,\n    "exp_month": 1,\n    "exp_year": 2022,\n    "fingerprint": "euNwZFKcD4zVrpTA",\n    "funding": "credit",\n    "last4": "8431",\n    "metadata": [],\n    "name": null,\n    "tokenization_method": null\n}', 0, 1, 'succeeded', 1, '2016-04-04 17:41:07', '2016-04-04 17:41:07'),
(4, 6, 500, 'usd', 'ch_17wc1rKmhlhEiTCUO9aFQV8E', 'txn_17wc1rKmhlhEiTCUfCU7lJxj', 'Stripe\\Card JSON: {\n    "id": "card_17wanKKmhlhEiTCUV1BQAd26",\n    "object": "card",\n    "address_city": null,\n    "address_country": null,\n    "address_line1": null,\n    "address_line1_check": null,\n    "address_line2": null,\n    "address_state": null,\n    "address_zip": null,\n    "address_zip_check": null,\n    "brand": "American Express",\n    "country": "US",\n    "customer": "cus_8D0nuZOCDc5aAK",\n    "cvc_check": null,\n    "dynamic_last4": null,\n    "exp_month": 1,\n    "exp_year": 2022,\n    "fingerprint": "euNwZFKcD4zVrpTA",\n    "funding": "credit",\n    "last4": "8431",\n    "metadata": [],\n    "name": null,\n    "tokenization_method": null\n}', 0, 1, 'succeeded', 1, '2016-04-04 18:02:23', '2016-04-04 18:02:23'),
(5, 6, 1500, 'usd', 'ch_17wc1yKmhlhEiTCUz7wBNnUS', 'txn_17wc1yKmhlhEiTCU2EokcI4X', 'Stripe\\Card JSON: {\n    "id": "card_17wanKKmhlhEiTCUV1BQAd26",\n    "object": "card",\n    "address_city": null,\n    "address_country": null,\n    "address_line1": null,\n    "address_line1_check": null,\n    "address_line2": null,\n    "address_state": null,\n    "address_zip": null,\n    "address_zip_check": null,\n    "brand": "American Express",\n    "country": "US",\n    "customer": "cus_8D0nuZOCDc5aAK",\n    "cvc_check": null,\n    "dynamic_last4": null,\n    "exp_month": 1,\n    "exp_year": 2022,\n    "fingerprint": "euNwZFKcD4zVrpTA",\n    "funding": "credit",\n    "last4": "8431",\n    "metadata": [],\n    "name": null,\n    "tokenization_method": null\n}', 0, 1, 'succeeded', 1, '2016-04-04 18:02:30', '2016-04-04 18:02:30'),
(6, 6, 1500, 'usd', 'ch_17wc5fKmhlhEiTCUq0QOzR6E', 'txn_17wc5fKmhlhEiTCUZ13E1u2e', 'Stripe\\Card JSON: {\n    "id": "card_17wanKKmhlhEiTCUV1BQAd26",\n    "object": "card",\n    "address_city": null,\n    "address_country": null,\n    "address_line1": null,\n    "address_line1_check": null,\n    "address_line2": null,\n    "address_state": null,\n    "address_zip": null,\n    "address_zip_check": null,\n    "brand": "American Express",\n    "country": "US",\n    "customer": "cus_8D0nuZOCDc5aAK",\n    "cvc_check": null,\n    "dynamic_last4": null,\n    "exp_month": 1,\n    "exp_year": 2022,\n    "fingerprint": "euNwZFKcD4zVrpTA",\n    "funding": "credit",\n    "last4": "8431",\n    "metadata": [],\n    "name": null,\n    "tokenization_method": null\n}', 0, 1, 'succeeded', 1, '2016-04-04 18:06:20', '2016-04-04 18:06:20'),
(7, 6, 500, 'usd', 'ch_17wc7JKmhlhEiTCUTMHPaHt0', 'txn_17wc7JKmhlhEiTCUz0REVMBY', 'Stripe\\Card JSON: {\n    "id": "card_17wanKKmhlhEiTCUV1BQAd26",\n    "object": "card",\n    "address_city": null,\n    "address_country": null,\n    "address_line1": null,\n    "address_line1_check": null,\n    "address_line2": null,\n    "address_state": null,\n    "address_zip": null,\n    "address_zip_check": null,\n    "brand": "American Express",\n    "country": "US",\n    "customer": "cus_8D0nuZOCDc5aAK",\n    "cvc_check": null,\n    "dynamic_last4": null,\n    "exp_month": 1,\n    "exp_year": 2022,\n    "fingerprint": "euNwZFKcD4zVrpTA",\n    "funding": "credit",\n    "last4": "8431",\n    "metadata": [],\n    "name": null,\n    "tokenization_method": null\n}', 0, 1, 'succeeded', 1, '2016-04-04 18:08:01', '2016-04-04 18:08:01'),
(8, 6, 500, 'usd', 'ch_17wcCfKmhlhEiTCUR7v7TSGr', 'txn_17wcCfKmhlhEiTCU61Xt8vAy', 'Stripe\\Card JSON: {\n    "id": "card_17wanKKmhlhEiTCUV1BQAd26",\n    "object": "card",\n    "address_city": null,\n    "address_country": null,\n    "address_line1": null,\n    "address_line1_check": null,\n    "address_line2": null,\n    "address_state": null,\n    "address_zip": null,\n    "address_zip_check": null,\n    "brand": "American Express",\n    "country": "US",\n    "customer": "cus_8D0nuZOCDc5aAK",\n    "cvc_check": null,\n    "dynamic_last4": null,\n    "exp_month": 1,\n    "exp_year": 2022,\n    "fingerprint": "euNwZFKcD4zVrpTA",\n    "funding": "credit",\n    "last4": "8431",\n    "metadata": [],\n    "name": null,\n    "tokenization_method": null\n}', 7, 1, 'succeeded', 1, '2016-04-04 18:13:33', '2016-04-04 18:13:33'),
(9, 2, 1000, 'usd', 'ch_17wcclKmhlhEiTCUGjVYknmE', 'txn_17wcclKmhlhEiTCUMn9whlT3', 'Stripe\\Card JSON: {\n    "id": "card_17wccjKmhlhEiTCUGc2G3D9P",\n    "object": "card",\n    "address_city": null,\n    "address_country": null,\n    "address_line1": null,\n    "address_line1_check": null,\n    "address_line2": null,\n    "address_state": null,\n    "address_zip": null,\n    "address_zip_check": null,\n    "brand": "Visa",\n    "country": "US",\n    "customer": "cus_8D2iag3sQfFMMB",\n    "cvc_check": "pass",\n    "dynamic_last4": null,\n    "exp_month": 2,\n    "exp_year": 2020,\n    "fingerprint": "AN97ZquDNZBghG71",\n    "funding": "unknown",\n    "last4": "1111",\n    "metadata": [],\n    "name": null,\n    "tokenization_method": null\n}', 0, 2, 'succeeded', 1, '2016-04-04 18:40:31', '2016-04-04 18:40:31'),
(10, 12, 500, 'usd', 'ch_17x6MHKmhlhEiTCU6huwSKv5', 'txn_17x6MHKmhlhEiTCUNW5EFSV9', 'Stripe\\Card JSON: {\n    "id": "card_17x6MFKmhlhEiTCUhWqmDbEt",\n    "object": "card",\n    "address_city": null,\n    "address_country": null,\n    "address_line1": null,\n    "address_line1_check": null,\n    "address_line2": null,\n    "address_state": null,\n    "address_zip": null,\n    "address_zip_check": null,\n    "brand": "Visa",\n    "country": "US",\n    "customer": "cus_8DXRcI0YcBUVSK",\n    "cvc_check": "pass",\n    "dynamic_last4": null,\n    "exp_month": 2,\n    "exp_year": 2020,\n    "fingerprint": "AN97ZquDNZBghG71",\n    "funding": "unknown",\n    "last4": "1111",\n    "metadata": [],\n    "name": null,\n    "tokenization_method": null\n}', 0, 2, 'succeeded', 1, '2016-04-06 02:25:29', '2016-04-06 02:25:29'),
(11, 12, 500, 'usd', 'ch_17x6MiKmhlhEiTCUgIyWn9Lp', 'txn_17x6MiKmhlhEiTCUJoysBVnZ', 'Stripe\\Card JSON: {\n    "id": "card_17x6MFKmhlhEiTCUhWqmDbEt",\n    "object": "card",\n    "address_city": null,\n    "address_country": null,\n    "address_line1": null,\n    "address_line1_check": null,\n    "address_line2": null,\n    "address_state": null,\n    "address_zip": null,\n    "address_zip_check": null,\n    "brand": "Visa",\n    "country": "US",\n    "customer": "cus_8DXRcI0YcBUVSK",\n    "cvc_check": "pass",\n    "dynamic_last4": null,\n    "exp_month": 2,\n    "exp_year": 2020,\n    "fingerprint": "AN97ZquDNZBghG71",\n    "funding": "unknown",\n    "last4": "1111",\n    "metadata": [],\n    "name": null,\n    "tokenization_method": null\n}', 8, 1, 'succeeded', 1, '2016-04-06 02:25:57', '2016-04-06 02:25:57');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `video_id` int(11) NOT NULL,
  `question_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `control_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `order_no` int(11) DEFAULT '0',
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=27 ;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `question`, `video_id`, `question_type`, `control_type`, `order_no`, `enable`, `created_at`, `updated_at`) VALUES
(1, 'Question 1', 1, '1', '1', 0, 1, '2016-04-04 02:13:54', '2016-04-04 02:13:54'),
(2, 'Question 2', 1, '0', '0', 0, 1, '2016-04-04 02:13:54', '2016-04-04 02:13:54'),
(3, 'Algebra is lot similar to arithmetic', 2, '0', '0', 0, 1, '2016-04-04 02:23:24', '2016-04-04 02:23:24'),
(4, 'algebra', 2, '0', '0', 0, 1, '2016-04-04 13:05:30', '2016-04-04 13:05:30'),
(5, 'Top found the balloon, but did not want to share the balloon with Tip.', 3, '0', '0', 0, 1, '2016-04-04 19:16:06', '2016-04-04 19:16:06'),
(6, 'What color was the balloon?', 3, '1', '1', 0, 1, '2016-04-04 19:16:06', '2016-04-04 19:16:06'),
(7, 'Top shared the balloon with Tip', 3, '0', '0', 0, 1, '2016-04-04 19:16:06', '2016-04-04 19:16:06'),
(8, 'Sharing is part of respecting others.', 4, '0', '0', 0, 1, '2016-04-04 19:21:45', '2016-04-04 19:21:45'),
(9, 'Which character would not share the bridge with Moose?', 4, '1', '1', 0, 1, '2016-04-04 19:21:45', '2016-04-04 19:21:45'),
(10, 'Thanksgiving is in November.', 5, '0', '0', 0, 1, '2016-04-04 20:22:57', '2016-04-04 20:22:57'),
(11, 'What do Americans eat at Thanksgiving?', 5, '1', '1', 0, 1, '2016-04-04 20:22:57', '2016-04-04 20:22:57'),
(12, 'Thanksgiving is in November because it’s at the end of the Harvest season.', 5, '0', '0', 0, 1, '2016-04-04 20:22:57', '2016-04-04 20:22:57'),
(13, 'How are you?', 6, '1', '1', 0, 1, '2016-04-06 03:07:32', '2016-04-06 03:07:32'),
(14, 'You are good.', 6, '0', '0', 0, 1, '2016-04-06 03:07:32', '2016-04-06 03:07:32'),
(15, 'A boy falls on his skateboard in the beginning of the video.', 7, '0', '0', 0, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(16, 'A ______________ helps him up.', 7, '1', '1', 0, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(17, 'An older woman needs help with her dog.', 7, '0', '0', 0, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(18, 'In each interaction, people return the favor, or “pay it forward.', 7, '0', '0', 0, 1, '2016-04-14 14:18:58', '2016-04-14 14:18:58'),
(19, 'In the video, the four people use kindness to put ______________  ___________ back.', 8, '1', '1', 0, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(20, 'Next, the four gave out food and water to homeless people.', 8, '0', '0', 0, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(21, 'Finally, participants were urged to call people who needed', 8, '1', '1', 0, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(22, 'The participants'' felt happier the kinder they were.', 8, '0', '0', 0, 1, '2016-04-14 14:39:47', '2016-04-14 14:39:47'),
(23, 'Just a smile can make someone feel happy.', 9, '0', '0', 0, 1, '2016-04-14 15:13:32', '2016-04-14 15:13:32'),
(24, 'Jacqueline believes that we should take time in our days to do something kind.  Just doing something small is a good idea - like helping a boy find his dog.', 9, '0', '0', 0, 1, '2016-04-14 15:13:32', '2016-04-14 15:13:32'),
(25, 'Being rude and inconsiderate promotes happiness in you and others.', 9, '0', '0', 0, 1, '2016-04-14 15:13:32', '2016-04-14 15:13:32'),
(26, '', 9, '1', '1', 0, 1, '2016-04-14 15:13:32', '2016-04-14 15:13:32');

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `quizzes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `value` int(11) NOT NULL COMMENT '#of point',
  `score` int(11) NOT NULL COMMENT 'pass rate on %',
  `house_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `video_id` int(255) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `description`, `value`, `score`, `house_id`, `user_id`, `video_id`, `enable`, `created_at`, `updated_at`) VALUES
(1, NULL, 50, 50, 2, 4, 1, 1, '2016-04-04 02:18:45', '2016-04-04 02:18:45'),
(2, 'What is algebra', 2, 75, 1, 2, 2, 0, '2016-04-04 03:57:05', '2016-04-04 03:57:15'),
(3, NULL, 2, 50, 1, 2, 2, 1, '2016-04-04 03:57:55', '2016-04-04 03:57:55'),
(4, 'What is algebra', 60, 70, 2, 4, 2, 0, '2016-04-04 13:19:31', '2016-04-04 17:27:36'),
(5, NULL, 50, 50, 3, 6, 1, 1, '2016-04-04 16:52:23', '2016-04-04 16:52:23'),
(6, NULL, 5, 75, 5, 12, 4, 1, '2016-04-04 20:39:58', '2016-04-04 20:39:58'),
(7, NULL, 6, 75, 5, 12, 3, 1, '2016-04-04 20:41:13', '2016-04-04 20:41:13'),
(8, NULL, 25, 50, 5, 12, 5, 1, '2016-04-06 02:31:52', '2016-04-06 02:31:52'),
(9, NULL, 20, 50, 5, 12, 6, 1, '2016-04-06 03:08:09', '2016-04-06 03:08:09');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `results` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `attempt_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer_id` int(11) NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=25 ;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `attempt_id`, `question_id`, `answer_id`, `is_correct`, `enable`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 2, 0, 1, '2016-04-04 02:20:20', '2016-04-04 02:20:20'),
(2, 1, 2, 6, 0, 1, '2016-04-04 02:20:23', '2016-04-04 02:20:23'),
(3, 2, 1, 1, 1, 1, '2016-04-04 02:20:41', '2016-04-04 02:20:41'),
(4, 2, 2, 5, 1, 1, '2016-04-04 02:20:45', '2016-04-04 02:20:45'),
(5, 3, 3, 8, 0, 1, '2016-04-04 03:58:54', '2016-04-04 03:58:54'),
(6, 4, 3, 7, 1, 1, '2016-04-04 04:00:22', '2016-04-04 04:00:22'),
(7, 5, 3, 7, 1, 1, '2016-04-04 14:43:51', '2016-04-04 14:43:51'),
(8, 5, 4, 9, 1, 1, '2016-04-04 14:43:54', '2016-04-04 14:43:54'),
(9, 6, 1, 2, 0, 1, '2016-04-04 16:53:17', '2016-04-04 16:53:17'),
(10, 6, 2, 6, 0, 1, '2016-04-04 16:53:20', '2016-04-04 16:53:20'),
(11, 7, 1, 1, 1, 1, '2016-04-04 16:53:40', '2016-04-04 16:53:40'),
(12, 7, 2, 5, 1, 1, '2016-04-04 16:53:42', '2016-04-04 16:53:42'),
(13, 8, 5, 11, 1, 1, '2016-04-04 21:12:54', '2016-04-04 21:12:54'),
(14, 8, 6, 13, 1, 1, '2016-04-04 21:12:57', '2016-04-04 21:12:57'),
(15, 8, 7, 17, 1, 1, '2016-04-04 21:13:00', '2016-04-04 21:13:00'),
(16, 9, 8, 19, 1, 1, '2016-04-04 21:24:47', '2016-04-04 21:24:47'),
(17, 9, 9, 21, 1, 1, '2016-04-04 21:24:51', '2016-04-04 21:24:51'),
(18, 10, 10, 25, 1, 1, '2016-04-06 02:32:40', '2016-04-06 02:32:40'),
(19, 10, 11, 29, 1, 1, '2016-04-06 02:32:45', '2016-04-06 02:32:45'),
(20, 10, 12, 31, 1, 1, '2016-04-06 02:32:52', '2016-04-06 02:32:52'),
(21, 11, 13, 34, 0, 1, '2016-04-06 03:08:58', '2016-04-06 03:08:58'),
(22, 11, 14, 36, 0, 1, '2016-04-06 03:09:04', '2016-04-06 03:09:04'),
(23, 12, 13, 33, 1, 1, '2016-04-06 03:12:20', '2016-04-06 03:12:20'),
(24, 12, 14, 36, 0, 1, '2016-04-06 03:12:23', '2016-04-06 03:12:23');

-- --------------------------------------------------------

--
-- Table structure for table `rewards`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `rewards` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `attempt_id` int(11) DEFAULT NULL,
  `child_id` int(11) NOT NULL,
  `value` int(11) NOT NULL COMMENT 'allocated points for the quiz',
  `type` tinyint(4) NOT NULL COMMENT '1: quizzes, 2: tasks, 3: behavior',
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=20 ;

--
-- Dumping data for table `rewards`
--

INSERT INTO `rewards` (`id`, `attempt_id`, `child_id`, `value`, `type`, `enable`, `created_at`, `updated_at`) VALUES
(2, NULL, 5, 10, 3, 1, '2016-04-03 20:38:49', '2016-04-03 20:38:49'),
(3, 2, 9, 50, 1, 1, '2016-04-04 02:20:49', '2016-04-04 02:20:49'),
(4, 4, 3, 2, 1, 1, '2016-04-04 04:00:27', '2016-04-04 04:00:27'),
(5, 5, 9, 60, 1, 1, '2016-04-04 14:44:00', '2016-04-04 14:44:00'),
(6, 7, 10, 50, 1, 1, '2016-04-04 16:53:45', '2016-04-04 16:53:45'),
(7, NULL, 10, -5, 0, 0, '2016-04-04 17:41:07', '2016-04-04 17:41:07'),
(8, NULL, 10, -5, 0, 0, '2016-04-04 18:02:23', '2016-04-04 18:02:23'),
(9, NULL, 10, -15, 0, 0, '2016-04-04 18:02:30', '2016-04-04 18:02:30'),
(10, NULL, 10, -15, 0, 0, '2016-04-04 18:06:20', '2016-04-04 18:06:20'),
(11, NULL, 10, -5, 0, 0, '2016-04-04 18:08:01', '2016-04-04 18:08:01'),
(12, NULL, 10, 100, 3, 1, '2016-04-04 18:12:19', '2016-04-04 18:12:19'),
(13, NULL, 10, -5, 0, 0, '2016-04-04 18:13:33', '2016-04-04 18:13:33'),
(14, 8, 13, 6, 1, 1, '2016-04-04 21:13:04', '2016-04-04 21:13:04'),
(15, 9, 13, 5, 1, 1, '2016-04-04 21:24:56', '2016-04-04 21:24:56'),
(16, NULL, 13, -5, 0, 0, '2016-04-06 02:25:57', '2016-04-06 02:25:57'),
(17, 10, 13, 25, 1, 1, '2016-04-06 02:33:07', '2016-04-06 02:33:07'),
(18, 12, 13, 20, 1, 1, '2016-04-06 03:12:26', '2016-04-06 03:12:26'),
(19, NULL, 17, 1, 3, 1, '2016-04-16 00:42:34', '2016-04-16 00:42:34');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_plan` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `taskallocations`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `taskallocations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `child_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `due_data` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `parent_accept` int(11) NOT NULL,
  `occurrence` int(11) NOT NULL COMMENT '1:one time, 2: daily, 3: weekly, 4: monthly, 5: yearly',
  `duration` int(11) NOT NULL,
  `attempts` int(11) NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL COMMENT '0: not started, 1: started, 2: skipped, 3: finished',
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=9 ;

--
-- Dumping data for table `taskallocations`
--

INSERT INTO `taskallocations` (`id`, `child_id`, `task_id`, `house_id`, `start_date`, `due_data`, `parent_accept`, `occurrence`, `duration`, `attempts`, `value`, `status`, `enable`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 1, '2016-04-03 00:00:00', '0000-00-00 00:00:00', 0, 1, 10, 1, '3', 3, 1, '2016-04-03 08:06:06', '2016-04-04 04:05:35'),
(2, 5, 2, 2, '2016-04-04 00:00:00', '0000-00-00 00:00:00', 0, 1, 20, 1, '20', 0, 1, '2016-04-03 20:08:52', '2016-04-04 14:44:05'),
(3, 9, 2, 2, '2016-04-04 00:00:00', '0000-00-00 00:00:00', 0, 1, 20, 1, '20', 3, 1, '2016-04-03 20:42:04', '2016-04-04 14:45:10'),
(4, 10, 3, 3, '2016-04-04 00:00:00', '0000-00-00 00:00:00', 0, 1, 10, 1, '50', 0, 1, '2016-04-04 01:33:51', '2016-04-04 01:33:51'),
(5, 9, 4, 2, '2016-04-04 00:00:00', '0000-00-00 00:00:00', 0, 1, 60, 1, '30', 3, 1, '2016-04-04 14:47:16', '2016-04-06 06:41:17'),
(6, 5, 4, 2, '2016-04-04 00:00:00', '0000-00-00 00:00:00', 0, 1, 60, 1, '30', 0, 1, '2016-04-04 14:47:16', '2016-04-04 14:47:16'),
(7, 13, 5, 5, '2016-04-04 00:00:00', '0000-00-00 00:00:00', 0, 1, 20, 1, '10', 3, 1, '2016-04-04 20:49:25', '2016-04-06 04:24:57'),
(8, 13, 7, 5, '2016-04-05 00:00:00', '0000-00-00 00:00:00', 0, 1, 10, 1, '15', 3, 1, '2016-04-06 04:26:06', '2016-04-06 04:26:35');

-- --------------------------------------------------------

--
-- Table structure for table `taskattempts`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `taskattempts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `child_id` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `allocation_id` int(11) NOT NULL,
  `finished_at` timestamp NULL DEFAULT NULL,
  `status` int(11) NOT NULL COMMENT '0: started, 1: skipped, 2: finished',
  `is_approved` tinyint(1) NOT NULL COMMENT '1:satisfied, 0:not unsatisfied',
  `enable` tinyint(1) NOT NULL COMMENT '1:enable, 0:disable',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- Dumping data for table `taskattempts`
--

INSERT INTO `taskattempts` (`id`, `task_id`, `child_id`, `house_id`, `allocation_id`, `finished_at`, `status`, `is_approved`, `enable`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 1, 1, '2016-04-03 08:14:45', 2, 0, 1, '2016-04-03 08:14:27', '2016-04-03 08:14:45'),
(2, 2, 9, 2, 3, '2016-04-04 14:45:10', 2, 0, 1, '2016-04-04 14:44:48', '2016-04-04 14:45:10'),
(3, 5, 13, 5, 7, '2016-04-04 21:25:34', 2, 0, 1, '2016-04-04 21:25:28', '2016-04-04 21:25:34'),
(4, 7, 13, 5, 8, '2016-04-06 04:26:35', 2, 0, 1, '2016-04-06 04:26:27', '2016-04-06 04:26:35'),
(5, 4, 9, 2, 5, '2016-04-06 06:41:17', 2, 0, 1, '2016-04-06 06:41:12', '2016-04-06 06:41:17');

-- --------------------------------------------------------

--
-- Table structure for table `taskcategories`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `taskcategories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `task` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `category` int(11) NOT NULL,
  `by_admin` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=8 ;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task`, `description`, `category`, `by_admin`, `user_id`, `enable`, `created_at`, `updated_at`) VALUES
(1, 'Mow the lawn', 'Mow the lawn after school on Thursday.', 0, 0, 2, 1, '2016-04-03 08:05:31', '2016-04-03 08:05:31'),
(2, 'Walk the dog', 'Hold on to the leash tight!', 0, 0, 4, 1, '2016-04-03 20:08:05', '2016-04-03 20:08:05'),
(3, 'Paint the fence.', 'The fence needs to be scraped and repainted.', 0, 0, 1, 1, '2016-04-04 01:33:22', '2016-04-04 19:22:33'),
(4, 'Clean the fish tank', 'Use less water', 0, 0, 4, 1, '2016-04-04 14:46:34', '2016-04-04 14:46:34'),
(5, 'Clean your room', 'Vacuum, dust, and organize you room.', 0, 1, 1, 1, '2016-04-04 20:25:31', '2016-04-04 20:25:31'),
(6, 'Mow the lawn', 'Make sure to trim.', 0, 0, 12, 1, '2016-04-04 20:48:56', '2016-04-04 20:48:56'),
(7, 'Clean the garage', 'sweep everything and then spray down the garage floor.', 0, 0, 12, 1, '2016-04-06 04:24:42', '2016-04-06 04:24:42');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `f_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `l_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telephone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mobile` int(11) NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `profession` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `profile_image` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'uploads/profile/default.jpg',
  `role_id` int(10) unsigned NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `verify_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fb_password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `_fb` tinyint(1) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `stripe_active` tinyint(4) NOT NULL DEFAULT '0',
  `stripe_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stripe_subscription` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stripe_plan` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_four` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `subscription_ends_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_role_id_index` (`role_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=20 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `f_name`, `l_name`, `email`, `telephone`, `mobile`, `address`, `city`, `state`, `country`, `date_of_birth`, `gender`, `profession`, `profile_image`, `role_id`, `username`, `password`, `remember_token`, `verify_token`, `fb_password`, `_fb`, `enable`, `created_at`, `updated_at`, `stripe_active`, `stripe_id`, `stripe_subscription`, `stripe_plan`, `last_four`, `trial_ends_at`, `subscription_ends_at`) VALUES
(1, 'Marion', 'Mariathasan', 'admin@e2l.com', '720-951-5513', 2147483647, '3030 Dogwood Dr', 'Denver', 'Colorado', 'USA', '0000-00-00', 'Male', 'Earn2Learn Administrator', 'uploads/profile/profile_1.jpg', 1, 'administrator', '$2y$10$D4EbgbJIx9D2d9wxTMNKtentFw6VGj0Nmdal48dKlBquNIuJCinn.', '', '', '', 0, 1, '2016-04-02 00:00:00', '2016-04-04 19:07:35', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'John', 'Morgan', 'john.m@ceylonsolutions.com', '', 0, '', '', '', '', '0000-00-00', '', '', 'uploads/profile/profile_2.jpg', 2, 'John', '$2y$10$TZ3mqbQ2MF4nSO1YY5aDdegMzEDcH9TzSq3GFePmT.naOtnqrGcgy', '', 'Jgk8TAlM2EWFeVrH1fK0wm4yNpRULqOGCxiu6j3SsItYXcaZDnvhbdQ79ozBP5', NULL, 0, 1, '2016-04-03 01:20:26', '2016-04-04 18:40:31', 1, 'cus_8D2iag3sQfFMMB', 'sub_8D2iziWgsRNnqz', 'customer', '1111', '2016-04-18 18:40:30', '2016-05-04 18:40:31'),
(3, 'Rhys', 'Morgan', '', '', 0, '', '', '', '', '0000-00-00', '', '', 'uploads/profile/default.jpg', 3, 'Rhys', '$2y$10$d5Gb/HmhhvZaXG84ri6zYOOmZQsNDoMF1GL/KMYu8cqvYWNXY/1Ua', '', '', NULL, 0, 1, '2016-04-03 01:29:52', '2016-04-03 01:29:52', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Chaminda', 'Gomes', 'chaminda71@yahoo.com', '', 0, '', '', '', '', '0000-00-00', '', '', 'http://graph.facebook.com/10153936930817768/picture?type=large', 2, 'chaminda71', '$2y$10$aCAqQdTKjd27Qr84EZIGJeEberFwdKhKy30ebsXNZQEvumF3jjsJm', '', '', NULL, 1, 1, '2016-04-03 02:45:10', '2016-04-04 17:14:03', 0, 'cus_8D1HnLJi0kECcO', 'sub_8D1Ht5VbDsshwp', 'customer', '4242', '2016-04-18 17:12:09', '2016-05-04 17:13:17'),
(5, 'Dan', 'Zoo', '', '', 0, '', '', '', '', '0000-00-00', '', '', 'uploads/profile/default.jpg', 3, 'Dan', '$2y$10$VbP7soTAVlV2iLaidqS86uE1l5Fl9/Fs4fwC7ksgxIuSUZk.ILxka', '', '', NULL, 0, 1, '2016-04-03 02:46:06', '2016-04-03 02:46:06', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Ishänthä', 'Läkmäl', 'pgishantha.fit@gmail.com', '', 0, '', '', '', '', '0000-00-00', '', '', 'http://graph.facebook.com/964257490327796/picture?type=large', 2, 'pgishantha.fit', '$2y$10$yG./j2bSxSlz6arEVqyasObRWWYwF48AaiNiUrY0ZNATYPYTRcRie', '', '', NULL, 1, 1, '2016-04-03 14:58:58', '2016-04-04 18:14:04', 1, 'cus_8D0nuZOCDc5aAK', 'sub_8D0n8A40cr7I51', 'customer', '8431', '2016-04-18 16:41:52', '2016-05-04 16:43:29'),
(7, 'Heshan', 'Gunasekara', 'ghgunasekara@wichita.edu', '', 0, '', '', '', '', '0000-00-00', '', '', 'http://graph.facebook.com/10156643582825385/picture?type=large', 2, 'ghgunasekara', '$2y$10$3EbR.oWJXCIUhPw0QJbmy.divte8qlwRYDTbjgWwcOtgpChLwTwQG', '', '', NULL, 1, 1, '2016-04-03 17:54:17', '2016-04-03 17:54:17', 0, NULL, NULL, NULL, NULL, '2016-04-17 17:54:17', NULL),
(8, 'test', 'test', ' ', '', 0, '', '', '', '', '0000-00-00', '', '', 'uploads/profile/default.jpg', 3, 'test', '$2y$10$0NRiI9zDLR.cCAHMkutDWexKdF4cO4da4AW4nvDI6YMX3JYYusDkK', '', '', NULL, 0, 0, '2016-04-03 17:54:56', '2016-04-03 17:56:27', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'Jan', 'Zoo', '', '', 0, '', '', '', '', '0000-00-00', '', '', 'uploads/profile/default.jpg', 3, 'Jan', '$2y$10$olPsUKCDyJB1In63e/XgrOKi3Ft0eig2s4WonnMl1lLrjmy1aN5/W', '', '', NULL, 0, 1, '2016-04-03 20:38:01', '2016-04-03 20:38:01', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'Nimesh', 'Tharindu', '', '', 0, '', '', '', '', '0000-00-00', '', '', 'uploads/profile/default.jpg', 3, 'nimesh', '$2y$10$C1N7Qgxg53xyqPsoZmsgI.zMIDGzXBklRphpBcnsYa7oRUEyaiBCy', '', '', NULL, 0, 1, '2016-04-04 01:32:01', '2016-04-04 01:32:01', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'Catherine', 'Morgan', '', '', 0, '', '', '', '', '0000-00-00', '', '', 'uploads/profile/default.jpg', 3, 'catherine', '$2y$10$G9BglVVn1kYXH0ce6BFNAuFcaT1r6v2eCEE.gBK8QTY.psIoU54sm', '', '', NULL, 0, 1, '2016-04-04 03:23:20', '2016-04-04 03:23:20', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'Johnny', 'Morgan', 'jhm1982@gmail.com', '', 0, '', '', '', '', '0000-00-00', '', '', 'http://graph.facebook.com/10103461610626519/picture?type=large', 2, 'jhm1982', '$2y$10$qeFeKT22KQCAvpC9I8dlVeyP5kcBBABZGZNFIyfG8mStNcU0.eOVK', '', '', '$2y$10$xXuNw.ZFQiaRfRT6lojUIOFw3AGjwsryWjCNkvxZi4Xr3YH4qS3xS', 1, 1, '2016-04-04 20:02:46', '2016-04-06 02:25:29', 1, 'cus_8DXRcI0YcBUVSK', 'sub_8DXRsDQYcTOPmP', 'customer', '1111', '2016-04-20 02:25:28', '2016-05-06 02:25:29'),
(13, 'Erin', 'Morgan', '', '', 0, '', '', '', '', '0000-00-00', '', '', 'uploads/profile/default.jpg', 3, 'erin', '$2y$10$qAdK23qaEk/d3VczAyXmp.zH9Ik2igMrHhcrKrWTrdr0gXhPl0LFK', '', '', NULL, 0, 1, '2016-04-04 20:31:03', '2016-04-04 20:31:03', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'Jeff', 'Budweiser', 'johnhmorgan@gmail.com', '', 0, '', '', '', '', '0000-00-00', '', '', 'uploads/profile/default.jpg', 2, 'johnny', '$2y$10$xcqS1R.FyiPhHcy6W6vLTOmpztspk3YYguPuiI4.GfIXAm97ot/Ha', '', 'cD9SUaJky5ZfWBH4PL0vTC7Oqx1IRlbMhsizuE2XQwA3VKgodYNrmpet68nFjG', NULL, 0, 0, '2016-04-06 02:38:06', '2016-04-12 01:16:35', 0, NULL, NULL, NULL, NULL, '2016-04-20 02:38:06', NULL),
(15, 'Jeffrey', 'Katz', 'jkatz@profitstreams.com', '', 0, '', '', '', '', '0000-00-00', '', '', 'http://graph.facebook.com/10154111614095522/picture?type=large', 2, 'jkatz', '$2y$10$UZUHa7kVPipI/zSUZ5vz6.LszCn8TUjNfapKELKg5ytFE6aUOOlvO', '', '', NULL, 1, 1, '2016-04-14 16:02:43', '2016-04-14 16:02:43', 0, NULL, NULL, NULL, NULL, '2016-04-28 16:02:43', NULL),
(16, 'Julian', 'Katz', '', '', 0, '', '', '', '', '0000-00-00', '', '', 'uploads/profile/default.jpg', 3, 'Juliank', '$2y$10$BO6TAEWpW0Q0mKEtcNoMW.k/FqXFeTIS/1866BhFJLayzgtcUM0Ni', '', '', NULL, 0, 1, '2016-04-14 16:04:56', '2016-04-14 16:04:56', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'Roxanne', 'Katz', '', '', 0, '', '', '', '', '0000-00-00', '', '', 'uploads/profile/default.jpg', 3, 'RoxanneK', '$2y$10$E1xGJlQtMGh36q50gN9pG.V3kYKB0W.GA1uDNmZsSNLPiZ/4J9CsG', '', '', NULL, 0, 1, '2016-04-15 00:15:31', '2016-04-15 00:15:31', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'Upeka', 'Galgewala', 'upekagalgewala@yahoo.com', '', 0, '', '', '', '', '0000-00-00', '', '', 'http://graph.facebook.com/10154168259409306/picture?type=large', 2, 'upekagalgewala', '$2y$10$RHiA83X0keJb031Acf5z4.1kM91evfIlPGq2hjOgB7a7RubNATQRu', '', '', NULL, 1, 1, '2016-04-16 15:42:20', '2016-04-16 15:42:20', 0, NULL, NULL, NULL, NULL, '2016-04-30 15:42:20', NULL),
(19, 'thilina', 'kasun', 'test@gmail.com', '', 0, '', '', '', '', '0000-00-00', '', '', 'uploads/profile/default.jpg', 2, 'kasun', '$2y$10$GEHts65DP19/RNN/BuZij.oPa7TKO8sqfer4RTq8bc/qSyPZLafUi', '', '', NULL, 0, 0, '2016-05-13 23:47:43', '2016-05-13 23:47:43', 1, NULL, NULL, NULL, NULL, '2016-05-27 23:47:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userlogs`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `userlogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `start` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `userlogs_token_index` (`token`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=198 ;

--
-- Dumping data for table `userlogs`
--

INSERT INTO `userlogs` (`id`, `user_id`, `start`, `end`, `token`, `created_at`, `updated_at`) VALUES
(1, 1, '2016-04-02 20:12:35', '2016-04-02 20:16:38', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2Mjc5NTQsImV4cCI6MTYxNzMwNzk1NCwibmJmIjoxNDU5NjI3OTU0LCJqdGkiOiI1OGIyNTJmNzExNjYzNWQzY2QwYmI1ZjU3ZWViZGE0YiJ9.3qPgwBvXqweRx', '2016-04-02 20:12:35', '2016-04-02 20:16:38'),
(2, 1, '2016-04-02 20:16:48', '2016-04-02 20:16:48', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2Mjc5NTQsImV4cCI6MTYxNzMwNzk1NCwibmJmIjoxNDU5NjI3OTU0LCJqdGkiOiI1OGIyNTJmNzExNjYzNWQzY2QwYmI1ZjU3ZWViZGE0YiJ9.3qPgwBvXqweRx', '2016-04-02 20:16:48', '2016-04-02 20:16:48'),
(3, 1, '2016-04-02 20:18:32', '2016-04-02 20:19:07', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2MjgzMTEsImV4cCI6MTYxNzMwODMxMSwibmJmIjoxNDU5NjI4MzExLCJqdGkiOiIyYzIyYjlmOGNmYWY1NzQ0OTc5ZGVhYjdmM2JhYzBjMyJ9.NkZhpV_k_HE4L', '2016-04-02 20:18:32', '2016-04-02 20:19:07'),
(4, 1, '2016-04-03 01:02:00', '2016-04-03 01:03:00', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NDUzMTksImV4cCI6MTYxNzMyNTMxOSwibmJmIjoxNDU5NjQ1MzE5LCJqdGkiOiI1OTExY2U1MGQ5MTI0MDBlYWJmMmM3NmNmMmZkMjVkZSJ9.KTqcJKdEqLZng', '2016-04-03 01:02:00', '2016-04-03 01:03:00'),
(5, 1, '2016-04-03 01:03:05', '2016-04-03 01:04:34', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NDUzMTksImV4cCI6MTYxNzMyNTMxOSwibmJmIjoxNDU5NjQ1MzE5LCJqdGkiOiI1OTExY2U1MGQ5MTI0MDBlYWJmMmM3NmNmMmZkMjVkZSJ9.KTqcJKdEqLZng', '2016-04-03 01:03:05', '2016-04-03 01:04:34'),
(6, 1, '2016-04-03 01:04:24', '2016-04-03 01:04:24', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NDUzMTksImV4cCI6MTYxNzMyNTMxOSwibmJmIjoxNDU5NjQ1MzE5LCJqdGkiOiI1OTExY2U1MGQ5MTI0MDBlYWJmMmM3NmNmMmZkMjVkZSJ9.KTqcJKdEqLZng', '2016-04-03 01:04:24', '2016-04-03 01:04:24'),
(7, 1, '2016-04-03 01:09:27', '2016-04-03 01:10:45', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NDUzMTksImV4cCI6MTYxNzMyNTMxOSwibmJmIjoxNDU5NjQ1MzE5LCJqdGkiOiI1OTExY2U1MGQ5MTI0MDBlYWJmMmM3NmNmMmZkMjVkZSJ9.KTqcJKdEqLZng', '2016-04-03 01:09:27', '2016-04-03 01:10:45'),
(8, 1, '2016-04-03 01:10:47', '2016-04-03 07:37:51', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NDUzMTksImV4cCI6MTYxNzMyNTMxOSwibmJmIjoxNDU5NjQ1MzE5LCJqdGkiOiI1OTExY2U1MGQ5MTI0MDBlYWJmMmM3NmNmMmZkMjVkZSJ9.KTqcJKdEqLZng', '2016-04-03 01:10:47', '2016-04-03 07:37:51'),
(9, 2, '2016-04-03 01:26:45', '2016-04-03 06:47:23', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NDY4MDUsImV4cCI6MTYxNzMyNjgwNSwibmJmIjoxNDU5NjQ2ODA1LCJqdGkiOiI4NGFlMzk1NmYyMTk5YjNhNzZmNTA3MTk3MmJjNzMwYyJ9.VeUIlqdoXXg-r', '2016-04-03 01:26:45', '2016-04-03 06:47:23'),
(10, 1, '2016-04-03 02:39:38', '2016-04-03 02:39:38', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NTExNzcsImV4cCI6MTYxNzMzMTE3NywibmJmIjoxNDU5NjUxMTc3LCJqdGkiOiI4ZjE4ZWVkOTc2M2M3MzBiMzJhMzQ2MzViNjEwZmYxYyJ9.kP86N2q63usta', '2016-04-03 02:39:38', '2016-04-03 02:39:38'),
(11, 1, '2016-04-03 02:43:21', '2016-04-03 02:46:41', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NTE0MDAsImV4cCI6MTYxNzMzMTQwMCwibmJmIjoxNDU5NjUxNDAwLCJqdGkiOiIxMzZhMDlkNDVmMzg1N2I4OTAwM2Y2YzZiYTNhMWRhZSJ9.vTewyLFTfeF0U', '2016-04-03 02:43:21', '2016-04-03 02:46:41'),
(12, 1, '2016-04-03 05:32:03', '2016-04-03 05:32:08', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NTExNzcsImV4cCI6MTYxNzMzMTE3NywibmJmIjoxNDU5NjUxMTc3LCJqdGkiOiI4ZjE4ZWVkOTc2M2M3MzBiMzJhMzQ2MzViNjEwZmYxYyJ9.kP86N2q63usta', '2016-04-03 05:32:03', '2016-04-03 05:32:08'),
(13, 4, '2016-04-03 06:15:29', '2016-04-03 20:38:41', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NjQxMjgsImV4cCI6MTYxNzM0NDEyOCwibmJmIjoxNDU5NjY0MTI4LCJqdGkiOiI3NjhiNWVjN2U3ZTA2YmI1N2I0OWE0YTlhMDNkYWRhYSJ9.XVW_7X6rT', '2016-04-03 06:15:29', '2016-04-03 20:38:41'),
(14, 3, '2016-04-03 06:47:13', '2016-04-03 06:47:17', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NDcyNDUsImV4cCI6MTYxNzMyNzI0NSwibmJmIjoxNDU5NjQ3MjQ1LCJqdGkiOiJjNjg2MmY5ZWJjYTE3Y2E2OGI4M2FhYzFlYWQ3ZmViZSJ9.ONfRbaMhJRHaH', '2016-04-03 06:47:13', '2016-04-03 06:47:17'),
(15, 3, '2016-04-03 06:47:19', '2016-04-03 06:47:19', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NDcyNDUsImV4cCI6MTYxNzMyNzI0NSwibmJmIjoxNDU5NjQ3MjQ1LCJqdGkiOiJjNjg2MmY5ZWJjYTE3Y2E2OGI4M2FhYzFlYWQ3ZmViZSJ9.ONfRbaMhJRHaH', '2016-04-03 06:47:19', '2016-04-03 06:47:19'),
(16, 2, '2016-04-03 07:37:55', '2016-04-03 07:37:55', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NjYwNTksImV4cCI6MTYxNzM0NjA1OSwibmJmIjoxNDU5NjY2MDU5LCJqdGkiOiI2MDg1MjdlYTNiMmRmNTM2ZTUzOGQxYTZkY2M3NzlmMyJ9.vri2Blvs4y3yM', '2016-04-03 07:37:55', '2016-04-03 07:37:55'),
(17, 1, '2016-04-03 07:38:53', '2016-04-03 08:01:11', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NjkxMzIsImV4cCI6MTYxNzM0OTEzMiwibmJmIjoxNDU5NjY5MTMyLCJqdGkiOiIxOTQzYzQ0ODMzMmIxYzhkMTY0ZTVhZmFhMDgzOTAxYiJ9.Wu0NAAec5G9e5', '2016-04-03 07:38:53', '2016-04-03 08:01:11'),
(18, 2, '2016-04-03 08:01:17', '2016-04-03 08:02:46', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NzAyMjAsImV4cCI6MTYxNzM1MDIyMCwibmJmIjoxNDU5NjcwMjIwLCJqdGkiOiIwNjA5NTk4YTJjMzQ0M2UxZjg5NzlhZTA4MmMwNjc3YiJ9.GGWYMO7o7SKUs', '2016-04-03 08:01:17', '2016-04-03 08:02:46'),
(19, 2, '2016-04-03 08:02:50', '2016-04-03 08:06:21', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NzAyMjAsImV4cCI6MTYxNzM1MDIyMCwibmJmIjoxNDU5NjcwMjIwLCJqdGkiOiIwNjA5NTk4YTJjMzQ0M2UxZjg5NzlhZTA4MmMwNjc3YiJ9.GGWYMO7o7SKUs', '2016-04-03 08:02:50', '2016-04-03 08:06:21'),
(20, 3, '2016-04-03 08:06:26', '2016-04-03 08:12:25', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NzA3NzQsImV4cCI6MTYxNzM1MDc3NCwibmJmIjoxNDU5NjcwNzc0LCJqdGkiOiI2ZmI4ZTdjOTc5MWZjNmJlNTJjN2RmM2UwZjQ0ZWM1MiJ9.c-5uFmTRWqfk1', '2016-04-03 08:06:26', '2016-04-03 08:12:25'),
(21, 1, '2016-04-03 14:57:18', '2016-04-03 15:21:08', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2OTU0MzcsImV4cCI6MTYxNzM3NTQzNywibmJmIjoxNDU5Njk1NDM3LCJqdGkiOiJkNzEzYTI0YzU4ZGViN2NiZDZmMzlkOTVhNjBlYjAzNyJ9.wxXdNfnUcfrnA', '2016-04-03 14:57:18', '2016-04-03 15:21:08'),
(22, 1, '2016-04-03 15:00:34', '2016-04-03 15:02:25', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2OTU2MzMsImV4cCI6MTYxNzM3NTYzMywibmJmIjoxNDU5Njk1NjMzLCJqdGkiOiIyYWEwYmFmYzcwZGYxYjAyNzI3YzViYjBmMjEzNTcwNCJ9.5mcJ7YIh9kEH2', '2016-04-03 15:00:34', '2016-04-03 15:02:25'),
(23, 4, '2016-04-03 15:01:03', '2016-04-03 15:01:03', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NjQxMjgsImV4cCI6MTYxNzM0NDEyOCwibmJmIjoxNDU5NjY0MTI4LCJqdGkiOiI3NjhiNWVjN2U3ZTA2YmI1N2I0OWE0YTlhMDNkYWRhYSJ9.XVW_7X6rT', '2016-04-03 15:01:03', '2016-04-03 15:01:03'),
(24, 1, '2016-04-03 15:02:34', '2016-04-03 15:19:51', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2OTU2MzMsImV4cCI6MTYxNzM3NTYzMywibmJmIjoxNDU5Njk1NjMzLCJqdGkiOiIyYWEwYmFmYzcwZGYxYjAyNzI3YzViYjBmMjEzNTcwNCJ9.5mcJ7YIh9kEH2', '2016-04-03 15:02:34', '2016-04-03 15:19:51'),
(25, 4, '2016-04-03 15:05:45', '2016-04-03 15:05:45', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NjQxMjgsImV4cCI6MTYxNzM0NDEyOCwibmJmIjoxNDU5NjY0MTI4LCJqdGkiOiI3NjhiNWVjN2U3ZTA2YmI1N2I0OWE0YTlhMDNkYWRhYSJ9.XVW_7X6rT', '2016-04-03 15:05:45', '2016-04-03 15:05:45'),
(26, 1, '2016-04-03 15:06:08', '2016-04-03 15:06:24', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NTExNzcsImV4cCI6MTYxNzMzMTE3NywibmJmIjoxNDU5NjUxMTc3LCJqdGkiOiI4ZjE4ZWVkOTc2M2M3MzBiMzJhMzQ2MzViNjEwZmYxYyJ9.kP86N2q63usta', '2016-04-03 15:06:08', '2016-04-03 15:06:24'),
(27, 1, '2016-04-03 15:06:25', '2016-04-03 20:43:06', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NTExNzcsImV4cCI6MTYxNzMzMTE3NywibmJmIjoxNDU5NjUxMTc3LCJqdGkiOiI4ZjE4ZWVkOTc2M2M3MzBiMzJhMzQ2MzViNjEwZmYxYyJ9.kP86N2q63usta', '2016-04-03 15:06:25', '2016-04-03 20:43:06'),
(28, 4, '2016-04-03 15:13:52', '2016-04-03 15:13:52', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NjQxMjgsImV4cCI6MTYxNzM0NDEyOCwibmJmIjoxNDU5NjY0MTI4LCJqdGkiOiI3NjhiNWVjN2U3ZTA2YmI1N2I0OWE0YTlhMDNkYWRhYSJ9.XVW_7X6rT', '2016-04-03 15:13:52', '2016-04-03 15:13:52'),
(29, 1, '2016-04-03 15:14:41', '2016-04-03 19:57:04', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NTExNzcsImV4cCI6MTYxNzMzMTE3NywibmJmIjoxNDU5NjUxMTc3LCJqdGkiOiI4ZjE4ZWVkOTc2M2M3MzBiMzJhMzQ2MzViNjEwZmYxYyJ9.kP86N2q63usta', '2016-04-03 15:14:41', '2016-04-03 19:57:04'),
(30, 1, '2016-04-03 15:20:31', '2016-04-03 15:20:31', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2OTU2MzMsImV4cCI6MTYxNzM3NTYzMywibmJmIjoxNDU5Njk1NjMzLCJqdGkiOiIyYWEwYmFmYzcwZGYxYjAyNzI3YzViYjBmMjEzNTcwNCJ9.5mcJ7YIh9kEH2', '2016-04-03 15:20:31', '2016-04-03 15:20:31'),
(31, 6, '2016-04-03 15:47:52', '2016-04-03 15:48:05', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2OTU1MzgsImV4cCI6MTYxNzM3NTUzOCwibmJmIjoxNDU5Njk1NTM4LCJqdGkiOiI3NGM2YjIxZmFhYjIzYTI2ZWU3ODY0Y2VlNGUyNzI2YSJ9.3LFifGCFj', '2016-04-03 15:47:52', '2016-04-03 15:48:05'),
(32, 6, '2016-04-03 16:54:46', '2016-04-03 16:54:46', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2OTU1MzgsImV4cCI6MTYxNzM3NTUzOCwibmJmIjoxNDU5Njk1NTM4LCJqdGkiOiI3NGM2YjIxZmFhYjIzYTI2ZWU3ODY0Y2VlNGUyNzI2YSJ9.3LFifGCFj', '2016-04-03 16:54:46', '2016-04-03 16:54:46'),
(33, 1, '2016-04-03 16:58:20', '2016-04-03 17:06:36', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MDI2OTksImV4cCI6MTYxNzM4MjY5OSwibmJmIjoxNDU5NzAyNjk5LCJqdGkiOiJkOWRlZmRlNmJmYjU0ODBjMzY0Yjk1YjRjMDNhOWZjZiJ9.9SWAHz0eQxnh3', '2016-04-03 16:58:20', '2016-04-03 17:06:36'),
(34, 6, '2016-04-03 17:27:47', '2016-04-03 18:37:09', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2OTU1MzgsImV4cCI6MTYxNzM3NTUzOCwibmJmIjoxNDU5Njk1NTM4LCJqdGkiOiI3NGM2YjIxZmFhYjIzYTI2ZWU3ODY0Y2VlNGUyNzI2YSJ9.3LFifGCFj', '2016-04-03 17:27:47', '2016-04-03 18:37:09'),
(35, 7, '2016-04-03 18:03:54', '2016-04-03 18:03:54', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjcsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MDY2MzMsImV4cCI6MTYxNzM4NjYzMywibmJmIjoxNDU5NzA2NjMzLCJqdGkiOiJmY2Y1MzY1MDgwY2YwODcwMDBiZDQ4ODUzZDU4MDc0ZCJ9.JIxg3rlKu', '2016-04-03 18:03:54', '2016-04-03 18:03:54'),
(36, 7, '2016-04-03 18:03:55', '2016-04-03 18:09:30', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjcsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MDY2MzMsImV4cCI6MTYxNzM4NjYzMywibmJmIjoxNDU5NzA2NjMzLCJqdGkiOiJmY2Y1MzY1MDgwY2YwODcwMDBiZDQ4ODUzZDU4MDc0ZCJ9.JIxg3rlKu', '2016-04-03 18:03:55', '2016-04-03 18:09:30'),
(37, 1, '2016-04-03 19:23:46', '2016-04-03 19:23:54', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MDQ0NzMsImV4cCI6MTYxNzM4NDQ3MywibmJmIjoxNDU5NzA0NDczLCJqdGkiOiIyZDg2NTZkOGQ0NGU4MzVhZjk4YmUzZTQ5NzJiYTFkNCJ9.T0jArwtUsf9Xy', '2016-04-03 19:23:46', '2016-04-03 19:23:54'),
(38, 9, '2016-04-03 20:40:21', '2016-04-03 20:42:37', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MTYwMjAsImV4cCI6MTYxNzM5NjAyMCwibmJmIjoxNDU5NzE2MDIwLCJqdGkiOiI3MGU1NDBhODJkZTQxNzhkYTM2YTc5ZTk1M2IzYjZiNSJ9.hetTS_mx8orCx', '2016-04-03 20:40:21', '2016-04-03 20:42:37'),
(39, 3, '2016-04-03 23:18:06', '2016-04-03 23:18:11', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NzA4MjUsImV4cCI6MTYxNzM1MDgyNSwibmJmIjoxNDU5NjcwODI1LCJqdGkiOiI5NjdkNzVhYjQ1ZDNjNzNjNmY0ZjU0OTBlMmYyNGVlMCJ9.ozXFYIe3lBuHZ', '2016-04-03 23:18:06', '2016-04-03 23:18:11'),
(40, 3, '2016-04-03 23:18:11', '2016-04-04 00:02:45', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NzA4MjUsImV4cCI6MTYxNzM1MDgyNSwibmJmIjoxNDU5NjcwODI1LCJqdGkiOiI5NjdkNzVhYjQ1ZDNjNzNjNmY0ZjU0OTBlMmYyNGVlMCJ9.ozXFYIe3lBuHZ', '2016-04-03 23:18:11', '2016-04-04 00:02:45'),
(41, 3, '2016-04-04 00:07:09', '2016-04-04 00:07:16', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NzA4MjUsImV4cCI6MTYxNzM1MDgyNSwibmJmIjoxNDU5NjcwODI1LCJqdGkiOiI5NjdkNzVhYjQ1ZDNjNzNjNmY0ZjU0OTBlMmYyNGVlMCJ9.ozXFYIe3lBuHZ', '2016-04-04 00:07:09', '2016-04-04 00:07:16'),
(42, 3, '2016-04-04 00:07:18', '2016-04-04 00:07:22', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NzA4MjUsImV4cCI6MTYxNzM1MDgyNSwibmJmIjoxNDU5NjcwODI1LCJqdGkiOiI5NjdkNzVhYjQ1ZDNjNzNjNmY0ZjU0OTBlMmYyNGVlMCJ9.ozXFYIe3lBuHZ', '2016-04-04 00:07:18', '2016-04-04 00:07:22'),
(43, 3, '2016-04-04 00:07:22', '2016-04-04 00:07:22', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk2NzA4MjUsImV4cCI6MTYxNzM1MDgyNSwibmJmIjoxNDU5NjcwODI1LCJqdGkiOiI5NjdkNzVhYjQ1ZDNjNzNjNmY0ZjU0OTBlMmYyNGVlMCJ9.ozXFYIe3lBuHZ', '2016-04-04 00:07:22', '2016-04-04 00:07:22'),
(44, 2, '2016-04-04 00:07:43', '2016-04-04 01:56:41', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3Mjg0NjMsImV4cCI6MTYxNzQwODQ2MywibmJmIjoxNDU5NzI4NDYzLCJqdGkiOiJkZGQ3NWVjY2I5OTNlOWU4MDJiZDFkYjYzYjQxNzA4MCJ9.r1IRj2x59Ts6f', '2016-04-04 00:07:43', '2016-04-04 01:56:41'),
(45, 1, '2016-04-04 01:30:36', '2016-04-04 01:49:35', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MDQ0NzMsImV4cCI6MTYxNzM4NDQ3MywibmJmIjoxNDU5NzA0NDczLCJqdGkiOiIyZDg2NTZkOGQ0NGU4MzVhZjk4YmUzZTQ5NzJiYTFkNCJ9.T0jArwtUsf9Xy', '2016-04-04 01:30:36', '2016-04-04 01:49:35'),
(46, 1, '2016-04-04 01:49:37', '2016-04-04 02:01:01', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MzM3MzcsImV4cCI6MTYxNzQxMzczNywibmJmIjoxNDU5NzMzNzM3LCJqdGkiOiJlNWE5YTg1ZjBiNGEyNzZlZTU0YjNkMDk4OTZmZjIzNiJ9.q_f4u0n87_lHj', '2016-04-04 01:49:37', '2016-04-04 02:01:01'),
(47, 2, '2016-04-04 01:56:44', '2016-04-04 02:56:52', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3Mjg0NjMsImV4cCI6MTYxNzQwODQ2MywibmJmIjoxNDU5NzI4NDYzLCJqdGkiOiJkZGQ3NWVjY2I5OTNlOWU4MDJiZDFkYjYzYjQxNzA4MCJ9.r1IRj2x59Ts6f', '2016-04-04 01:56:44', '2016-04-04 02:56:52'),
(48, 1, '2016-04-04 02:01:10', '2016-04-04 02:12:30', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MzM3MzcsImV4cCI6MTYxNzQxMzczNywibmJmIjoxNDU5NzMzNzM3LCJqdGkiOiJlNWE5YTg1ZjBiNGEyNzZlZTU0YjNkMDk4OTZmZjIzNiJ9.q_f4u0n87_lHj', '2016-04-04 02:01:10', '2016-04-04 02:12:30'),
(49, 1, '2016-04-04 02:12:37', '2016-04-04 02:14:58', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MzM3MzcsImV4cCI6MTYxNzQxMzczNywibmJmIjoxNDU5NzMzNzM3LCJqdGkiOiJlNWE5YTg1ZjBiNGEyNzZlZTU0YjNkMDk4OTZmZjIzNiJ9.q_f4u0n87_lHj', '2016-04-04 02:12:37', '2016-04-04 02:14:58'),
(50, 1, '2016-04-04 02:15:04', '2016-04-04 02:15:04', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MzM3MzcsImV4cCI6MTYxNzQxMzczNywibmJmIjoxNDU5NzMzNzM3LCJqdGkiOiJlNWE5YTg1ZjBiNGEyNzZlZTU0YjNkMDk4OTZmZjIzNiJ9.q_f4u0n87_lHj', '2016-04-04 02:15:04', '2016-04-04 02:15:04'),
(51, 9, '2016-04-04 02:16:39', '2016-04-04 02:24:05', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MTYxNTYsImV4cCI6MTYxNzM5NjE1NiwibmJmIjoxNDU5NzE2MTU2LCJqdGkiOiJmYTE4ZDBmN2I4ZTBlZmMxNDZjZDg3YTJkNmNhOWU1YSJ9.moX7CI7Rkcu5X', '2016-04-04 02:16:39', '2016-04-04 02:24:05'),
(52, 2, '2016-04-04 02:56:56', '2016-04-04 04:04:36', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3Mjg0NjMsImV4cCI6MTYxNzQwODQ2MywibmJmIjoxNDU5NzI4NDYzLCJqdGkiOiJkZGQ3NWVjY2I5OTNlOWU4MDJiZDFkYjYzYjQxNzA4MCJ9.r1IRj2x59Ts6f', '2016-04-04 02:56:56', '2016-04-04 04:04:36'),
(53, 3, '2016-04-04 04:04:40', '2016-04-04 04:05:47', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NDIzMDAsImV4cCI6MTYxNzQyMjMwMCwibmJmIjoxNDU5NzQyMzAwLCJqdGkiOiJmOWI1ODNiNDc4ZmY0YmQ5ZDM5MDg5ZTIxN2VhMTVkNSJ9.rC7rCk8FJ2RH3', '2016-04-04 04:04:40', '2016-04-04 04:05:47'),
(54, 3, '2016-04-04 04:05:49', '2016-04-04 04:06:49', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NDI3NDMsImV4cCI6MTYxNzQyMjc0MywibmJmIjoxNDU5NzQyNzQzLCJqdGkiOiJmZThkNDAxNjY3ZjU1N2VjNDgxZmUxODdmNjhlZDQyNiJ9.AfUGTmX5H_-Ce', '2016-04-04 04:05:49', '2016-04-04 04:06:49'),
(55, 9, '2016-04-04 06:29:53', '2016-04-04 06:29:53', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NTEzOTIsImV4cCI6MTYxNzQzMTM5MiwibmJmIjoxNDU5NzUxMzkyLCJqdGkiOiJjY2U5N2FlYTI2OWJlZDdjYzdiNjU0NTcwZmE4YmU4YyJ9.PT-iCujtiYzdp', '2016-04-04 06:29:53', '2016-04-04 06:29:53'),
(56, 3, '2016-04-04 08:31:06', '2016-04-04 08:31:06', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NDI3NDMsImV4cCI6MTYxNzQyMjc0MywibmJmIjoxNDU5NzQyNzQzLCJqdGkiOiJmZThkNDAxNjY3ZjU1N2VjNDgxZmUxODdmNjhlZDQyNiJ9.AfUGTmX5H_-Ce', '2016-04-04 08:31:06', '2016-04-04 08:31:06'),
(57, 9, '2016-04-04 09:14:31', '2016-04-04 09:21:29', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NjEyNzAsImV4cCI6MTYxNzQ0MTI3MCwibmJmIjoxNDU5NzYxMjcwLCJqdGkiOiIzMzk0OTE5NDkzNDAzNjFlYWIzODY1NzNmYzI2MmM5NCJ9.aOm8B5028RHh_', '2016-04-04 09:14:31', '2016-04-04 09:21:29'),
(58, 9, '2016-04-04 09:17:21', '2016-04-04 09:17:28', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NjE0NDAsImV4cCI6MTYxNzQ0MTQ0MCwibmJmIjoxNDU5NzYxNDQwLCJqdGkiOiIyZmQwMWRmYmYyMTNjNmVlYzBhYjIyMDQxNjJkM2U4NyJ9.FAyVuCbpAwdKY', '2016-04-04 09:17:21', '2016-04-04 09:17:28'),
(59, 9, '2016-04-04 09:17:45', '2016-04-04 09:18:30', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NjE0NDAsImV4cCI6MTYxNzQ0MTQ0MCwibmJmIjoxNDU5NzYxNDQwLCJqdGkiOiIyZmQwMWRmYmYyMTNjNmVlYzBhYjIyMDQxNjJkM2U4NyJ9.FAyVuCbpAwdKY', '2016-04-04 09:17:45', '2016-04-04 09:18:30'),
(60, 9, '2016-04-04 09:18:18', '2016-04-04 09:18:30', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NjE0NDAsImV4cCI6MTYxNzQ0MTQ0MCwibmJmIjoxNDU5NzYxNDQwLCJqdGkiOiIyZmQwMWRmYmYyMTNjNmVlYzBhYjIyMDQxNjJkM2U4NyJ9.FAyVuCbpAwdKY', '2016-04-04 09:18:18', '2016-04-04 09:18:30'),
(61, 9, '2016-04-04 09:18:30', '2016-04-04 09:18:46', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NjE0NDAsImV4cCI6MTYxNzQ0MTQ0MCwibmJmIjoxNDU5NzYxNDQwLCJqdGkiOiIyZmQwMWRmYmYyMTNjNmVlYzBhYjIyMDQxNjJkM2U4NyJ9.FAyVuCbpAwdKY', '2016-04-04 09:18:30', '2016-04-04 09:18:46'),
(62, 9, '2016-04-04 09:18:46', '2016-04-04 09:19:05', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NjE0NDAsImV4cCI6MTYxNzQ0MTQ0MCwibmJmIjoxNDU5NzYxNDQwLCJqdGkiOiIyZmQwMWRmYmYyMTNjNmVlYzBhYjIyMDQxNjJkM2U4NyJ9.FAyVuCbpAwdKY', '2016-04-04 09:18:46', '2016-04-04 09:19:05'),
(63, 9, '2016-04-04 09:19:08', '2016-04-04 09:20:50', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NjE0NDAsImV4cCI6MTYxNzQ0MTQ0MCwibmJmIjoxNDU5NzYxNDQwLCJqdGkiOiIyZmQwMWRmYmYyMTNjNmVlYzBhYjIyMDQxNjJkM2U4NyJ9.FAyVuCbpAwdKY', '2016-04-04 09:19:08', '2016-04-04 09:20:50'),
(64, 9, '2016-04-04 09:21:16', '2016-04-04 09:21:16', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NjE1OTEsImV4cCI6MTYxNzQ0MTU5MSwibmJmIjoxNDU5NzYxNTkxLCJqdGkiOiIzYTk4MWQyNjA3ZTQ2OGRhZjY5ZTk2NGQ3YzZlNGZkNiJ9.qzHxCJN-w262M', '2016-04-04 09:21:16', '2016-04-04 09:21:16'),
(65, 9, '2016-04-04 09:22:13', '2016-04-04 09:22:13', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NjEyNzAsImV4cCI6MTYxNzQ0MTI3MCwibmJmIjoxNDU5NzYxMjcwLCJqdGkiOiIzMzk0OTE5NDkzNDAzNjFlYWIzODY1NzNmYzI2MmM5NCJ9.aOm8B5028RHh_', '2016-04-04 09:22:13', '2016-04-04 09:22:13'),
(66, 9, '2016-04-04 09:24:44', '2016-04-04 10:19:51', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NjEyNzAsImV4cCI6MTYxNzQ0MTI3MCwibmJmIjoxNDU5NzYxMjcwLCJqdGkiOiIzMzk0OTE5NDkzNDAzNjFlYWIzODY1NzNmYzI2MmM5NCJ9.aOm8B5028RHh_', '2016-04-04 09:24:44', '2016-04-04 10:19:51'),
(67, 1, '2016-04-04 12:15:08', '2016-04-04 12:15:26', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MzM3MzcsImV4cCI6MTYxNzQxMzczNywibmJmIjoxNDU5NzMzNzM3LCJqdGkiOiJlNWE5YTg1ZjBiNGEyNzZlZTU0YjNkMDk4OTZmZjIzNiJ9.q_f4u0n87_lHj', '2016-04-04 12:15:08', '2016-04-04 12:15:26'),
(68, 1, '2016-04-04 12:15:37', '2016-04-04 12:16:55', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MzM3MzcsImV4cCI6MTYxNzQxMzczNywibmJmIjoxNDU5NzMzNzM3LCJqdGkiOiJlNWE5YTg1ZjBiNGEyNzZlZTU0YjNkMDk4OTZmZjIzNiJ9.q_f4u0n87_lHj', '2016-04-04 12:15:37', '2016-04-04 12:16:55'),
(69, 9, '2016-04-04 12:16:55', '2016-04-04 12:28:24', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NzIyMTQsImV4cCI6MTYxNzQ1MjIxNCwibmJmIjoxNDU5NzcyMjE0LCJqdGkiOiIzOTNiMWFhMzY2ODk0MWI1YzRkMTZkNDM4N2E1M2VlZCJ9.cJ2T9Qr13Z3PW', '2016-04-04 12:16:55', '2016-04-04 12:28:24'),
(70, 6, '2016-04-04 12:17:06', '2016-04-04 12:29:29', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NzIyMDQsImV4cCI6MTYxNzQ1MjIwNCwibmJmIjoxNDU5NzcyMjA0LCJqdGkiOiJkNzEzMzRjMTFiMTAxNWQ4YmViMzczYzI4Y2Y4ZjM5NyJ9.AbzGFLQty', '2016-04-04 12:17:06', '2016-04-04 12:29:29'),
(71, 1, '2016-04-04 12:18:27', '2016-04-04 12:20:09', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NzIzMDcsImV4cCI6MTYxNzQ1MjMwNywibmJmIjoxNDU5NzcyMzA3LCJqdGkiOiI4ZTY3ZjgwODlmYWUxNzQ0ZmViZmE1OTA3ZmI3MmE0YSJ9.4Qs5f35R-vbhX', '2016-04-04 12:18:27', '2016-04-04 12:20:09'),
(72, 4, '2016-04-04 12:20:16', '2016-04-04 12:30:15', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NzIzODQsImV4cCI6MTYxNzQ1MjM4NCwibmJmIjoxNDU5NzcyMzg0LCJqdGkiOiIwNmE1YmY0ZmRlZDJiN2M0YzEzYWU0MjcwMmU5MmNhNiJ9.KUJAI3M98', '2016-04-04 12:20:16', '2016-04-04 12:30:15'),
(73, 9, '2016-04-04 12:28:40', '2016-04-04 12:29:17', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NzIyMTQsImV4cCI6MTYxNzQ1MjIxNCwibmJmIjoxNDU5NzcyMjE0LCJqdGkiOiIzOTNiMWFhMzY2ODk0MWI1YzRkMTZkNDM4N2E1M2VlZCJ9.cJ2T9Qr13Z3PW', '2016-04-04 12:28:40', '2016-04-04 12:29:17'),
(74, 4, '2016-04-04 12:30:21', '2016-04-04 12:34:02', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NzI5NDcsImV4cCI6MTYxNzQ1Mjk0NywibmJmIjoxNDU5NzcyOTQ3LCJqdGkiOiJiM2ExNjczMTA5NDNkMTI5NDE3YmRmZjI3MmQyNmQyMiJ9.C9GAMvpKG', '2016-04-04 12:30:21', '2016-04-04 12:34:02'),
(75, 9, '2016-04-04 12:34:19', '2016-04-04 12:37:11', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NzMyNTgsImV4cCI6MTYxNzQ1MzI1OCwibmJmIjoxNDU5NzczMjU4LCJqdGkiOiJlMTQwMzZiNDYzYzJiNzg1ZTI4NWY3MmY3YjdjODU0YyJ9.0b9Lgcsdo0JUa', '2016-04-04 12:34:19', '2016-04-04 12:37:11'),
(76, 4, '2016-04-04 12:37:18', '2016-04-04 15:25:11', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NzM0MTUsImV4cCI6MTYxNzQ1MzQxNSwibmJmIjoxNDU5NzczNDE1LCJqdGkiOiJkMDEyOThjZDgyNDBmMGY4MDU2YWM3ZWFiODI2Zjk2OSJ9.azdynMi1G', '2016-04-04 12:37:18', '2016-04-04 15:25:11'),
(77, 4, '2016-04-04 12:38:01', '2016-04-04 14:47:16', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NzM0ODAsImV4cCI6MTYxNzQ1MzQ4MCwibmJmIjoxNDU5NzczNDgwLCJqdGkiOiJiZmE0ZWY5NDU5OTZiNThiMTNhMjgxZTQzZGY5MGMyOCJ9.bnuPLPzHH', '2016-04-04 12:38:01', '2016-04-04 14:47:16'),
(78, 6, '2016-04-04 12:45:20', '2016-04-04 12:45:25', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NzIzMzEsImV4cCI6MTYxNzQ1MjMzMSwibmJmIjoxNDU5NzcyMzMxLCJqdGkiOiJhYjc4YjNkMWYxNDhjZjJhNjEyNWNmMzZjMDcwNzhkNiJ9.nNFHkozmF', '2016-04-04 12:45:20', '2016-04-04 12:45:25'),
(79, 6, '2016-04-04 12:45:34', '2016-04-04 12:45:34', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NzIzMzEsImV4cCI6MTYxNzQ1MjMzMSwibmJmIjoxNDU5NzcyMzMxLCJqdGkiOiJhYjc4YjNkMWYxNDhjZjJhNjEyNWNmMzZjMDcwNzhkNiJ9.nNFHkozmF', '2016-04-04 12:45:34', '2016-04-04 12:45:34'),
(80, 1, '2016-04-04 13:04:21', '2016-04-04 13:11:53', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NzUwNjAsImV4cCI6MTYxNzQ1NTA2MCwibmJmIjoxNDU5Nzc1MDYwLCJqdGkiOiI5NzI5ZmFjMDVmODE2ODE5MDU5Y2UyYzk1YzdjODE1YyJ9.AiLkewxUDlA7T', '2016-04-04 13:04:21', '2016-04-04 13:11:53'),
(81, 1, '2016-04-04 14:41:07', '2016-04-05 04:36:34', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODA4NjYsImV4cCI6MTYxNzQ2MDg2NiwibmJmIjoxNDU5NzgwODY2LCJqdGkiOiIzOTc2ZmE5ZjE4N2I4MWMyMjM3YjFmNTNiZmIwOTE5OCJ9.J-79gFHZ6hOKW', '2016-04-04 14:41:07', '2016-04-05 04:36:34'),
(82, 9, '2016-04-04 14:49:39', '2016-04-04 15:28:00', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODEzNzgsImV4cCI6MTYxNzQ2MTM3OCwibmJmIjoxNDU5NzgxMzc4LCJqdGkiOiI4ZDZmNjcwMGI1ZGVhNmI5ZDI2YjUyMjhhYmViZDZiZCJ9.BP1fW9MrTA8AQ', '2016-04-04 14:49:39', '2016-04-04 15:28:00'),
(83, 4, '2016-04-04 15:25:39', '2016-04-04 15:25:39', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODA5NzUsImV4cCI6MTYxNzQ2MDk3NSwibmJmIjoxNDU5NzgwOTc1LCJqdGkiOiI4NGExMGYwYjFlYWIzZjlmMmM5M2QxODM5NmQ4MzUxZCJ9.to8NOPBG7', '2016-04-04 15:25:39', '2016-04-04 15:25:39'),
(84, 9, '2016-04-04 15:28:11', '2016-04-04 17:58:47', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODEzNzgsImV4cCI6MTYxNzQ2MTM3OCwibmJmIjoxNDU5NzgxMzc4LCJqdGkiOiI4ZDZmNjcwMGI1ZGVhNmI5ZDI2YjUyMjhhYmViZDZiZCJ9.BP1fW9MrTA8AQ', '2016-04-04 15:28:11', '2016-04-04 17:58:47'),
(85, 1, '2016-04-04 15:56:14', '2016-04-04 17:15:44', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODUzNzMsImV4cCI6MTYxNzQ2NTM3MywibmJmIjoxNDU5Nzg1MzczLCJqdGkiOiI3M2VjZjg2YzAxMDg2N2U4YzFmNjM2NzkzNTIxZTEwMiJ9.CA9vqb0ngq_KL', '2016-04-04 15:56:14', '2016-04-04 17:15:44'),
(86, 1, '2016-04-04 16:38:57', '2016-04-04 16:39:31', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODc5MzYsImV4cCI6MTYxNzQ2NzkzNiwibmJmIjoxNDU5Nzg3OTM2LCJqdGkiOiJlNDkwMDViOWU1NmU3OTRkMjliMjhiODFjM2Q3ZGNiYSJ9.aphYTNr7zzgvX', '2016-04-04 16:38:57', '2016-04-04 16:39:31'),
(87, 6, '2016-04-04 16:39:40', '2016-04-04 17:02:14', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODc5NDksImV4cCI6MTYxNzQ2Nzk0OSwibmJmIjoxNDU5Nzg3OTQ5LCJqdGkiOiIyMDA0NzNjOGJhOWFiM2E5YmY3MDI4MTNkYWM1OGZjNCJ9.zPjF1XO1c', '2016-04-04 16:39:40', '2016-04-04 17:02:14'),
(88, 4, '2016-04-04 16:50:04', '2016-04-04 17:13:27', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODg2MDMsImV4cCI6MTYxNzQ2ODYwMywibmJmIjoxNDU5Nzg4NjAzLCJqdGkiOiIwNjFkODNkYWUxMTE1OTliOGVjZjdiMGY3YWMyNWNiNiJ9.Ugc0YrFWd', '2016-04-04 16:50:04', '2016-04-04 17:13:27'),
(89, 9, '2016-04-04 16:52:30', '2016-04-04 16:52:44', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODEzMTIsImV4cCI6MTYxNzQ2MTMxMiwibmJmIjoxNDU5NzgxMzEyLCJqdGkiOiI1YmRmODNkOTY4MTJhMmNiMzBjMDBlNDEzOGNiMjU0YiJ9.p6yB3WjPWAhP9', '2016-04-04 16:52:30', '2016-04-04 16:52:44'),
(90, 9, '2016-04-04 16:52:52', '2016-04-04 17:00:20', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODEzMTIsImV4cCI6MTYxNzQ2MTMxMiwibmJmIjoxNDU5NzgxMzEyLCJqdGkiOiI1YmRmODNkOTY4MTJhMmNiMzBjMDBlNDEzOGNiMjU0YiJ9.p6yB3WjPWAhP9', '2016-04-04 16:52:52', '2016-04-04 17:00:20'),
(91, 6, '2016-04-04 16:54:39', '2016-04-04 16:54:39', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODg4NzgsImV4cCI6MTYxNzQ2ODg3OCwibmJmIjoxNDU5Nzg4ODc4LCJqdGkiOiJiYTQ3YTJlNTUyZTliODA0MmNkODVlNTkyMjVhYTNiYSJ9.QLKhiyrMx', '2016-04-04 16:54:39', '2016-04-04 16:54:39'),
(92, 6, '2016-04-04 16:54:45', '2016-04-04 16:55:32', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODg4NzgsImV4cCI6MTYxNzQ2ODg3OCwibmJmIjoxNDU5Nzg4ODc4LCJqdGkiOiJiYTQ3YTJlNTUyZTliODA0MmNkODVlNTkyMjVhYTNiYSJ9.QLKhiyrMx', '2016-04-04 16:54:45', '2016-04-04 16:55:32'),
(93, 6, '2016-04-04 16:55:33', '2016-04-04 16:57:42', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODg4NzgsImV4cCI6MTYxNzQ2ODg3OCwibmJmIjoxNDU5Nzg4ODc4LCJqdGkiOiJiYTQ3YTJlNTUyZTliODA0MmNkODVlNTkyMjVhYTNiYSJ9.QLKhiyrMx', '2016-04-04 16:55:33', '2016-04-04 16:57:42'),
(94, 9, '2016-04-04 17:00:54', '2016-04-04 17:12:46', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODkyNTMsImV4cCI6MTYxNzQ2OTI1MywibmJmIjoxNDU5Nzg5MjUzLCJqdGkiOiI1ZDQ1MmJiMjY5NGRjZmNhNDJmMjlkMzBmMjBiMTUwZSJ9.g67APAYmR9Vn0', '2016-04-04 17:00:54', '2016-04-04 17:12:46'),
(95, 1, '2016-04-04 17:02:24', '2016-04-04 17:14:15', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODkwMzEsImV4cCI6MTYxNzQ2OTAzMSwibmJmIjoxNDU5Nzg5MDMxLCJqdGkiOiI5YzY2YmM2ZjAxMDg1N2VkMTBiOTAyNjFhMzkyNTQ2NyJ9.Eq3OS16fBjfP9', '2016-04-04 17:02:24', '2016-04-04 17:14:15'),
(96, 4, '2016-04-04 17:12:59', '2016-04-04 17:47:13', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODk2MjEsImV4cCI6MTYxNzQ2OTYyMSwibmJmIjoxNDU5Nzg5NjIxLCJqdGkiOiIyMTgwZjc4ZWEzMzcxNDllYTg3ZjNjZGNkNjc3OTgzYSJ9.TalZuatLx', '2016-04-04 17:12:59', '2016-04-04 17:47:13'),
(97, 4, '2016-04-04 17:13:37', '2016-04-04 17:56:21', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODg2MDMsImV4cCI6MTYxNzQ2ODYwMywibmJmIjoxNDU5Nzg4NjAzLCJqdGkiOiIwNjFkODNkYWUxMTE1OTliOGVjZjdiMGY3YWMyNWNiNiJ9.Ugc0YrFWd', '2016-04-04 17:13:37', '2016-04-04 17:56:21'),
(98, 6, '2016-04-04 17:14:26', '2016-04-04 17:59:54', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODkzNzcsImV4cCI6MTYxNzQ2OTM3NywibmJmIjoxNDU5Nzg5Mzc3LCJqdGkiOiJjMTBjZWJlODNhNThhZTExY2VkNGM2OWQyMGQ5MDAxZSJ9.lLtumk5gs', '2016-04-04 17:14:26', '2016-04-04 17:59:54'),
(99, 1, '2016-04-04 17:15:47', '2016-04-04 17:31:03', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTAxNDEsImV4cCI6MTYxNzQ3MDE0MSwibmJmIjoxNDU5NzkwMTQxLCJqdGkiOiJiNTBkNGI0MWM1MDNiMWYxN2ZlN2RjM2Q0NDM3N2JlNCJ9.NZhSmwyeBVvtf', '2016-04-04 17:15:47', '2016-04-04 17:31:03'),
(100, 9, '2016-04-04 17:58:56', '2016-04-04 17:59:29', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODEzNzgsImV4cCI6MTYxNzQ2MTM3OCwibmJmIjoxNDU5NzgxMzc4LCJqdGkiOiI4ZDZmNjcwMGI1ZGVhNmI5ZDI2YjUyMjhhYmViZDZiZCJ9.BP1fW9MrTA8AQ', '2016-04-04 17:58:56', '2016-04-04 17:59:29'),
(101, 6, '2016-04-04 18:00:04', '2016-04-04 18:02:58', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTE2NDIsImV4cCI6MTYxNzQ3MTY0MiwibmJmIjoxNDU5NzkxNjQyLCJqdGkiOiJmM2RlZmI0MmZkZDg4ZGZiZjRmOGJhNzA3ZTNjMzJiMCJ9.Yk7ShwW6D', '2016-04-04 18:00:04', '2016-04-04 18:02:58'),
(102, 10, '2016-04-04 18:01:50', '2016-04-04 18:04:36', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5NzkyOTA4LCJleHAiOjE2MTc0NzI5MDgsIm5iZiI6MTQ1OTc5MjkwOCwianRpIjoiNGFlMWQ5YTY5YTg3MDA1MWRiNTJmYzM5NDQwYmE4ZDYifQ.qqTngh8Y5fE', '2016-04-04 18:01:50', '2016-04-04 18:04:36'),
(103, 6, '2016-04-04 18:03:07', '2016-04-04 18:04:15', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTE2NDIsImV4cCI6MTYxNzQ3MTY0MiwibmJmIjoxNDU5NzkxNjQyLCJqdGkiOiJmM2RlZmI0MmZkZDg4ZGZiZjRmOGJhNzA3ZTNjMzJiMCJ9.Yk7ShwW6D', '2016-04-04 18:03:07', '2016-04-04 18:04:15'),
(104, 6, '2016-04-04 18:04:22', '2016-04-04 18:05:50', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTE2NDIsImV4cCI6MTYxNzQ3MTY0MiwibmJmIjoxNDU5NzkxNjQyLCJqdGkiOiJmM2RlZmI0MmZkZDg4ZGZiZjRmOGJhNzA3ZTNjMzJiMCJ9.Yk7ShwW6D', '2016-04-04 18:04:22', '2016-04-04 18:05:50'),
(105, 10, '2016-04-04 18:04:37', '2016-04-04 18:11:12', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5NzkyOTA4LCJleHAiOjE2MTc0NzI5MDgsIm5iZiI6MTQ1OTc5MjkwOCwianRpIjoiNGFlMWQ5YTY5YTg3MDA1MWRiNTJmYzM5NDQwYmE4ZDYifQ.qqTngh8Y5fE', '2016-04-04 18:04:37', '2016-04-04 18:11:12'),
(106, 1, '2016-04-04 18:05:30', '2016-04-04 18:12:45', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTAxNDEsImV4cCI6MTYxNzQ3MDE0MSwibmJmIjoxNDU5NzkwMTQxLCJqdGkiOiJiNTBkNGI0MWM1MDNiMWYxN2ZlN2RjM2Q0NDM3N2JlNCJ9.NZhSmwyeBVvtf', '2016-04-04 18:05:30', '2016-04-04 18:12:45'),
(107, 1, '2016-04-04 18:05:46', '2016-04-04 18:09:08', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTAxNDEsImV4cCI6MTYxNzQ3MDE0MSwibmJmIjoxNDU5NzkwMTQxLCJqdGkiOiJiNTBkNGI0MWM1MDNiMWYxN2ZlN2RjM2Q0NDM3N2JlNCJ9.NZhSmwyeBVvtf', '2016-04-04 18:05:46', '2016-04-04 18:09:08'),
(108, 6, '2016-04-04 18:06:00', '2016-04-04 18:07:25', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTE2NDIsImV4cCI6MTYxNzQ3MTY0MiwibmJmIjoxNDU5NzkxNjQyLCJqdGkiOiJmM2RlZmI0MmZkZDg4ZGZiZjRmOGJhNzA3ZTNjMzJiMCJ9.Yk7ShwW6D', '2016-04-04 18:06:00', '2016-04-04 18:07:25'),
(109, 6, '2016-04-04 18:07:35', '2016-04-04 18:08:15', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTE2NDIsImV4cCI6MTYxNzQ3MTY0MiwibmJmIjoxNDU5NzkxNjQyLCJqdGkiOiJmM2RlZmI0MmZkZDg4ZGZiZjRmOGJhNzA3ZTNjMzJiMCJ9.Yk7ShwW6D', '2016-04-04 18:07:35', '2016-04-04 18:08:15'),
(110, 6, '2016-04-04 18:08:24', '2016-04-04 18:11:08', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTE2NDIsImV4cCI6MTYxNzQ3MTY0MiwibmJmIjoxNDU5NzkxNjQyLCJqdGkiOiJmM2RlZmI0MmZkZDg4ZGZiZjRmOGJhNzA3ZTNjMzJiMCJ9.Yk7ShwW6D', '2016-04-04 18:08:24', '2016-04-04 18:11:08'),
(111, 6, '2016-04-04 18:11:18', '2016-04-04 18:13:04', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTE2NDIsImV4cCI6MTYxNzQ3MTY0MiwibmJmIjoxNDU5NzkxNjQyLCJqdGkiOiJmM2RlZmI0MmZkZDg4ZGZiZjRmOGJhNzA3ZTNjMzJiMCJ9.Yk7ShwW6D', '2016-04-04 18:11:18', '2016-04-04 18:13:04'),
(112, 10, '2016-04-04 18:11:28', '2016-04-04 18:11:54', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5NzkyOTA4LCJleHAiOjE2MTc0NzI5MDgsIm5iZiI6MTQ1OTc5MjkwOCwianRpIjoiNGFlMWQ5YTY5YTg3MDA1MWRiNTJmYzM5NDQwYmE4ZDYifQ.qqTngh8Y5fE', '2016-04-04 18:11:28', '2016-04-04 18:11:54'),
(113, 10, '2016-04-04 18:12:00', '2016-04-04 18:12:22', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5NzkyOTA4LCJleHAiOjE2MTc0NzI5MDgsIm5iZiI6MTQ1OTc5MjkwOCwianRpIjoiNGFlMWQ5YTY5YTg3MDA1MWRiNTJmYzM5NDQwYmE4ZDYifQ.qqTngh8Y5fE', '2016-04-04 18:12:00', '2016-04-04 18:12:22'),
(114, 10, '2016-04-04 18:12:23', '2016-04-04 18:12:23', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5NzkyOTA4LCJleHAiOjE2MTc0NzI5MDgsIm5iZiI6MTQ1OTc5MjkwOCwianRpIjoiNGFlMWQ5YTY5YTg3MDA1MWRiNTJmYzM5NDQwYmE4ZDYifQ.qqTngh8Y5fE', '2016-04-04 18:12:23', '2016-04-04 18:12:23'),
(115, 2, '2016-04-04 18:12:48', '2016-04-04 18:19:16', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTM1NTUsImV4cCI6MTYxNzQ3MzU1NSwibmJmIjoxNDU5NzkzNTU1LCJqdGkiOiIxZjczMWNiNmJjYWI3ZTExMTAxNjE5OTg1MDY5YTNjMCJ9.lC5HDcP62FWXu', '2016-04-04 18:12:48', '2016-04-04 18:19:16'),
(116, 6, '2016-04-04 18:13:05', '2016-04-04 18:13:17', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTE2NDIsImV4cCI6MTYxNzQ3MTY0MiwibmJmIjoxNDU5NzkxNjQyLCJqdGkiOiJmM2RlZmI0MmZkZDg4ZGZiZjRmOGJhNzA3ZTNjMzJiMCJ9.Yk7ShwW6D', '2016-04-04 18:13:05', '2016-04-04 18:13:17'),
(117, 6, '2016-04-04 18:13:24', '2016-04-04 18:14:34', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTE2NDIsImV4cCI6MTYxNzQ3MTY0MiwibmJmIjoxNDU5NzkxNjQyLCJqdGkiOiJmM2RlZmI0MmZkZDg4ZGZiZjRmOGJhNzA3ZTNjMzJiMCJ9.Yk7ShwW6D', '2016-04-04 18:13:24', '2016-04-04 18:14:34'),
(118, 2, '2016-04-04 18:19:17', '2016-04-04 18:43:04', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTM1NTUsImV4cCI6MTYxNzQ3MzU1NSwibmJmIjoxNDU5NzkzNTU1LCJqdGkiOiIxZjczMWNiNmJjYWI3ZTExMTAxNjE5OTg1MDY5YTNjMCJ9.lC5HDcP62FWXu', '2016-04-04 18:19:17', '2016-04-04 18:43:04'),
(119, 1, '2016-04-04 18:59:12', '2016-04-04 19:03:47', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTYzNTIsImV4cCI6MTYxNzQ3NjM1MiwibmJmIjoxNDU5Nzk2MzUyLCJqdGkiOiI1M2NjNTMwZWNiMzgwOGUyNzBmZGRhOGM4MzQ1MjJmYSJ9.41g2Vg0oDujTH', '2016-04-04 18:59:12', '2016-04-04 19:03:47'),
(120, 1, '2016-04-04 19:03:49', '2016-04-04 20:04:19', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTYzNTIsImV4cCI6MTYxNzQ3NjM1MiwibmJmIjoxNDU5Nzk2MzUyLCJqdGkiOiI1M2NjNTMwZWNiMzgwOGUyNzBmZGRhOGM4MzQ1MjJmYSJ9.41g2Vg0oDujTH', '2016-04-04 19:03:49', '2016-04-04 20:04:19'),
(121, 12, '2016-04-04 20:04:21', '2016-04-04 20:04:23', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEyLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5ODAwMjQ2LCJleHAiOjE2MTc0ODAyNDYsIm5iZiI6MTQ1OTgwMDI0NiwianRpIjoiYTZlNGZiZTcwMDJlNjM1YjU4NGFmYjBmYWY4MTk4ZWQifQ.bAbX8YF', '2016-04-04 20:04:21', '2016-04-04 20:04:23'),
(122, 1, '2016-04-04 20:09:23', '2016-04-04 20:30:05', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk4MDA1NjIsImV4cCI6MTYxNzQ4MDU2MiwibmJmIjoxNDU5ODAwNTYyLCJqdGkiOiI2Zjg5OTRmZWVjMTNmMGVmZGQ4OTA3OWE5ZGY0OTA3NCJ9.Dw_OL-QWhZuqv', '2016-04-04 20:09:23', '2016-04-04 20:30:05'),
(123, 12, '2016-04-04 20:30:06', '2016-04-04 21:26:06', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEyLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5ODAxNjI5LCJleHAiOjE2MTc0ODE2MjksIm5iZiI6MTQ1OTgwMTYyOSwianRpIjoiMTY3ZjBlNTZjZTY5ZjgzNDBhMWUyYWZlNmU1Nzg0MTEifQ.E3HTxfQ', '2016-04-04 20:30:06', '2016-04-04 21:26:06'),
(124, 13, '2016-04-04 21:26:08', '2016-04-04 21:26:08', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5ODAzMTY3LCJleHAiOjE2MTc0ODMxNjcsIm5iZiI6MTQ1OTgwMzE2NywianRpIjoiZTRkMTZhMmRhZmRjZmMyZDc2ODFkYzczZTQ1OWY0MGIifQ.kNXtvelw3k1', '2016-04-04 21:26:08', '2016-04-04 21:26:08'),
(125, 12, '2016-04-05 00:46:43', '2016-04-05 03:14:22', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEyLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5ODE3MjAyLCJleHAiOjE2MTc0OTcyMDIsIm5iZiI6MTQ1OTgxNzIwMiwianRpIjoiMmFlOGQyNjk0OGJiYTZmYzI0MzllNTk4NDBmNGFkY2UifQ.EFwxNYY', '2016-04-05 00:46:43', '2016-04-05 03:14:22'),
(126, 9, '2016-04-05 09:59:22', '2016-04-05 09:59:25', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NjE1OTEsImV4cCI6MTYxNzQ0MTU5MSwibmJmIjoxNDU5NzYxNTkxLCJqdGkiOiIzYTk4MWQyNjA3ZTQ2OGRhZjY5ZTk2NGQ3YzZlNGZkNiJ9.qzHxCJN-w262M', '2016-04-05 09:59:22', '2016-04-05 09:59:25'),
(127, 12, '2016-04-06 01:50:39', '2016-04-06 01:50:47', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEyLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5ODIwNDE2LCJleHAiOjE2MTc1MDA0MTYsIm5iZiI6MTQ1OTgyMDQxNiwianRpIjoiMTZhYzgzMDFiMDYyMjNkY2E2YTEyYjZhZjRjNDJmNjQifQ.51N1jsh', '2016-04-06 01:50:39', '2016-04-06 01:50:47'),
(128, 12, '2016-04-06 01:50:50', '2016-04-06 01:50:55', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEyLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5ODIwNDE2LCJleHAiOjE2MTc1MDA0MTYsIm5iZiI6MTQ1OTgyMDQxNiwianRpIjoiMTZhYzgzMDFiMDYyMjNkY2E2YTEyYjZhZjRjNDJmNjQifQ.51N1jsh', '2016-04-06 01:50:50', '2016-04-06 01:50:55'),
(129, 12, '2016-04-06 01:50:55', '2016-04-06 02:21:51', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEyLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5ODIwNDE2LCJleHAiOjE2MTc1MDA0MTYsIm5iZiI6MTQ1OTgyMDQxNiwianRpIjoiMTZhYzgzMDFiMDYyMjNkY2E2YTEyYjZhZjRjNDJmNjQifQ.51N1jsh', '2016-04-06 01:50:55', '2016-04-06 02:21:51'),
(130, 13, '2016-04-06 02:21:54', '2016-04-06 02:36:12', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5OTA5MDM3LCJleHAiOjE2MTc1ODkwMzcsIm5iZiI6MTQ1OTkwOTAzNywianRpIjoiNTAxNmM4ZjE2NWE2NTAxYjJlNGJhYWVhNzkzZmRiODMifQ.SXNzhFYbfAu', '2016-04-06 02:21:54', '2016-04-06 02:36:12'),
(131, 12, '2016-04-06 02:24:29', '2016-04-06 02:25:57', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEyLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5OTA5MzQyLCJleHAiOjE2MTc1ODkzNDIsIm5iZiI6MTQ1OTkwOTM0MiwianRpIjoiY2IwZWM5MmM1ODA0ODNkYmUwZmVlZDRiYjg4NDMzZGUifQ.n9s9gGB', '2016-04-06 02:24:29', '2016-04-06 02:25:57'),
(132, 6, '2016-04-06 02:34:26', '2016-04-06 03:08:50', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTc4MzI2NTEsImV4cCI6MTYxNTUxMjY1MSwibmJmIjoxNDU3ODMyNjUxLCJqdGkiOiI1YTE4NTVmMmIyYTE5NDA5YWMzNTMxZDJmY2NmNjYxYyJ9.kujqhzl_bEP3Z', '2016-04-06 02:34:26', '2016-04-06 03:08:50'),
(133, 2, '2016-04-06 02:58:50', '2016-04-06 04:25:14', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk5MTE1MjksImV4cCI6MTYxNzU5MTUyOSwibmJmIjoxNDU5OTExNTI5LCJqdGkiOiIxYzc1MWRkNzU3YjIxNjIwNzQyOGQyNzkxZWYwNDFhYSJ9.WenPScOcGTiJ6', '2016-04-06 02:58:50', '2016-04-06 04:25:14'),
(134, 9, '2016-04-06 03:25:13', '2016-04-06 03:25:13', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3ODEzNzgsImV4cCI6MTYxNzQ2MTM3OCwibmJmIjoxNDU5NzgxMzc4LCJqdGkiOiI4ZDZmNjcwMGI1ZGVhNmI5ZDI2YjUyMjhhYmViZDZiZCJ9.BP1fW9MrTA8AQ', '2016-04-06 03:25:13', '2016-04-06 03:25:13'),
(135, 9, '2016-04-06 03:28:44', '2016-04-06 05:01:37', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk5MTMzMjMsImV4cCI6MTYxNzU5MzMyMywibmJmIjoxNDU5OTEzMzIzLCJqdGkiOiI1ODU3MDQ4NjFmYzFjZDM3ZGJhZTZmZjE4M2ZjYzU5OSJ9.8ntnMNqaMUI0R', '2016-04-06 03:28:44', '2016-04-06 05:01:37'),
(136, 9, '2016-04-06 03:29:31', '2016-04-06 03:29:31', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk5MTMzMjMsImV4cCI6MTYxNzU5MzMyMywibmJmIjoxNDU5OTEzMzIzLCJqdGkiOiI1ODU3MDQ4NjFmYzFjZDM3ZGJhZTZmZjE4M2ZjYzU5OSJ9.8ntnMNqaMUI0R', '2016-04-06 03:29:31', '2016-04-06 03:29:31'),
(137, 13, '2016-04-06 04:25:16', '2016-04-06 04:25:28', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5OTE2NzAzLCJleHAiOjE2MTc1OTY3MDMsIm5iZiI6MTQ1OTkxNjcwMywianRpIjoiMzQ5ZDE2NThiMWUzZWY0YTUzMzE5MzFhYjFjMWJiOGQifQ.sTuOBLsh7Sj', '2016-04-06 04:25:16', '2016-04-06 04:25:28'),
(138, 13, '2016-04-06 04:25:29', '2016-04-06 04:32:00', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5OTE2NzAzLCJleHAiOjE2MTc1OTY3MDMsIm5iZiI6MTQ1OTkxNjcwMywianRpIjoiMzQ5ZDE2NThiMWUzZWY0YTUzMzE5MzFhYjFjMWJiOGQifQ.sTuOBLsh7Sj', '2016-04-06 04:25:29', '2016-04-06 04:32:00'),
(139, 9, '2016-04-06 05:01:42', '2016-04-06 05:02:50', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk5MTMzMjMsImV4cCI6MTYxNzU5MzMyMywibmJmIjoxNDU5OTEzMzIzLCJqdGkiOiI1ODU3MDQ4NjFmYzFjZDM3ZGJhZTZmZjE4M2ZjYzU5OSJ9.8ntnMNqaMUI0R', '2016-04-06 05:01:42', '2016-04-06 05:02:50');
INSERT INTO `userlogs` (`id`, `user_id`, `start`, `end`, `token`, `created_at`, `updated_at`) VALUES
(140, 9, '2016-04-06 05:03:26', '2016-04-06 05:03:38', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NjEyNzAsImV4cCI6MTYxNzQ0MTI3MCwibmJmIjoxNDU5NzYxMjcwLCJqdGkiOiIzMzk0OTE5NDkzNDAzNjFlYWIzODY1NzNmYzI2MmM5NCJ9.aOm8B5028RHh_', '2016-04-06 05:03:26', '2016-04-06 05:03:38'),
(141, 9, '2016-04-06 06:36:44', '2016-04-06 06:41:35', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk5MjQ2MDMsImV4cCI6MTYxNzYwNDYwMywibmJmIjoxNDU5OTI0NjAzLCJqdGkiOiJlYmZhMmE2ZTBlZDIxMmRmNzc4NjM5OWU0YTY1OTQ1OCJ9.yTJdOTV1K3tqn', '2016-04-06 06:36:44', '2016-04-06 06:41:35'),
(142, 4, '2016-04-06 06:45:43', '2016-04-06 06:46:02', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk5MjUxNDIsImV4cCI6MTYxNzYwNTE0MiwibmJmIjoxNDU5OTI1MTQyLCJqdGkiOiI2ZTYzOWU1ODdmN2Y2ZDgzYWIzNzE3MzYwY2E1MDdiMiJ9.cMexmv8wW', '2016-04-06 06:45:43', '2016-04-06 06:46:02'),
(143, 1, '2016-04-06 06:46:47', '2016-04-07 18:35:18', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTI1NjYsImV4cCI6MTYxNzQ3MjU2NiwibmJmIjoxNDU5NzkyNTY2LCJqdGkiOiJlZTYyNmFkMWVkMjA3NjhhZTg3MjI0MDdmYjg2MmIyOSJ9.HNLY47poEg9wQ', '2016-04-06 06:46:47', '2016-04-07 18:35:18'),
(144, 13, '2016-04-06 09:44:55', '2016-04-06 09:44:55', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5OTEyMTE4LCJleHAiOjE2MTc1OTIxMTgsIm5iZiI6MTQ1OTkxMjExOCwianRpIjoiNWJlZDg5MGUwNTUwNzIxZjEwNzBiNGU0YTc3NzhlZGUifQ.u4tsGV0FUaK', '2016-04-06 09:44:55', '2016-04-06 09:44:55'),
(145, 13, '2016-04-06 17:44:30', '2016-04-06 17:44:30', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5OTEyMTE4LCJleHAiOjE2MTc1OTIxMTgsIm5iZiI6MTQ1OTkxMjExOCwianRpIjoiNWJlZDg5MGUwNTUwNzIxZjEwNzBiNGU0YTc3NzhlZGUifQ.u4tsGV0FUaK', '2016-04-06 17:44:30', '2016-04-06 17:44:30'),
(146, 13, '2016-04-06 19:37:41', '2016-04-06 19:37:41', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5OTEyMTE4LCJleHAiOjE2MTc1OTIxMTgsIm5iZiI6MTQ1OTkxMjExOCwianRpIjoiNWJlZDg5MGUwNTUwNzIxZjEwNzBiNGU0YTc3NzhlZGUifQ.u4tsGV0FUaK', '2016-04-06 19:37:41', '2016-04-06 19:37:41'),
(147, 13, '2016-04-07 05:01:10', '2016-04-07 05:01:10', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5OTEyMTE4LCJleHAiOjE2MTc1OTIxMTgsIm5iZiI6MTQ1OTkxMjExOCwianRpIjoiNWJlZDg5MGUwNTUwNzIxZjEwNzBiNGU0YTc3NzhlZGUifQ.u4tsGV0FUaK', '2016-04-07 05:01:10', '2016-04-07 05:01:10'),
(148, 13, '2016-04-07 06:41:17', '2016-04-07 06:42:18', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5OTE2NzcyLCJleHAiOjE2MTc1OTY3NzIsIm5iZiI6MTQ1OTkxNjc3MiwianRpIjoiYmY4OGE1ZjVhMmU5MTQyMzEyYmVlNDYxOTVlN2NmNjMifQ.U2wCy8qrXNr', '2016-04-07 06:41:17', '2016-04-07 06:42:18'),
(149, 13, '2016-04-07 06:42:18', '2016-04-07 06:48:40', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5OTE2NzcyLCJleHAiOjE2MTc1OTY3NzIsIm5iZiI6MTQ1OTkxNjc3MiwianRpIjoiYmY4OGE1ZjVhMmU5MTQyMzEyYmVlNDYxOTVlN2NmNjMifQ.U2wCy8qrXNr', '2016-04-07 06:42:18', '2016-04-07 06:48:40'),
(150, 13, '2016-04-07 09:30:13', '2016-04-07 09:30:13', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5OTEyMTE4LCJleHAiOjE2MTc1OTIxMTgsIm5iZiI6MTQ1OTkxMjExOCwianRpIjoiNWJlZDg5MGUwNTUwNzIxZjEwNzBiNGU0YTc3NzhlZGUifQ.u4tsGV0FUaK', '2016-04-07 09:30:13', '2016-04-07 09:30:13'),
(151, 1, '2016-04-08 01:56:55', '2016-04-08 01:56:56', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjAwMTE2ODQsImV4cCI6MTYxNzY5MTY4NCwibmJmIjoxNDYwMDExNjg0LCJqdGkiOiJmMzYyMzllY2E3YmM1Njk3NjFmZTY4OWM3ZGQ1ODIxNiJ9.jJnN7l5DWJkVK', '2016-04-08 01:56:55', '2016-04-08 01:56:56'),
(152, 1, '2016-04-08 01:56:57', '2016-04-08 01:58:07', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjAwMTE2ODQsImV4cCI6MTYxNzY5MTY4NCwibmJmIjoxNDYwMDExNjg0LCJqdGkiOiJmMzYyMzllY2E3YmM1Njk3NjFmZTY4OWM3ZGQ1ODIxNiJ9.jJnN7l5DWJkVK', '2016-04-08 01:56:57', '2016-04-08 01:58:07'),
(153, 1, '2016-04-08 03:23:29', '2016-04-08 03:23:34', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjAwMTE2ODQsImV4cCI6MTYxNzY5MTY4NCwibmJmIjoxNDYwMDExNjg0LCJqdGkiOiJmMzYyMzllY2E3YmM1Njk3NjFmZTY4OWM3ZGQ1ODIxNiJ9.jJnN7l5DWJkVK', '2016-04-08 03:23:29', '2016-04-08 03:23:34'),
(154, 9, '2016-04-08 10:15:47', '2016-04-08 10:15:47', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjAxMTA1NDYsImV4cCI6MTYxNzc5MDU0NiwibmJmIjoxNDYwMTEwNTQ2LCJqdGkiOiJhNmE2OTY2ZDhhMjE5ZWVlMGUzMDgwNGY1ZTJiMzcwMyJ9._c8DYBvt0eguM', '2016-04-08 10:15:47', '2016-04-08 10:15:47'),
(155, 9, '2016-04-08 10:19:48', '2016-04-08 10:19:48', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjAxMTA1NDYsImV4cCI6MTYxNzc5MDU0NiwibmJmIjoxNDYwMTEwNTQ2LCJqdGkiOiJhNmE2OTY2ZDhhMjE5ZWVlMGUzMDgwNGY1ZTJiMzcwMyJ9._c8DYBvt0eguM', '2016-04-08 10:19:48', '2016-04-08 10:19:48'),
(156, 9, '2016-04-08 10:26:01', '2016-04-08 10:27:27', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3NjEyNzAsImV4cCI6MTYxNzQ0MTI3MCwibmJmIjoxNDU5NzYxMjcwLCJqdGkiOiIzMzk0OTE5NDkzNDAzNjFlYWIzODY1NzNmYzI2MmM5NCJ9.aOm8B5028RHh_', '2016-04-08 10:26:01', '2016-04-08 10:27:27'),
(157, 9, '2016-04-08 16:23:23', '2016-04-08 16:23:23', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk5MjQ2MDMsImV4cCI6MTYxNzYwNDYwMywibmJmIjoxNDU5OTI0NjAzLCJqdGkiOiJlYmZhMmE2ZTBlZDIxMmRmNzc4NjM5OWU0YTY1OTQ1OCJ9.yTJdOTV1K3tqn', '2016-04-08 16:23:23', '2016-04-08 16:23:23'),
(158, 13, '2016-04-09 02:56:37', '2016-04-09 02:56:37', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5OTEyMTE4LCJleHAiOjE2MTc1OTIxMTgsIm5iZiI6MTQ1OTkxMjExOCwianRpIjoiNWJlZDg5MGUwNTUwNzIxZjEwNzBiNGU0YTc3NzhlZGUifQ.u4tsGV0FUaK', '2016-04-09 02:56:37', '2016-04-09 02:56:37'),
(159, 1, '2016-04-12 00:48:43', '2016-04-12 01:19:56', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjAwMTE2ODQsImV4cCI6MTYxNzY5MTY4NCwibmJmIjoxNDYwMDExNjg0LCJqdGkiOiJmMzYyMzllY2E3YmM1Njk3NjFmZTY4OWM3ZGQ1ODIxNiJ9.jJnN7l5DWJkVK', '2016-04-12 00:48:43', '2016-04-12 01:19:56'),
(160, 13, '2016-04-12 01:01:33', '2016-04-12 01:01:33', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEzLCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDU5OTEyMTE4LCJleHAiOjE2MTc1OTIxMTgsIm5iZiI6MTQ1OTkxMjExOCwianRpIjoiNWJlZDg5MGUwNTUwNzIxZjEwNzBiNGU0YTc3NzhlZGUifQ.u4tsGV0FUaK', '2016-04-12 01:01:33', '2016-04-12 01:01:33'),
(161, 2, '2016-04-13 22:45:24', '2016-04-13 22:45:26', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjA0MjM5ODUsImV4cCI6MTYxODEwMzk4NSwibmJmIjoxNDYwNDIzOTg1LCJqdGkiOiI1ZDJmYjk3YzkyZDhlNDVkY2RiODA5MjdjNDkxMzlmOSJ9.9IjRfBocES2ZA', '2016-04-13 22:45:24', '2016-04-13 22:45:26'),
(162, 2, '2016-04-13 23:29:26', '2016-04-13 23:30:44', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjA0MjM5ODUsImV4cCI6MTYxODEwMzk4NSwibmJmIjoxNDYwNDIzOTg1LCJqdGkiOiI1ZDJmYjk3YzkyZDhlNDVkY2RiODA5MjdjNDkxMzlmOSJ9.9IjRfBocES2ZA', '2016-04-13 23:29:26', '2016-04-13 23:30:44'),
(163, 1, '2016-04-14 02:31:10', '2016-04-14 02:32:29', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjA2MDEwNjksImV4cCI6MTYxODI4MTA2OSwibmJmIjoxNDYwNjAxMDY5LCJqdGkiOiJmOGZjYWU4NTg0NjhlNjY5ZmFkYzU5MTE3OWU5NWE4ZSJ9.X48W8uw6cx75n', '2016-04-14 02:31:10', '2016-04-14 02:32:29'),
(164, 1, '2016-04-14 02:33:09', '2016-04-14 02:33:26', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjA2MDEwNjksImV4cCI6MTYxODI4MTA2OSwibmJmIjoxNDYwNjAxMDY5LCJqdGkiOiJmOGZjYWU4NTg0NjhlNjY5ZmFkYzU5MTE3OWU5NWE4ZSJ9.X48W8uw6cx75n', '2016-04-14 02:33:09', '2016-04-14 02:33:26'),
(165, 1, '2016-04-14 14:08:49', '2016-04-14 15:16:41', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjA2MDEwNjksImV4cCI6MTYxODI4MTA2OSwibmJmIjoxNDYwNjAxMDY5LCJqdGkiOiJmOGZjYWU4NTg0NjhlNjY5ZmFkYzU5MTE3OWU5NWE4ZSJ9.X48W8uw6cx75n', '2016-04-14 14:08:49', '2016-04-14 15:16:41'),
(166, 15, '2016-04-14 16:02:44', '2016-04-14 16:03:24', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE1LCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDYwNjQ5NzYzLCJleHAiOjE2MTgzMjk3NjMsIm5iZiI6MTQ2MDY0OTc2MywianRpIjoiOTgwNTM3ODhjMmZiNjdiYWE4ZDc4NTU2OTAwNDI1Y2YifQ.uZz_BYO', '2016-04-14 16:02:44', '2016-04-14 16:03:24'),
(167, 15, '2016-04-14 16:03:59', '2016-04-14 16:04:57', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE1LCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDYwNjQ5NzYzLCJleHAiOjE2MTgzMjk3NjMsIm5iZiI6MTQ2MDY0OTc2MywianRpIjoiOTgwNTM3ODhjMmZiNjdiYWE4ZDc4NTU2OTAwNDI1Y2YifQ.uZz_BYO', '2016-04-14 16:03:59', '2016-04-14 16:04:57'),
(168, 15, '2016-04-15 00:14:46', '2016-04-15 00:15:32', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE1LCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDYwNjQ5NzYzLCJleHAiOjE2MTgzMjk3NjMsIm5iZiI6MTQ2MDY0OTc2MywianRpIjoiOTgwNTM3ODhjMmZiNjdiYWE4ZDc4NTU2OTAwNDI1Y2YifQ.uZz_BYO', '2016-04-15 00:14:46', '2016-04-15 00:15:32'),
(169, 1, '2016-04-15 02:58:36', '2016-04-15 02:59:29', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjA2ODkxMTYsImV4cCI6MTYxODM2OTExNiwibmJmIjoxNDYwNjg5MTE2LCJqdGkiOiJiNmMyMzkxM2ZiYzMxYjI3YjBhNTg3ZTJhZDU3NmM5YSJ9.LZAPG7f8HwnaG', '2016-04-15 02:58:36', '2016-04-15 02:59:29'),
(170, 15, '2016-04-16 00:41:53', '2016-04-16 00:42:06', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE1LCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDYwNjQ5NzYzLCJleHAiOjE2MTgzMjk3NjMsIm5iZiI6MTQ2MDY0OTc2MywianRpIjoiOTgwNTM3ODhjMmZiNjdiYWE4ZDc4NTU2OTAwNDI1Y2YifQ.uZz_BYO', '2016-04-16 00:41:53', '2016-04-16 00:42:06'),
(171, 1, '2016-04-16 02:53:48', '2016-04-17 17:41:52', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjA2MDEwNjksImV4cCI6MTYxODI4MTA2OSwibmJmIjoxNDYwNjAxMDY5LCJqdGkiOiJmOGZjYWU4NTg0NjhlNjY5ZmFkYzU5MTE3OWU5NWE4ZSJ9.X48W8uw6cx75n', '2016-04-16 02:53:48', '2016-04-17 17:41:52'),
(172, 5, '2016-04-16 15:41:10', '2016-04-16 15:43:59', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjUsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjA4MjEyNjksImV4cCI6MTYxODUwMTI2OSwibmJmIjoxNDYwODIxMjY5LCJqdGkiOiI4MDllZDRhMTcwZjZkNzA3OTgwNjlmMzE3ODA0ODBjMSJ9.1MpuH75w3HAk0', '2016-04-16 15:41:10', '2016-04-16 15:43:59'),
(173, 18, '2016-04-16 15:44:45', '2016-04-16 15:44:45', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE4LCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDYwODIxMzQwLCJleHAiOjE2MTg1MDEzNDAsIm5iZiI6MTQ2MDgyMTM0MCwianRpIjoiMWNkZGQ5MTAyNDRjYzUyMTFiNGM3NzY2ZWViYmI1YTQifQ.lv7fYl1', '2016-04-16 15:44:45', '2016-04-16 15:44:45'),
(174, 18, '2016-04-16 15:45:22', '2016-04-16 15:45:22', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE4LCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDYwODIxMzQwLCJleHAiOjE2MTg1MDEzNDAsIm5iZiI6MTQ2MDgyMTM0MCwianRpIjoiMWNkZGQ5MTAyNDRjYzUyMTFiNGM3NzY2ZWViYmI1YTQifQ.lv7fYl1', '2016-04-16 15:45:22', '2016-04-16 15:45:22'),
(175, 9, '2016-04-18 03:23:59', '2016-04-18 03:23:59', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjAxMTA1NDYsImV4cCI6MTYxNzc5MDU0NiwibmJmIjoxNDYwMTEwNTQ2LCJqdGkiOiJhNmE2OTY2ZDhhMjE5ZWVlMGUzMDgwNGY1ZTJiMzcwMyJ9._c8DYBvt0eguM', '2016-04-18 03:23:59', '2016-04-18 03:23:59'),
(176, 9, '2016-04-19 04:36:39', '2016-04-19 04:39:03', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjEwNDA1OTcsImV4cCI6MTYxODcyMDU5NywibmJmIjoxNDYxMDQwNTk3LCJqdGkiOiIyYTE3M2E2Yzk4Mjk3YjcxNDZlNWZiMzlhM2ZjOWVlMiJ9.2PFFBAihtlBXt', '2016-04-19 04:36:39', '2016-04-19 04:39:03'),
(177, 9, '2016-04-19 04:39:24', '2016-04-19 06:49:30', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjEwNDA3NjMsImV4cCI6MTYxODcyMDc2MywibmJmIjoxNDYxMDQwNzYzLCJqdGkiOiI1N2QyYzYwM2NlMDVkOGU2MTEzMWQyMGFjMjRkNTIwOSJ9.FxyJuTZhSyekf', '2016-04-19 04:39:24', '2016-04-19 06:49:30'),
(178, 9, '2016-04-19 04:58:08', '2016-04-19 05:11:28', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjEwNDE4ODYsImV4cCI6MTYxODcyMTg4NiwibmJmIjoxNDYxMDQxODg2LCJqdGkiOiI5ZGVjMGUwMzUwNjQzMDdkMmI2ZDkwYjdhNTJmYTc5MiJ9.SGGC7Jw53B5pM', '2016-04-19 04:58:08', '2016-04-19 05:11:28'),
(179, 9, '2016-04-19 05:12:26', '2016-04-19 05:31:55', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjEwNDE4ODYsImV4cCI6MTYxODcyMTg4NiwibmJmIjoxNDYxMDQxODg2LCJqdGkiOiI5ZGVjMGUwMzUwNjQzMDdkMmI2ZDkwYjdhNTJmYTc5MiJ9.SGGC7Jw53B5pM', '2016-04-19 05:12:26', '2016-04-19 05:31:55'),
(180, 9, '2016-04-19 05:32:01', '2016-04-19 05:44:36', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjEwNDE4ODYsImV4cCI6MTYxODcyMTg4NiwibmJmIjoxNDYxMDQxODg2LCJqdGkiOiI5ZGVjMGUwMzUwNjQzMDdkMmI2ZDkwYjdhNTJmYTc5MiJ9.SGGC7Jw53B5pM', '2016-04-19 05:32:01', '2016-04-19 05:44:36'),
(181, 9, '2016-04-19 06:49:39', '2016-04-19 06:53:45', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjEwNDA3NjMsImV4cCI6MTYxODcyMDc2MywibmJmIjoxNDYxMDQwNzYzLCJqdGkiOiI1N2QyYzYwM2NlMDVkOGU2MTEzMWQyMGFjMjRkNTIwOSJ9.FxyJuTZhSyekf', '2016-04-19 06:49:39', '2016-04-19 06:53:45'),
(182, 9, '2016-04-19 06:53:51', '2016-04-19 06:53:51', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjEwNDA3NjMsImV4cCI6MTYxODcyMDc2MywibmJmIjoxNDYxMDQwNzYzLCJqdGkiOiI1N2QyYzYwM2NlMDVkOGU2MTEzMWQyMGFjMjRkNTIwOSJ9.FxyJuTZhSyekf', '2016-04-19 06:53:51', '2016-04-19 06:53:51'),
(183, 7, '2016-04-19 16:57:41', '2016-04-19 16:58:24', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjcsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MDY2MzMsImV4cCI6MTYxNzM4NjYzMywibmJmIjoxNDU5NzA2NjMzLCJqdGkiOiJmY2Y1MzY1MDgwY2YwODcwMDBiZDQ4ODUzZDU4MDc0ZCJ9.JIxg3rlKu', '2016-04-19 16:57:41', '2016-04-19 16:58:24'),
(184, 7, '2016-04-19 16:58:25', '2016-04-19 16:58:50', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjcsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3MDY2MzMsImV4cCI6MTYxNzM4NjYzMywibmJmIjoxNDU5NzA2NjMzLCJqdGkiOiJmY2Y1MzY1MDgwY2YwODcwMDBiZDQ4ODUzZDU4MDc0ZCJ9.JIxg3rlKu', '2016-04-19 16:58:25', '2016-04-19 16:58:50'),
(185, 15, '2016-04-21 00:11:21', '2016-04-21 00:14:04', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE1LCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDYxMTk3NDgxLCJleHAiOjE2MTg4Nzc0ODEsIm5iZiI6MTQ2MTE5NzQ4MSwianRpIjoiYzQ0MWUwZjJkOTgzMWFmN2M4OTRlOWRiMDIxZDE1YTEifQ.4WuKxEx', '2016-04-21 00:11:21', '2016-04-21 00:14:04'),
(186, 15, '2016-04-21 00:14:14', '2016-04-21 00:15:44', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE1LCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDYxMTk3NDgxLCJleHAiOjE2MTg4Nzc0ODEsIm5iZiI6MTQ2MTE5NzQ4MSwianRpIjoiYzQ0MWUwZjJkOTgzMWFmN2M4OTRlOWRiMDIxZDE1YTEifQ.4WuKxEx', '2016-04-21 00:14:14', '2016-04-21 00:15:44'),
(187, 6, '2016-04-21 01:38:08', '2016-04-21 01:42:44', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NTk3OTE2NDIsImV4cCI6MTYxNzQ3MTY0MiwibmJmIjoxNDU5NzkxNjQyLCJqdGkiOiJmM2RlZmI0MmZkZDg4ZGZiZjRmOGJhNzA3ZTNjMzJiMCJ9.Yk7ShwW6D', '2016-04-21 01:38:08', '2016-04-21 01:42:44'),
(188, 15, '2016-04-21 03:33:21', '2016-04-21 03:33:21', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE1LCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDYxMTk3NDgxLCJleHAiOjE2MTg4Nzc0ODEsIm5iZiI6MTQ2MTE5NzQ4MSwianRpIjoiYzQ0MWUwZjJkOTgzMWFmN2M4OTRlOWRiMDIxZDE1YTEifQ.4WuKxEx', '2016-04-21 03:33:21', '2016-04-21 03:33:21'),
(189, 1, '2016-04-21 14:37:56', '2016-04-21 14:37:56', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjA2MDEwNjksImV4cCI6MTYxODI4MTA2OSwibmJmIjoxNDYwNjAxMDY5LCJqdGkiOiJmOGZjYWU4NTg0NjhlNjY5ZmFkYzU5MTE3OWU5NWE4ZSJ9.X48W8uw6cx75n', '2016-04-21 14:37:56', '2016-04-21 14:37:56'),
(190, 1, '2016-04-21 14:38:13', '2016-04-21 14:38:19', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjA2MDEwNjksImV4cCI6MTYxODI4MTA2OSwibmJmIjoxNDYwNjAxMDY5LCJqdGkiOiJmOGZjYWU4NTg0NjhlNjY5ZmFkYzU5MTE3OWU5NWE4ZSJ9.X48W8uw6cx75n', '2016-04-21 14:38:13', '2016-04-21 14:38:19'),
(191, 1, '2016-04-21 14:39:25', '2016-04-21 14:42:09', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjA2MDEwNjksImV4cCI6MTYxODI4MTA2OSwibmJmIjoxNDYwNjAxMDY5LCJqdGkiOiJmOGZjYWU4NTg0NjhlNjY5ZmFkYzU5MTE3OWU5NWE4ZSJ9.X48W8uw6cx75n', '2016-04-21 14:39:25', '2016-04-21 14:42:09'),
(192, 1, '2016-04-21 16:06:50', '2016-04-21 16:06:50', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjEyNTQ4MTAsImV4cCI6MTYxODkzNDgxMCwibmJmIjoxNDYxMjU0ODEwLCJqdGkiOiJjNjMwMjEyODliOGQxZGIzYWUwNzg3OWZlMzIwNjY5NCJ9.0zBz9Pv-zneVr', '2016-04-21 16:06:50', '2016-04-21 16:06:50'),
(193, 15, '2016-04-22 00:06:14', '2016-04-22 00:08:30', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE1LCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDYxMTk3NDgxLCJleHAiOjE2MTg4Nzc0ODEsIm5iZiI6MTQ2MTE5NzQ4MSwianRpIjoiYzQ0MWUwZjJkOTgzMWFmN2M4OTRlOWRiMDIxZDE1YTEifQ.4WuKxEx', '2016-04-22 00:06:14', '2016-04-22 00:08:30'),
(194, 15, '2016-04-22 00:24:35', '2016-04-22 00:24:35', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE1LCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDYxMTk3NDgxLCJleHAiOjE2MTg4Nzc0ODEsIm5iZiI6MTQ2MTE5NzQ4MSwianRpIjoiYzQ0MWUwZjJkOTgzMWFmN2M4OTRlOWRiMDIxZDE1YTEifQ.4WuKxEx', '2016-04-22 00:24:35', '2016-04-22 00:24:35'),
(195, 6, '2016-04-22 01:42:02', '2016-04-22 01:42:41', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6XC9cLzUyLjM3LjU0LjIzXC9hcGlcL3YxXC9mYl9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NjEyODkzMjEsImV4cCI6MTYxODk2OTMyMSwibmJmIjoxNDYxMjg5MzIxLCJqdGkiOiI2ODFmNzlmNTZjMzAxNWRlZTY5NWU4MGM1ODk1M2I0YiJ9.POGNLY5xu', '2016-04-22 01:42:02', '2016-04-22 01:42:41'),
(196, 15, '2016-04-22 04:39:54', '2016-04-22 04:39:54', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE1LCJpc3MiOiJodHRwOlwvXC81Mi4zNy41NC4yM1wvYXBpXC92MVwvZmJfYXV0aGVudGljYXRlIiwiaWF0IjoxNDYxMTk3NDgxLCJleHAiOjE2MTg4Nzc0ODEsIm5iZiI6MTQ2MTE5NzQ4MSwianRpIjoiYzQ0MWUwZjJkOTgzMWFmN2M4OTRlOWRiMDIxZDE1YTEifQ.4WuKxEx', '2016-04-22 04:39:54', '2016-04-22 04:39:54'),
(197, 1, '2016-05-14 00:37:09', '2016-05-14 00:37:26', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL2UybGVhcm4ud3NvbHVzLmNvbVwvYXBpXC92MVwvYXV0aGVudGljYXRlIiwiaWF0IjoxNDYzMjA2MDI3LCJleHAiOjE2MjA4ODYwMjcsIm5iZiI6MTQ2MzIwNjAyNywianRpIjoiYTViYmM5MzVhNjEzNzA4NjA5ZjQ5OGQ5NzNkOTU3MWEifQ.M5S', '2016-05-14 00:37:09', '2016-05-14 00:37:26');

-- --------------------------------------------------------

--
-- Table structure for table `userrole`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `userrole` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `userrole`
--

INSERT INTO `userrole` (`id`, `role_name`, `enable`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Educator', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Child', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--
-- Creation: May 17, 2016 at 12:25 AM
--

CREATE TABLE IF NOT EXISTS `videos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `video_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `i_frame` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `video_ref` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `enable` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=10 ;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `name`, `title`, `description`, `url`, `video_id`, `i_frame`, `video_ref`, `category_id`, `user_id`, `enable`, `created_at`, `updated_at`) VALUES
(1, '', 'Funny Cats Acting Like Humans Compilation 2015', 'Here are some cats behaving like humans. Watch these funny videos of funny cats acting like humans in this cat videos compilation', 'https://www.youtube.com/watch?v=PHAc3_MEjgQ', 'PHAc3_MEjgQ', '<iframe src="https://www.youtube.com/embed/PHAc3_MEjgQ?rel=0&amp;fs=1&amp;theme=light&amp;loop=1&amp;showinfo=0&amp;disablekb=1&amp;controls=1&amp;autohide=1" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" frameborder="0" id="video"></i', 'youtube', 8, 1, 1, '2016-04-04 02:13:54', '2016-04-04 02:13:54'),
(2, '', 'Basic Algebra', 'What is algebra', 'https://www.youtube.com/watch?v=NybHckSEQBI', 'NybHckSEQBI', '<iframe src="https://www.youtube.com/embed/NybHckSEQBI?rel=0&amp;fs=1&amp;theme=light&amp;loop=1&amp;showinfo=0&amp;disablekb=1&amp;controls=1&amp;autohide=1" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" frameborder="0" id="video"></i', 'youtube', 6, 1, 1, '2016-04-04 02:23:24', '2016-04-04 02:23:24'),
(3, '', 'Sharing is Caring', 'One must always share things with other people. After Top discovers a balloon in the bushes he doesn''t like sharing it with Tip. However, after Tip helps Top get the Balloon down from the tree Top has a change of heart.', 'https://www.youtube.com/watch?v=EsTPGZm8erI', 'EsTPGZm8erI', '<iframe src="https://www.youtube.com/embed/EsTPGZm8erI?rel=0&amp;fs=1&amp;theme=light&amp;loop=1&amp;showinfo=0&amp;disablekb=1&amp;controls=1&amp;autohide=1" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" frameborder="0" id="video"></i', 'youtube', 11, 1, 1, '2016-04-04 19:16:06', '2016-04-04 19:16:06'),
(4, '', 'Sharing and Respecting Others', 'This a lesson about learning to share and respecting others. Sharing is a great way to show respect for others.', 'https://www.youtube.com/watch?v=YNOnFsnjYhY', 'YNOnFsnjYhY', '<iframe src="https://www.youtube.com/embed/YNOnFsnjYhY?rel=0&amp;fs=1&amp;theme=light&amp;loop=1&amp;showinfo=0&amp;disablekb=1&amp;controls=1&amp;autohide=1" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" frameborder="0" id="video"></i', 'youtube', 11, 1, 1, '2016-04-04 19:21:45', '2016-04-04 19:21:45'),
(5, '', 'The History of Thanksgiving', 'This video covers the first permanent English colony at Jamestown, Virginia, the various theocracies in Massachusetts, the feudal kingdom in Maryland, and even a bit about the spooky lost colony at Roanoke Island. What were the English doing in America, a', 'https://www.youtube.com/watch?v=o69TvQqyGdg&list=PL8dPuuaLjXtMwmepBjTSG593eG7ObzO7s&index=2', 'o69TvQqyGdg', '<iframe src="https://www.youtube.com/embed/o69TvQqyGdg?rel=0&amp;fs=1&amp;theme=light&amp;loop=1&amp;showinfo=0&amp;disablekb=1&amp;controls=1&amp;autohide=1" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" frameborder="0" id="video"></i', 'youtube', 14, 1, 1, '2016-04-04 20:22:57', '2016-04-04 20:22:57'),
(6, '', 'Test lesson', 'Queen and David Bowie perform ''Heroes'' live. Taken from The Freddie Mercury Tribute Concert for AIDS Awareness that took place at Wembley Stadium on Easter Monday, 20th April 1992. The concert was a tribute to the life of the late Queen frontman, Freddie ', 'https://www.youtube.com/watch?v=UsiQgRp5bfQ', 'UsiQgRp5bfQ', '<iframe src="https://www.youtube.com/embed/UsiQgRp5bfQ?rel=0&amp;fs=1&amp;theme=light&amp;loop=1&amp;showinfo=0&amp;disablekb=1&amp;controls=1&amp;autohide=1" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" frameborder="0" id="video"></i', 'youtube', 5, 1, 1, '2016-04-06 03:07:32', '2016-04-06 03:07:32'),
(7, '', 'Life Vest Inside –Kindness Boomerang - "One Day”', 'One good turn deserves another.  Kindness is contagious.', 'https://www.youtube.com/watch?v=nwAYpLVyeFU', 'nwAYpLVyeFU', '<iframe src="https://www.youtube.com/embed/nwAYpLVyeFU?rel=0&amp;fs=1&amp;theme=light&amp;loop=1&amp;showinfo=0&amp;disablekb=1&amp;controls=1&amp;autohide=1" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" frameborder="0" id="video"></i', 'youtube', 10, 1, 1, '2016-04-14 14:18:58', '2016-04-14 14:24:31'),
(8, '', 'Random Acts of Kindness Triathlon', 'Four people were chosen to perform acts of kindness and observe changes in their happiness.', 'https://www.youtube.com/watch?v=M4ALRY5LyBM', 'M4ALRY5LyBM', '<iframe src="https://www.youtube.com/embed/M4ALRY5LyBM?rel=0&amp;fs=1&amp;theme=light&amp;loop=1&amp;showinfo=0&amp;disablekb=1&amp;controls=1&amp;autohide=1" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" frameborder="0" id="video"></i', 'youtube', 10, 1, 1, '2016-04-14 14:39:47', '2016-04-14 15:16:25'),
(9, '', 'The Impact of Kindness | Jacqueline de Loos | TEDxMaastricht', 'Kind gestures can make a difference in your day and day of others.', 'https://www.youtube.com/watch?v=vi642sE2ZPk&ebc=ANyPxKrVSQ3X46_ujQeT766quzvvNVYmWDMEeyib6bk7S-ayCYOqB6fYLl43NfQlLAlQ47Q41oTM', 'vi642sE2ZPk', '<iframe src="https://www.youtube.com/embed/vi642sE2ZPk?rel=0&amp;fs=1&amp;theme=light&amp;loop=1&amp;showinfo=0&amp;disablekb=1&amp;controls=1&amp;autohide=1" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" frameborder="0" id="video"></i', 'youtube', 10, 1, 1, '2016-04-14 15:13:32', '2016-04-14 15:13:32');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
