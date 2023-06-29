## API Requirements


#### Products
    Index:                          '/products'                         [GET] 
    Show:                           '/products/:id'                     [GET]
    Create:                         '/products'                         [POST]
    Top 5 most popular products:    '/products/stats/topFive'           [GET]
    Products by category:           '/products/category/:category'      [GET]

#### Users
    Index:                          '/users'                            [GET] 
    Show:                           '/users/:id'                        [GET] 
    Create:                         '/users'                            [POST] 
    Recent Order of User:           '/users/:userId/order/recent'       [GET]
    All completed Orders of User:   '/users/:userId/order/completed'    [GET]

#### Orders
    Show:                           '/orders/:orderId'                  [GET]
    Create:                         '/orders'                           [POST]
    Add Product To order:           '/orders/:orderId/products'         [POST]

## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- username
- firstName
- lastName
- password

#### Orders
- id
- user_id
- status of order (active or complete)
- products: list of products with their quantity

## Database Tables
#### Table Products 
    id                  SERIAL PRIMARY KEY
    name                VARCHAR(255)
    price               INT NOT NULL
    category            VARCHAR(100)

#### Table Users
    id                  SERIAL PRIMARY KEY
    username            VARCHAR(100)
    firstname           VARCHAR(100)
    lastname            VARCHAR(100)
    password_digest     VARCHAR

#### Table Orders
    id                  SERIAL PRIMARY KEY
    status              VARCHAR
    user_id             BIGINT REFERENCES users(id)

#### Table Order_Products
    id                  SERIAL PRIMARY KEY
    order_id            BIGINT REFERENCES orders(id)
    product_id          BIGINT REFERENCES products(id)
    quantity            INT

