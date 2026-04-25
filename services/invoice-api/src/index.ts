import { protectApi } from '@monocloud/backend-node/express';
import 'dotenv/config';
import express from "express";
import { invoices } from './data';

const PORT = process.env.API_PORT || 4002;

const app = express();

const protect = protectApi();

app.use(express.json());

app.get("/invoices", protect({ scopes: ["read:invoices"] }), (req, res) => {
  res.json(invoices);
});

app.listen(PORT, () => {
  console.log(`Invoice API running on http://localhost:${PORT}`);
});
