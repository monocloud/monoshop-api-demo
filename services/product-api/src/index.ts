import 'dotenv/config';
import express from "express";
import { authMiddleware } from "@mono-shop/auth";

const app = express();
const PORT = process.env.API_PORT || 4001;

// In-memory product data
const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Keyboard", price: 80 },
  { id: 3, name: "Mouse", price: 25 },
  { id: 4, name: "Monitor", price: 350 },
];

app.use(express.json());

app.get("/products", authMiddleware(["read:products"]), (req, res) => {
  res.json(products);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Product API running on http://localhost:${PORT}`);
});
