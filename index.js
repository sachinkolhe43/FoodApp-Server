const express = require("express");
const cors = require("cors");
const routerCustomer = require("./router/customer");
// const routerProduct = require('./product')
// const routerAdmin = require('./admin')

const app = express();
app.use(express.json());
app.use(cors());

app.use(routerCustomer);
// app.use(routerProduct)
// app.use(routerAdmin)

app.listen(4000, "0.0.0.0", () => {
  console.log("Server started at port 4000");
});
