-- -----------------------------------------------------
-- Create Table bundle_quizzes
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bundle_quizzes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `quiz_id` INT(10) UNSIGNED NOT NULL,
  `bundle_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;