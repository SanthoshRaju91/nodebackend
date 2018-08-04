const express = require("express");
const routes = new express.Router();
const products = require("./data/products.json");

routes.get("/products", (req, res) => {
  res.json({
    success: true,
    products
  });
});

routes.get("/product/:sku", (req, res) => {
  const { sku } = req.params;
  const selected = products.filter(current => current.productSKU === sku);

  res.json({
    success: true,
    product: selected
  });
});

routes.get("/products/:key/:cond", (req, res) => {
  const { key, cond } = req.params;

  const [condition, value] = cond.split(":");

  const filterProducts = products.filter(current =>
    meetCondition(current, key, condition, value)
  );

  res.json({
    success: true,
    products: filterProducts
  });
});

function meetCondition(current, key, condition, value) {
  switch (condition) {
    case "lt":
      return current[key] < value;
    case "lte":
      return current[key] <= value;

    case "gt":
      return current[key] > value;
    case "gte":
      return current[key] >= value;
    case "eq":
      return current[key] === value;
    default:
      return current;
  }
}

module.exports = routes;
