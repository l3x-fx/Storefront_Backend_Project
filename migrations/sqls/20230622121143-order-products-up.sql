CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id),
    quantity INT
);

INSERT INTO order_products (order_id, product_id, quantity) VALUES
    (1, 1, 2),    -- Order 1: The One Ring (2 items)
    (2, 2, 1),    -- Order 2: Sting (1 item)
    (2, 4, 1),    -- Order 2: Elven Cloak (1 item)
    (3, 3, 3),    -- Order 3: Anduril (3 items)
    (3, 6, 2),    -- Order 3: Mithril Armor (2 items)
    (4, 5, 1),    -- Order 4: Evenstar Necklace (1 item)
    (5, 3, 1),    -- Order 5: Anduril (1 item)
    (5, 4, 1),    -- Order 5: Elven Cloak (1 item)
    (5, 6, 1),    -- Order 5: Mithril Armor (1 item)
    (6, 7, 1),    -- Order 6: Hobbit Pipe (1 item)
    (6, 2, 1),    -- Order 6: Sting (1 item)
    (6, 4, 2),    -- Order 6: Elven Cloak (2 items)
    (7, 2, 1),    -- Order 7: Sting (1 item)
    (8, 7, 3),    -- Order 8: Hobbit Pipe (3 items)
    (9, 5, 2),    -- Order 9: Evenstar Necklace (2 items)
    (10, 3, 2),   -- Order 10: Anduril (2 items)
    (11, 1, 2),   -- Order 11: The One Ring (2 items)
    (12, 5, 1),   -- Order 12: Evenstar Necklace (1 item)
    (12, 6, 1),   -- Order 12: Mithril Armor (1 item)
    (13, 3, 1),   -- Order 13: Anduril (1 item)
    (14, 2, 1),   -- Order 14: Sting (1 item)
    (14, 6, 1);   -- Order 14: Mithril Armor (1 item)