DROP DATABASE IF EXISTS ecommerce_art_db;
CREATE DATABASE ecommerce_art_db;

USE ecommerce_art_db;

---------------------------------------------------------------------------

-- START: Lookup tables

CREATE TABLE user_type (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	type VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE tag (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	tag_name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE category (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	category_name VARCHAR(20) NOT NULL UNIQUE
);

-- END: Lookup tables
---------------------------------------------------------------------------

-- START: Main tables

CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	address VARCHAR(255) NOT NULL,
	bank_info INT NOT NULL,
	user_type_id INT NOT NULL,
	FOREIGN KEY (user_type_id) REFERENCES user_type(id)
);

CREATE TABLE painting (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL UNIQUE,
	image BLOB NOT NULL,
	details VARCHAR(255) NOT NULL,
	selling TINYINT(1) NOT NULL DEFAULT 0,
	date_created DATE NOT NULL DEFAULT (DATE(CURRENT_TIMESTAMP)),
	original_painter INT NOT NULL,
	current_owner INT NULL
);

-- END: Main tables
---------------------------------------------------------------------------

-- START: Associate tables

CREATE TABLE painting_procurement (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	seller_id INT NOT NULL,
	buyer_id INT NOT NULL,
	painting_id INT NOT NULL,
	start_date DATE NOT NULL DEFAULT (DATE(CURRENT_TIMESTAMP)),
	end_date DATE NULL DEFAULT NULL,
	price DECIMAL(65, 2) NOT NULL,
	FOREIGN KEY (seller_id) REFERENCES user(id),
	FOREIGN KEY (buyer_id) REFERENCES user(id),
	FOREIGN KEY (painting_id) REFERENCES painting(id)
);

CREATE TABLE painting_category (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	painting_id INT NOT NULL,
	category_id INT NOT NULL,
	FOREIGN KEY (painting_id) REFERENCES painting(id),
	FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE painting_tag (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	painting_id INT NOT NULL,
	tag_id INT NOT NULL,
	FOREIGN KEY (painting_id) REFERENCES painting(id),
	FOREIGN KEY (tag_id) REFERENCES tag(id)
);

-- END: Associate tables