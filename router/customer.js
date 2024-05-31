const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

router.get("/customers", (request, response) => {
  const statment = "Select * from Customers";
  db.connection.query(statment, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//customer - customer register

router.post("/register", (request, response) => {
  const {
    customer_name,
    customer_mobile_no,
    customer_pin,
    customer_address,
    customer_email,
  } = request.body;
  db.query(
    "INSERT INTO Customers(customer_name,customer_mobile_no,	customer_pin,customer_address ,customer_email) VALUES(?,?,?,?,?)",
    [
      customer_name,
      customer_mobile_no,
      customer_pin,
      customer_address,
      customer_email,
    ],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

//Customer - Customer login
router.post("/login", (request, response) => {
  console.log(request.body);
  const { customer_mobile_no, customer_pin } = request.body;
  const statement =
    "SELECT * FROM Customers WHERE customer_mobile_no=? and customer_pin=?";
  db.query(statement, [customer_mobile_no, customer_pin], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//customer - fetch perticular customer details
router.get("/customers/:id", (request, response) => {
  const id = request.params.id;
  const statement = "SELECT * FROM Customers WHERE customer_mobile_no = ?";
  db.connection.query(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//customers  Past Orders
router.get("/customers/:id/orders", (request, response) => {
  const id = request.params.id;
  const statement = `
        SELECT Orders.*, Products.product_name
        FROM Orders
        JOIN Products ON Orders.product_id = Products.product_id
        WHERE Orders.customer_mobile_no = ?
        ORDER BY Orders.order_date_time DESC
    `;
  db.connection.query(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// Add product to cart
router.post("/cart/add", (request, response) => {
  const { customer_mobile_no, product_id, product_quantity } = request.body;
  const statement =
    "INSERT INTO Carts (customer_mobile_no, product_id, product_quantity) VALUES (?, ?, ?)";
  db.connection.query(
    statement,
    [customer_mobile_no, product_id, product_quantity],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

// Buy Now - Adding Data to Order table
router.post("/buy-now", (request, response) => {
  const {
    customer_mobile_no,
    product_id,
    product_quantity,
    total_order_price,
  } = request.body;
  const statement = `
        INSERT INTO Orders (customer_mobile_no, product_id, product_quantity, order_date_time, total_order_price) 
        VALUES (?, ?, ?, NOW(), ?)
    `;
  db.connection.query(
    statement,
    [customer_mobile_no, product_id, product_quantity, total_order_price],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

// Fetch all categories with their products
router.get("/categories-with-products", (request, response) => {
  const categoryStatement = "SELECT * FROM Category";
  db.connection.query(categoryStatement, (error, categories) => {
    if (error) {
      return response.send(utils.createResult(error));
    }

    const categoryIds = categories.map(
      (category) => category.product_category_id
    );
    if (categoryIds.length === 0) {
      return response.send(utils.createResult(null, []));
    }

    const productStatement = `
            SELECT * 
            FROM Products 
            WHERE product_category_id IN (?)
        `;

    db.connection.query(productStatement, [categoryIds], (error, products) => {
      if (error) {
        return response.send(utils.createResult(error));
      }

      const categoryMap = categories.reduce((map, category) => {
        map[category.product_category_id] = {
          ...category,
          products: [],
        };
        return map;
      }, {});

      products.forEach((product) => {
        categoryMap[product.product_category_id].products.push(product);
      });

      const result = Object.values(categoryMap);
      response.send(utils.createResult(null, result));
    });
  });
});

//Showing Product Details when we click on product
// Fetch product details by product ID
router.get("/products/:id", (request, response) => {
  const productId = request.params.id;
  const statement = `
        SELECT p.*, c.category_name 
        FROM Products p
        JOIN Category c ON p.product_category_id = c.product_category_id
        WHERE p.product_id = ?
    `;
  db.connection.query(statement, [productId], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
