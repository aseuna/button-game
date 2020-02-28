# button-game

Showcase application. The application uses PostgreSQL server database to store total number of clicks across all users. The server script connects the application to the database.

## Prerequisites for running web application locally

Nodejs installed, version 12.13.1 or higher
PostgreSQL server installed, version 12.2 or higher

## Setting up PostgreSQL server

- Install PostgreSQL per installation wizard downloaded from https://www.postgresql.org/
- Open SQL shell for postgreSQL.
- Type login credentials in the shell, defaults are given(personally I used the default superuser login credentials when testing locally)
- Type in following commands in the shell:
```
CREATE DATABASE button_game;
\c button_game
CREATE TABLE bg_num (id SERIAL PRIMARY KEY, total_number Integer NOT NULL);
INSERT INTO bg_num (total_number) VALUES (0);
\q -- disconnects from the database server
```
- you can modify table and column names, but the changes must be reflected in the database queries in the code
- add .env -file to the project root and add following line in the file:
```
CONNECTIONSTRING='postgresql://"user":"password"@"host":"port"/"database_name"'
```
- replace login credentials to the connection string (without quotation marks), for example "user" is by default postgres
- if you test locally "host" is most likely localhost

## Installing node modules and running development server and building vue project

- Run command node install at the project root to install node modules
- When running development server for vue project:
    - Run command node server.js
    - Open another terminal/command promt instance and run command npm run serve
    - Open browser and type dev server address in the address bar
- When building vue project
    - Run command npm run build
    - Run command node server.js
    - Open browser and type "localhost:3000" in the address bar