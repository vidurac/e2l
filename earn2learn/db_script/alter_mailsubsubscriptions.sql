SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE `mailsubscriptions` ADD `certificate` TINYINT(1) NOT NULL DEFAULT '1' AFTER `newsletter`;