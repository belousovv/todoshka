-- CREATE DATABASE todo;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE todos(
    todo_id SERIAL,
    user_id UUID NOT NULL,
    solved BOOLEAN NOT NULL,
    description VARCHAR(255) NOT NULL,
    date BIGINT NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- fake data

-- INSERT INTO users (user_name, user_email, user_password) VALUES ('Vitalic', 'vitalic@mail.ru', '123');
-- INSERT INTO users (user_name, user_email, user_password) VALUES ('123', '123@mail.ru', '123');
-- INSERT INTO users (user_name, user_email, user_password) VALUES ('Olga', 'olga@mail.ru', '123');

-- INSERT INTO todos (user_id, solved, description, date) VALUES ('366ed2e1-b61d-4630-b8d9-42c45539856e', 'false', 'поесть', '02.12.21');