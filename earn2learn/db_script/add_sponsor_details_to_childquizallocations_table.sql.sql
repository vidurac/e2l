SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE `childquizallocations` ADD `sponsor_id` int(10) unsigned DEFAULT NULL AFTER `max_number_of_attempts`;