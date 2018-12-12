CREATE USER 'app'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'app'@'localhost';
create DATABASE test;


https://support.rackspace.com/how-to/installing-mysql-server-on-ubuntu/



root /Kjp26er1


UPDATE USER set authentication_string = password('app'@'localhost') where user