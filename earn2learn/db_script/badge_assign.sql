-- MySQL Script generated by MySQL Workbench
-- Fri 01 Jul 2016 08:53:24 AM IST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';


CREATE TABLE `badge_assignee` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `status` INT NOT NULL,
  `user_id` INT(10) UNSIGNED NOT NULL,
  `badge_id` INT UNSIGNED NOT NULL,
 `created_at` DATE NULL,
`updated_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_badge_assignee_user1_idx` (`user_id` ASC),
  INDEX `fk_badge_assignee_badge1_idx` (`badge_id` ASC),
  CONSTRAINT `fk_badge_assignee_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_badge_assignee_badge1`
    FOREIGN KEY (`badge_id`)
    REFERENCES `badges` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
