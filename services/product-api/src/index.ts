import { protectApi } from "@monocloud/backend-node/express";
import "dotenv/config";
import express from "express";
import { products } from "./data";

const PORT = process.env.API_PORT || 4001;

const app = express();

const protect = protectApi();

app.use(express.json());

app.get("/products", protect({ scopes: ["read:products"] }), (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Product API running on http://localhost:${PORT}`);
});
