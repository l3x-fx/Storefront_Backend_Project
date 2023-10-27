CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(100),
    date VARCHAR,
    user_id BIGINT REFERENCES users(id)
);

INSERT INTO orders (status, date, user_id) VALUES 
    ('complete','2018-01-15',  4),
    ('complete','2018-01-15',  1),
    ('complete', '2018-01-15', 4),
    ('active', '2018-01-15', 4),
    ('complete','2018-01-15',  1),
    ('complete', '2018-01-15', 2),
    ('active','2018-01-15',  2),
    ('complete', '2018-01-15', 3),
    ('active', '2018-01-15', 5),
    ('active', '2018-01-15', 4),
    ('complete', '2018-01-15', 5),
    ('active', '2018-01-15',  5),
    ('active', '2018-01-15', 3),
    ('active', '2018-01-15', 1);