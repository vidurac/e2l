-- ----------
-- Add new requested_type column
-- ----------
SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE `childgiftcards` ADD `requested_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: lesson, 1: bundle' AFTER `parent_approved`;