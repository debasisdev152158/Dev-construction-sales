import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mock API for products
  app.get("/api/products", (req, res) => {
    res.json([
      { id: "1", name: "OPC Cement", category: "Binding", price: 550, unit: "Bag", stock: 1000 },
      { id: "2", name: "TMT Rod 12mm", category: "Structural", price: 65000, unit: "Ton", stock: 50 },
      { id: "3", name: "River Sand", category: "Aggregates", price: 45, unit: "Cu.Ft", stock: 5000 },
      { id: "4", name: "Crushed Stone 20mm", category: "Aggregates", price: 60, unit: "Cu.Ft", stock: 3000 },
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
