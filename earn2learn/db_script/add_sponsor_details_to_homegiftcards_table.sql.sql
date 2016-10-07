SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE `homegiftcards` ADD `sponsor_id` int(10) unsigned DEFAULT NULL AFTER `enable`;
ALTER TABLE `homegiftcards` ADD `approved` tinyint(4) DEFAULT 0 AFTER `sponsor_id`;