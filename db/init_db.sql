CREATE TABLE IF NOT EXISTS users (
   user_id SERIAL NOT NULL,
   login VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL,
   PRIMARY KEY (user_id)
);