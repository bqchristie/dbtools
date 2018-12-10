curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
nvm install node

npm install pm2 -g


sudo apt-get update
sudo apt install git-all

sudo apt-get install mysql-server

systemctl start mysql

systemctl enable mysql

/usr/bin/mysql -u root -p

UPDATE mysql.user SET Password = PASSWORD('password') WHERE User = 'root';
CREATE USER 'app' IDENTIFIED BY 'password'
GRANT ALL PRIVILEGES ON *.* TO 'app'@'localhost';
CREA DATABASE test;

FLUSH PRIVILEGES;


mkdir /code
cd /code

git clone https://github.com/bqchristie/dbtools.git
git clone https://github.com/bqchristie/skizziks.git
