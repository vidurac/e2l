-- ----------
-- Add new requested_type column
-- ----------
SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE `childgiftcards` ADD `bundle_id` int(10) unsigned DEFAULT NULL AFTER `parent_approved`;