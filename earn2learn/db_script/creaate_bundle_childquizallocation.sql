-- -----------------------------------------------------
-- Create Table bundle_quizzes
-- -----------------------------------------------------
CREATE TABLE `bundle_childquizallocations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `childquizallocation_id` int(10) unsigned NOT NULL,
  `bundle_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;