CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id),
    quantity INT
);

INSERT INTO order_products (order_id, product_id, quantity) VALUES
    (1, 1, 2),   
    (2, 2, 1),    
    (2, 4, 1),    
    (3, 3, 3),    
    (3, 6, 2),    
    (4, 5, 1),    
    (5, 3, 1),    
    (5, 4, 1),    
    (5, 6, 1),    
    (6, 7, 1),    
    (6, 2, 1),    
    (6, 4, 2),   
    (7, 2, 1),   
    (8, 7, 3),    
    (9, 5, 2),    
    (10, 3, 2),   
    (11, 1, 2),   
    (12, 5, 1),   
    (12, 6, 1),  
    (13, 3, 1),   
    (14, 2, 1),  
    (14, 6, 1);   