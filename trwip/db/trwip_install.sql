CREATE DATABASE trwip;

CREATE USER 'usrtrwip'@'localhost' IDENTIFIED BY 'trwipusr';
GRANT ALL PRIVILEGES ON trwip. * TO 'usrtrwip'@'localhost';
FLUSH PRIVILEGES;

USE trwip;

