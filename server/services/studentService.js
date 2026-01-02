import { client, databaseId, containerId } from "../config/cosmos.js";

const database = client.database(databaseId);
const container = database.container(containerId);

/**
 * Récupère tous les étudiants
 */
export async function getAllStudents() {
  try {
    const querySpec = {
      query: "SELECT * FROM c ORDER BY c.enrollmentDate DESC",
    };
    
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources;
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants:", error);
    throw error;
  }
}

/**
 * Récupère un étudiant par son ID
 */
export async function getStudentById(id) {
  try {
    const { resource } = await container.item(id, id).read();
    return resource;
  } catch (error) {
    if (error.code === 404) {
      return null;
    }
    console.error("Erreur lors de la récupération de l'étudiant:", error);
    throw error;
  }
}

/**
 * Crée un nouvel étudiant
 */
export async function createStudent(studentData) {
  try {
    // Générer un ID unique si non fourni
    const student = {
      id: studentData.id || `student-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...studentData,
      _ts: Math.floor(Date.now() / 1000), // Timestamp pour Cosmos DB
    };

    const { resource } = await container.items.create(student);
    return resource;
  } catch (error) {
    console.error("Erreur lors de la création de l'étudiant:", error);
    throw error;
  }
}

/**
 * Met à jour un étudiant existant
 */
export async function updateStudent(id, studentData) {
  try {
    const existingStudent = await getStudentById(id);
    if (!existingStudent) {
      throw new Error("Étudiant non trouvé");
    }

    const updatedStudent = {
      ...existingStudent,
      ...studentData,
      id, // S'assurer que l'ID reste le même
    };

    const { resource } = await container.item(id, id).replace(updatedStudent);
    return resource;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'étudiant:", error);
    throw error;
  }
}

/**
 * Supprime un étudiant
 */
export async function deleteStudent(id) {
  try {
    await container.item(id, id).delete();
    return { success: true, id };
  } catch (error) {
    if (error.code === 404) {
      throw new Error("Étudiant non trouvé");
    }
    console.error("Erreur lors de la suppression de l'étudiant:", error);
    throw error;
  }
}

/**
 * Recherche des étudiants par critères
 * Note: Cosmos DB CONTAINS est sensible à la casse, donc on récupère tous les étudiants
 * et on filtre côté serveur pour une recherche insensible à la casse et partielle
 */
export async function searchStudents(searchQuery) {
  try {
    // Récupérer tous les étudiants et filtrer côté serveur
    // C'est plus simple et permet une recherche insensible à la casse et partielle
    const allStudents = await getAllStudents();
    const searchLower = searchQuery.toLowerCase().trim();
    
    if (!searchLower) {
      return allStudents;
    }
    
    const filtered = allStudents.filter(student => {
      return (
        student.firstName?.toLowerCase().includes(searchLower) ||
        student.lastName?.toLowerCase().includes(searchLower) ||
        student.email?.toLowerCase().includes(searchLower) ||
        student.program?.toLowerCase().includes(searchLower)
      );
    });
    
    return filtered;
  } catch (error) {
    console.error("Erreur lors de la recherche d'étudiants:", error);
    throw error;
  }
}

