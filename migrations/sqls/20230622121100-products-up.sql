CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255), 
    description VARCHAR(255), 
    img_url VARCHAR(255),
    price INT NOT NULL, 
    category VARCHAR(100)
);

INSERT INTO products (name, description, img_url, price, category) VALUES
    ('Coffee', 'Premium blend coffee', 'https://i.imgur.com/IBvAwo4.jpg', 79, 'Food'),
    ('Whiskey', 'Aged whiskey', 'https://i.imgur.com/mZHcAq1.jpg', 1259, 'Food'),
    ('Sunglasses', 'Fashionable sunglasses', 'https://i.imgur.com/XS3vJMn.jpg', 299, 'Clothing'),
    ('Handbag', 'Designer handbag', 'https://i.imgur.com/VvqUvFr.jpg', 559, 'Clothing'),
    ('Perfume', 'Elegant fragrance', 'https://i.imgur.com/E3ZAnGx.jpg', 379, 'Accessories'),
    ('Pen', 'High-quality pen', 'https://i.imgur.com/sk7WR8N.jpg', 289, 'Accessories'),
    ('Shoes', 'Stylish shoes', 'https://i.imgur.com/ytXJbFF.jpg', 1999, 'Clothing'),
    ('Wrist Watch', 'Luxury wrist watch', 'https://i.imgur.com/LtEzU70.jpg', 2229, 'Accessories'),
    ('Red Wine', 'Fine red wine', 'https://i.imgur.com/dYOOaU7.jpg', 589, 'Food');