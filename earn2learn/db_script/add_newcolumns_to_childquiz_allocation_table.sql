SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE `childquizallocations` ADD `pass_percentage` varchar(255) NOT NULL AFTER `enable`;
ALTER TABLE `childquizallocations` ADD `max_number_of_attempts` int(10) NOT NULL AFTER `pass_percentage`;
ALTER TABLE `childquizallocations` ADD `custom_message` varchar(255) NOT NULL AFTER `max_number_of_attempts`;
