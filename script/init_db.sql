CREATE DATABASE `academy_node`;

GRANT ALL PRIVILEGES ON `academy_node`.* TO 'academy_user'@'localhost' IDENTIFIED BY 'academy_user';

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `users` (id, username, password, email, phone)
VALUE ('1', 'Test1', '$2a$10$S1QckBaggeHAVFYvzr/.CutZIiTpbqLZEWHc01K2xoNcXBJ1eOFr2', 'test1@wata.ninja', '666777888');