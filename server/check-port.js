import dotenv from "dotenv";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

dotenv.config();

const PORT = process.env.PORT || 3001;

console.log("🔍 Diagnostic du port...\n");
console.log(`Port configuré: ${PORT}`);
console.log(`Variable d'environnement PORT: ${process.env.PORT || "non définie (utilise la valeur par défaut 3001)"}\n`);

// Vérifier si le port est utilisé (Windows)
async function checkPortWindows(port) {
  try {
    const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
    if (stdout) {
      console.log(`⚠️  Le port ${port} est déjà utilisé:`);
      console.log(stdout);
      return true;
    }
    return false;
  } catch (error) {
    // Port non utilisé
    return false;
  }
}

async function main() {
  const isUsed = await checkPortWindows(PORT);
  
  if (isUsed) {
    console.log(`\n💡 Solution: Changez le port dans votre fichier .env:`);
    console.log(`   PORT=3001`);
    console.log(`\n   Ou arrêtez le processus qui utilise le port ${PORT}`);
  } else {
    console.log(`✅ Le port ${PORT} est disponible`);
    console.log(`\n💡 Si vous avez toujours des erreurs:`);
    console.log(`   1. Vérifiez que votre fichier .env contient: PORT=3001`);
    console.log(`   2. Ou supprimez la ligne PORT de .env pour utiliser la valeur par défaut`);
    console.log(`   3. Redémarrez le serveur`);
  }
}

main().catch(console.error);

