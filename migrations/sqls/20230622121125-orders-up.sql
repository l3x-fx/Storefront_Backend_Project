CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR,
    user_id BIGINT REFERENCES users(id)
);

INSERT INTO orders (status, user_id) VALUES 
    ('complete', 4),
    ('complete', 1),
    ('complete', 4),
    ('active', 4),
    ('complete', 1),
    ('complete', 2),
    ('active', 2),
    ('complete', 3),
    ('active', 5),
    ('active', 4),
    ('complete', 1),
    ('active', 5),
    ('active', 3),
    ('active', 1);