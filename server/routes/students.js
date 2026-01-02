import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  searchStudents,
} from "../services/studentService.js";

const router = express.Router();

// GET /api/students - Récupère tous les étudiants
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    
    let students;
    if (search) {
      students = await searchStudents(search);
    } else {
      students = await getAllStudents();
    }
    
    res.json(students);
  } catch (error) {
    console.error("Erreur GET /api/students:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des étudiants" });
  }
});

// GET /api/students/:id - Récupère un étudiant par ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await getStudentById(id);
    
    if (!student) {
      return res.status(404).json({ error: "Étudiant non trouvé" });
    }
    
    res.json(student);
  } catch (error) {
    console.error("Erreur GET /api/students/:id:", error);
    res.status(500).json({ error: "Erreur lors de la récupération de l'étudiant" });
  }
});

// POST /api/students - Crée un nouvel étudiant
router.post("/", async (req, res) => {
  try {
    const studentData = req.body;
    
    // Validation basique
    if (!studentData.firstName || !studentData.lastName || !studentData.email) {
      return res.status(400).json({ error: "Les champs firstName, lastName et email sont requis" });
    }
    
    const student = await createStudent(studentData);
    res.status(201).json(student);
  } catch (error) {
    console.error("Erreur POST /api/students:", error);
    res.status(500).json({ error: "Erreur lors de la création de l'étudiant" });
  }
});

// PUT /api/students/:id - Met à jour un étudiant
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const studentData = req.body;
    
    const student = await updateStudent(id, studentData);
    res.json(student);
  } catch (error) {
    console.error("Erreur PUT /api/students/:id:", error);
    if (error.message === "Étudiant non trouvé") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'étudiant" });
  }
});

// DELETE /api/students/:id - Supprime un étudiant
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteStudent(id);
    res.json({ success: true, message: "Étudiant supprimé avec succès" });
  } catch (error) {
    console.error("Erreur DELETE /api/students/:id:", error);
    if (error.message === "Étudiant non trouvé") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur lors de la suppression de l'étudiant" });
  }
});

export default router;

