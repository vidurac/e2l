SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE `homegiftcards` ADD `bundle_id` int(10) unsigned DEFAULT NULL AFTER `approved`;
