-- MySQL Script generated by MySQL Workbench
-- Mon 15 Aug 2016 05:26:54 PM IST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE TABLE IF NOT EXISTS `purchased_giftcard` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `giftcard_id` INT NULL,
  `giftcard_name` VARCHAR(15) NULL,
  `brand_id` VARCHAR(45) NULL,
  `brand_name` VARCHAR(45) NULL,
  `giftcard_unique_id` LONGTEXT NULL,
  `purchased_id` VARCHAR(45) NULL,
  `giftcard_url` VARCHAR(45) NULL,
  `giftcard_status` VARCHAR(45) NULL,
  `giftcard_number` VARCHAR(45) NULL,
  `pin` VARCHAR(45) NULL,
  `purchased_date` TIMESTAMP(6) NULL,
  `payment_status` VARCHAR(20) NULL,
  `amount` INT NULL,
  `ipg_transaction_id` LONGTEXT NULL,
  `credit_card_four_digits` INT NULL,
  `deliver_email` VARCHAR(45) NULL,
  `deliver_fname` VARCHAR(45) NULL,
  `deliver_lname` VARCHAR(45) NULL,
  `created_at` TIMESTAMP(6) NULL,
  `updated_at` TIMESTAMP(6) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;