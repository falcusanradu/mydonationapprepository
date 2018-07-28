CREATE DATABASE licenta_db;
use licenta_db;



CREATE TABLE user_table (
id_user INTEGER NOT NULL AUTO_INCREMENT,
username VARCHAR(255) UNIQUE,
password VARCHAR(255),
email VARCHAR(255) UNIQUE,
type_user ENUM ('ADMIN','RIGHT1','MINIMUM'),
PRIMARY KEY (id_user)
);




CREATE TABLE company_table (
id_company INTEGER NOT NULL AUTO_INCREMENT,
image LONGTEXT,
description VARCHAR(255),
email VARCHAR(250),
address VARCHAR(255),
category enum('other','IT','marketing'),
name VARCHAR(255),
PRIMARY KEY (id_company)
);


CREATE TABLE user_company (
id_user INTEGER NOT NULL,
id_company INTEGER,
CONSTRAINT PRIMARY KEY (id_user,id_company),
CONSTRAINT user_company_fk Foreign key (id_user) references user_table(id_user),
CONSTRAINT company_fk Foreign key (id_company) references company_table(id_company)

);



CREATE TABLE notification_table(
id_notification INTEGER NOT NULL AUTO_INCREMENT,
message VARCHAR(255),
message_read boolean,
PRIMARY KEY (id_notification)
);


CREATE TABLE user_notification(
id_user INTEGER NOT NULL,
id_notification INTEGER,
CONSTRAINT PRIMARY KEY (id_user,id_notification),
CONSTRAINT user_fk Foreign key (id_user) references user_table(id_user),
CONSTRAINT notification_fk Foreign key (id_notification) references notification_table(id_notification)
);


-- users
INSERT INTO user_table (username , password , email, type_user)
VALUES ('1', '1', 'falcusanradudan@gmail.com', "admin");
INSERT INTO user_table (username , password , email, type_user)
VALUES ('2', '2', 'dsa@yahoo.com', "right1");
INSERT INTO user_table (username , password , email, type_user)
VALUES ('3', '3', 'falcusanradu@yahoo.com', "minimum");







