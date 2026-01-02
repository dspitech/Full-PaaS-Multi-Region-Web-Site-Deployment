import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentsRouter from "./routes/students.js";
import { client, databaseId, containerId } from "./config/cosmos.js";

dotenv.config();

const app = express();
// Utiliser un port plus élevé pour éviter les conflits avec les ports réservés Windows
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentsRouter);

// Route de santé
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API Cosmos DB est opérationnelle" });
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

// Fonction pour essayer de démarrer le serveur sur un port
function tryStartServer(port, host = "127.0.0.1") {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, host, () => {
      resolve(server);
    });
    
    server.on('error', (error) => {
      reject(error);
    });
  });
}

// Démarrer le serveur
async function startServer() {
  await initializeDatabase();
  
  const host = "127.0.0.1";
  const portsToTry = [PORT, 4000, 4001, 4002, 5000, 5001];
  
  console.log(`🔌 Tentative de démarrage sur le port ${PORT}...`);
  
  for (const port of portsToTry) {
    try {
      const server = await tryStartServer(port, host);
      
      console.log(`🚀 Serveur API démarré sur http://${host}:${port}`);
      console.log(`📊 Endpoints disponibles:`);
      console.log(`   - GET    /api/students`);
      console.log(`   - GET    /api/students/:id`);
      console.log(`   - POST   /api/students`);
      console.log(`   - PUT    /api/students/:id`);
      console.log(`   - DELETE /api/students/:id`);
      console.log(`   - GET    /health`);
      console.log(`\n💡 Note: Si vous avez défini PORT dans .env, mettez à jour vite.config.ts pour utiliser le port ${port}`);
      return;
    } catch (error) {
      if (error.code === 'EACCES' || error.code === 'EADDRINUSE') {
        if (port === PORT) {
          console.log(`⚠️  Port ${port} non disponible, essai du port suivant...`);
        }
        continue;
      } else {
        console.error(`❌ Erreur lors du démarrage du serveur:`, error);
        process.exit(1);
      }
    }
  }
  
  console.error(`❌ Impossible de démarrer le serveur sur les ports essayés: ${portsToTry.join(", ")}`);
  console.error(`💡 Solutions possibles:`);
  console.error(`   1. Vérifiez qu'aucun autre processus n'utilise ces ports`);
  console.error(`   2. Définissez un port spécifique dans .env: PORT=5000`);
  console.error(`   3. Sur Windows, exécutez PowerShell en tant qu'administrateur`);
  process.exit(1);
}

startServer().catch(console.error);

