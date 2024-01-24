CREATE DATABASE SS Mall;

CREATE TABLE products(
    product_id VARCHAR PRIMARY KEY,
    product_name VARCHAR NOT NULL,
    product_image VARCHAR NOT NULL,
    product_price VARCHAR NOT NULL
);

CREATE TABLE cart(
    cart_id VARCHAR PRIMARY KEY,
    product_id VARCHAR NOT NULL
);

CREATE TABLE history(
    history_id VARCHAR PRIMARY KEY,
    product_id VARCHAR NOT NULL
);
