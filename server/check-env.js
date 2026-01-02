import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger le .env
const envPath = join(__dirname, ".env");
dotenv.config({ path: envPath });

console.log("🔍 Vérification de la configuration .env\n");

// Vérifier si le fichier existe
if (!existsSync(envPath)) {
  console.error("❌ Le fichier .env n'existe pas dans le dossier server/");
  console.log("💡 Créez un fichier .env avec le contenu suivant :\n");
  console.log("COSMOS_ENDPOINT=https://your-account.documents.azure.com:443/");
  console.log("COSMOS_KEY=your-primary-key-here");
  console.log("COSMOS_DATABASE_ID=StudentsDB");
  console.log("COSMOS_CONTAINER_ID=students");
  console.log("PORT=4000");
  console.log("NODE_ENV=development");
  process.exit(1);
}

console.log("✅ Fichier .env trouvé\n");

// Variables requises
const requiredVars = {
  COSMOS_ENDPOINT: process.env.COSMOS_ENDPOINT,
  COSMOS_KEY: process.env.COSMOS_KEY,
  COSMOS_DATABASE_ID: process.env.COSMOS_DATABASE_ID || "StudentsDB",
  COSMOS_CONTAINER_ID: process.env.COSMOS_CONTAINER_ID || "students",
  PORT: process.env.PORT || "4000",
};

let hasErrors = false;

// Vérifier chaque variable
console.log("📋 Configuration actuelle :\n");

for (const [key, value] of Object.entries(requiredVars)) {
  if (key === "COSMOS_ENDPOINT" || key === "COSMOS_KEY") {
    if (!value || value.includes("your-") || value.includes("example")) {
      console.error(`❌ ${key}: Non configuré ou valeur d'exemple`);
      hasErrors = true;
    } else {
      // Masquer partiellement les valeurs sensibles
      const masked = key === "COSMOS_KEY" 
        ? value.substring(0, 10) + "..." 
        : value;
      console.log(`✅ ${key}: ${masked}`);
    }
  } else {
    console.log(`✅ ${key}: ${value}`);
  }
}

console.log("");

// Vérifications spécifiques
if (process.env.COSMOS_ENDPOINT) {
  if (!process.env.COSMOS_ENDPOINT.startsWith("https://") || 
      !process.env.COSMOS_ENDPOINT.includes("documents.azure.com")) {
    console.error("⚠️  COSMOS_ENDPOINT ne semble pas être une URL Cosmos DB valide");
    console.error("   Format attendu: https://your-account.documents.azure.com:443/");
    hasErrors = true;
  }
}

if (process.env.COSMOS_KEY) {
  if (process.env.COSMOS_KEY.length < 20) {
    console.error("⚠️  COSMOS_KEY semble trop courte (doit faire au moins 20 caractères)");
    hasErrors = true;
  }
}

if (hasErrors) {
  console.log("\n❌ Des erreurs ont été détectées dans votre configuration.");
  console.log("💡 Consultez COSMOS_DB_SETUP.md pour savoir comment obtenir vos clés Azure Cosmos DB");
  process.exit(1);
} else {
  console.log("✅ Configuration valide !");
  console.log("\n💡 Vous pouvez maintenant démarrer le serveur avec : npm start");
}

