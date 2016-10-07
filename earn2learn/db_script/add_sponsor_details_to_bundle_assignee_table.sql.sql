SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE `bundle_assignees` ADD `sponsor_id` int(10) unsigned DEFAULT NULL AFTER `bundle_id`;