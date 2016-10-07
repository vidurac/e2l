SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE `bundle_assignees` ADD `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: not started, 1: started, 2: skipped, 3: finished' AFTER `sponsor_id`;