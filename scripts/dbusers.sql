CREATE USER 'app'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'app'@'localhost';

create DATABASE test