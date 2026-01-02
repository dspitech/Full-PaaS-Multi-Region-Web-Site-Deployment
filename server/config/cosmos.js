import { CosmosClient } from "@azure/cosmos";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const databaseId = process.env.COSMOS_DATABASE_ID || "StudentsDB";
const containerId = process.env.COSMOS_CONTAINER_ID || "students";

if (!endpoint || !key) {
  throw new Error("COSMOS_ENDPOINT et COSMOS_KEY doivent être définis dans le fichier .env");
}

const client = new CosmosClient({ endpoint, key });

export { client, databaseId, containerId };

