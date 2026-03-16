import 'dotenv/config';
import express from "express";
import { authMiddleware } from "@mono-shop/auth";

const app = express();
const PORT = 4002;

// In-memory invoice data
const invoices = [
  { id: "INV-001", total: 400, status: "paid" },
  { id: "INV-002", total: 150, status: "pending" },
  { id: "INV-003", total: 1200, status: "paid" },
  { id: "INV-004", total: 75, status: "pending" },
];

app.use(express.json());

app.get("/invoices", authMiddleware(["read:invoices"]), (req, res) => {
  res.json(invoices);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Invoice API running on http://localhost:${PORT}`);
});
