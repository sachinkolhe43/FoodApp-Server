CREATE TABLE Customers (
    customer_name        VARCHAR(120) NOT NULL,
    customer_mobile_no   VARCHAR(15) PRIMARY KEY,
    customer_pin         INT NOT NULL,
    customer_address     VARCHAR(255) NOT NULL,
    customer_email       VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE Category (
    product_category_id  INT PRIMARY KEY AUTO_INCREMENT,
    category_name        VARCHAR(120) NOT NULL
);

CREATE TABLE Products (
    product_id           INT PRIMARY KEY AUTO_INCREMENT,
    product_category_id  INT,
    product_name         VARCHAR(120) NOT NULL,
    product_description  VARCHAR(255),
    product_image        VARCHAR(120),
    FOREIGN KEY (product_category_id) REFERENCES Category(product_category_id)
);

CREATE TABLE ProductPricings (
    product_pricing_id           INT PRIMARY KEY AUTO_INCREMENT,
    product_small_price          DECIMAL(10, 2),
    product_large_price          DECIMAL(10, 2),
    product_sauce_price          DECIMAL(10, 2),
    product_mayonnaise_price     DECIMAL(10, 2),
    product_discount_price       DECIMAL(10, 2),
    product_id                   INT,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Carts (
    cart_id                      INT PRIMARY KEY AUTO_INCREMENT,
    customer_mobile_no           VARCHAR(15),
    product_id                   INT,
    product_quantity             INT,
    FOREIGN KEY (customer_mobile_no) REFERENCES Customers(customer_mobile_no),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Orders (
    order_id                     INT PRIMARY KEY AUTO_INCREMENT,
    customer_mobile_no           VARCHAR(15),
    product_id                   INT,
    product_quantity             INT,
    order_date_time              TIMESTAMP,
    total_order_price            DECIMAL(10, 2),
    FOREIGN KEY (customer_mobile_no) REFERENCES Customers(customer_mobile_no),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);