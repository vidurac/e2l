SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE `user` ADD `payment_status` INT NULL DEFAULT '0' AFTER `subscription_ends_at`;