CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255), 
    price INT NOT NULL, 
    category VARCHAR(100)
);

INSERT INTO products (name, price, category) VALUES
    ('The One Ring', 999, 'Jewelry'),
    ('Sting', 159, 'Weapon'),
    ('Anduril', 589, 'Weapon'),
    ('Elven Cloak', 79, 'Apparel'),
    ('Evenstar Necklace', 99, 'Jewelry'),
    ('Mithril Armor', 299, 'Apparel'),
    ('Hobbit Pipe', 29, 'Accessories');