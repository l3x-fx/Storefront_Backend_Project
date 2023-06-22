CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHR(255), 
    price DECIMAL(10,2) NOT NULL, 
    category VARCHAR(100)
);

INSERT INTO products (name, price, category) VALUES
    ('The One Ring', 999.99, 'Jewelry'),
    ('Sting', 159.99, 'Weapon'),
    ('Anduril', 589.99, 'Weapon'),
    ('Elven Cloak', 79.99, 'Apparel'),
    ('Evenstar Necklace', 99.99, 'Jewelry'),
    ('Mithril Armor', 299.99, 'Apparel'),
    ('Hobbit Pipe', 29.99, 'Accessories');