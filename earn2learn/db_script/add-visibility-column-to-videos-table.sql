SET SQL_MODE='ALLOW_INVALID_DATES';
ALTER TABLE videos ADD visibility enum('private','public') default 'private';
UPDATE videos set visibility = 'public';