ALTER TABLE `bundle` ADD `gift_card_id`
VARCHAR(55) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
ALTER TABLE `bundle` ADD `amount` DECIMAL(11,0) NULL DEFAULT NULL;
