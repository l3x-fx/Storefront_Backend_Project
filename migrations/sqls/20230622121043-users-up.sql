CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password_digest VARCHAR
);

INSERT INTO users (username, firstname, lastname, password_digest) VALUES
    ('frodobaggins','Frodo', 'Baggins', 'password1'),
    ('gandalfthegrey', 'Gandalf', 'The Grey', 'password2'),
    ('aragornelessar', 'Aragorn', 'Elessar', 'password3'),
    ('legolasgreenleaf','Legolas', 'Greenleaf', 'password4'),
    ('gimlisonofgloin', 'Gimli', 'Son of Gloin', 'password5');