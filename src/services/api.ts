import { Student, StudentFormData } from "@/types/student";

// En développement, utilise le proxy Vite configuré dans vite.config.ts
// En production, utilise VITE_API_URL ou l'URL par défaut
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new ApiError(response.status, error.error || "Une erreur est survenue");
  }

  return response.json();
}

export const studentApi = {
  // Récupérer tous les étudiants
  getAll: async (searchQuery?: string): Promise<Student[]> => {
    const endpoint = searchQuery 
      ? `/students?search=${encodeURIComponent(searchQuery)}`
      : "/students";
    return fetchApi<Student[]>(endpoint);
  },

  // Récupérer un étudiant par ID
  getById: async (id: string): Promise<Student> => {
    return fetchApi<Student>(`/students/${id}`);
  },

  // Créer un nouvel étudiant
  create: async (data: StudentFormData): Promise<Student> => {
    return fetchApi<Student>("/students", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Mettre à jour un étudiant
  update: async (id: string, data: Partial<StudentFormData>): Promise<Student> => {
    return fetchApi<Student>(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // Supprimer un étudiant
  delete: async (id: string): Promise<void> => {
    await fetchApi(`/students/${id}`, {
      method: "DELETE",
    });
  },
};

