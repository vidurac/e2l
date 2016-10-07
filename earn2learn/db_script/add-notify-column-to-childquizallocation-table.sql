SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE `childquizallocations` ADD `notify` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: do not send notification, 1: send notification' AFTER `custom_message`;