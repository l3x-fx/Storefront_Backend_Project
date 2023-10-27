CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password_digest VARCHAR,
    address VARCHAR(100) NULL,
    zip INT NULL,
    city VARCHAR(100) NULL,
    country VARCHAR(100) NULL
);

INSERT INTO users (email, firstname, lastname, password_digest, address, zip, city, country) VALUES
    ('frodo@bagend.com', 'Frodo', 'Baggins', 'password1', '123 Shire Lane', '12345', 'Hobbiton', 'The Shire'),
    ('gandalf@wizardry.com', 'Gandalf', 'The Grey', 'password2', '456 Wizard Street', '54321', 'Everywhere', 'Fantasia'),
    ('aragorn@rangers.com', 'Aragorn', 'Elessar', 'password3', '789 Ranger Road', '67890', 'Gondor', 'Middle-earth'),
    ('legolas@woodlandrealm.com', 'Legolas', 'Greenleaf', 'password4', '101 Elf Way', '11223', 'Mirkwood', 'Middle-earth'),
    ('gimli@dwarves.com', 'Gimli', 'Son of Gloin', 'password5', '246 Dwarf Lane', '98765', 'Erebor', 'Middle-earth');