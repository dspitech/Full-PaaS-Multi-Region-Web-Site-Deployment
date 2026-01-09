import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import studentsRouter from "./routes/students.js";
import { client, databaseId, containerId } from "./config/cosmos.js";

dotenv.config();

const app = express();
// Port imposé par Azure App Service en production, 4000 par défaut en local
const PORT = process.env.PORT || 4000;

// Résolution de __dirname en mode ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Servir le frontend Vite buildé (dossier dist à la racine du repo)
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

// Routes API
app.use("/api/students", studentsRouter);

// Route de santé
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API Cosmos DB est opérationnelle" });
});

// Fallback SPA : toutes les autres routes renvoient index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Initialisation de la base de données et du conteneur
async function initializeDatabase() {
  try {
    console.log("Connexion à Azure Cosmos DB...");
    
    // Créer la base de données si elle n'existe pas
    const { database } = await client.databases.createIfNotExists({
      id: databaseId,
    });
    console.log(`Base de données "${databaseId}" prête`);

    // Créer le conteneur si il n'existe pas
    const { container } = await database.containers.createIfNotExists({
      id: containerId,
      partitionKey: { paths: ["/id"] },
    });
    console.log(`Conteneur "${containerId}" prêt`);

    console.log("✅ Azure Cosmos DB initialisé avec succès");
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation de Cosmos DB:", error);
    process.exit(1);
  }
}

// Démarrer le serveur (Azure attend que l'app écoute sur PORT et host 0.0.0.0)
async function startServer() {
  await initializeDatabase();

  const host = "0.0.0.0";

  const server = app.listen(PORT, host, () => {
    console.log(`🚀 Serveur API démarré sur http://${host}:${PORT}`);
    console.log(`📊 Endpoints disponibles:`);
    console.log(`   - GET    /api/students`);
    console.log(`   - GET    /api/students/:id`);
    console.log(`   - POST   /api/students`);
    console.log(`   - PUT    /api/students/:id`);
    console.log(`   - DELETE /api/students/:id`);
    console.log(`   - GET    /health`);
    console.log(`   - (SPA)  /* -> dist/index.html`);
  });

  server.on("error", (error) => {
    console.error("❌ Erreur lors du démarrage du serveur:", error);
    process.exit(1);
  });
}

startServer().catch(console.error);

