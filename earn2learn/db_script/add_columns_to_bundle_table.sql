SET SQL_MODE='ALLOW_INVALID_DATES';
-- ALTER TABLE `bundle` ADD `child_id` int(10) unsigned DEFAULT NULL AFTER `user_id`;
-- ALTER TABLE `bundle` ADD `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: not started, 1: started, 2: skipped, 3: finished' AFTER `child_id`;
ALTER TABLE `bundle` ADD `enable` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0: in-active, 1: active' AFTER `user_id`;
ALTER TABLE `bundle` ADD `gift_card_image` VARCHAR(255) DEFAULT NULL AFTER `enable`;
