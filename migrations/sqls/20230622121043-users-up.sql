CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100)
    password_digest VARCHAR
);

INSERT INTO users (firstname, lastname, password_digest) VALUES
    ('Frodo', 'Baggins', 'password1'),
    ('Gandalf', 'The Grey', 'password2'),
    ('Aragorn', 'Elessar', 'password3'),
    ('Legolas', 'Greenleaf', 'password4'),
    ('Gimli', 'Son of Gloin', 'password5');