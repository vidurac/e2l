/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50713
Source Host           : localhost:3306
Source Database       : earn2learn

Target Server Type    : MYSQL
Target Server Version : 50713
File Encoding         : 65001

Date: 2016-09-19 17:41:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for video_flags
-- ----------------------------
DROP TABLE IF EXISTS `video_flags`;
CREATE TABLE `video_flags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
