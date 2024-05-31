INSERT INTO Customers (customer_name, customer_mobile_no, customer_pin, customer_address, customer_email)
VALUES 
('Snehadeep Chougule', '7276503051', 1234, 'Chintamani Nagar,Sangli', 'snehadeepchougule2509@gmail.com'),
('Sachin Kolhe', '9730654183', 1234, 'Aambrai', 'sachin@gamil.com'),
('xyz', '5555555555', 5555, 'College Corner,Sangli', 'xyz@gmail.com');


INSERT INTO Category (category_name)
VALUES 
('Pizza'),
('Burger'),
('Pasta');


INSERT INTO Products (product_category_id, product_name, product_description, product_image)
VALUES 
(1, 'Panner Pizza', 'Rich on panner Tasty pizza', 'PannerPizza.jpg'),
(1, 'Vegitables Pizza', 'Mixture of fresh vaggies', 'VegitablesPizza.jpg'),
(2, 'Cheese Burger', 'Loaded with Cheese', 'CheeseBurger.jpg'),
(3, 'Bow Tie Pasta', 'Resembles a small bow tie with a frilled edge', 'BowTiePasta.jpg');


INSERT INTO ProductPricings (product_small_price, product_large_price, product_sauce_price, product_mayonnaise_price, product_discount_price, product_id)
VALUES 
(599.99, 849.99, 20, 40, 129.00, 1),
(999.99, 1299.99, 20, 40, 129.00, 2),
(299.00, 350.00, 20, 40, 129.00, 3),
(399.00, 450.00 , 20, 40, 129.00, 4);


INSERT INTO Carts (customer_mobile_no, product_id, product_quantity)
VALUES 
('7276503051', 1, 1),
('9730654183', 2, 1),
('5555555555', 3, 2);


INSERT INTO Orders (customer_mobile_no, product_id, product_quantity, order_date_time, total_order_price)
VALUES 
('7276503051', 1, 1, '2024-05-26 14:30:00', 659.99),
('9730654183', 2, 1, '2024-05-26 15:00:00', 999.99),
('5555555555', 3, 2, '2024-05-26 16:00:00', 339.00);