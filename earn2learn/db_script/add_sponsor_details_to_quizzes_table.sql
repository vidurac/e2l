SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE `quizzes` ADD `sponsor_id` int(10) unsigned DEFAULT NULL AFTER `enable`;
