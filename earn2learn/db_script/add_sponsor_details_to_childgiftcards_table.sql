SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE `childgiftcards` ADD `sponsor_id` int(10) unsigned DEFAULT NULL AFTER `enable`;
ALTER TABLE `childgiftcards` ADD `parent_approved` tinyint(4) DEFAULT 0 AFTER `sponsor_id`;