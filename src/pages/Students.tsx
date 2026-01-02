import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Student, StudentFormData } from "@/types/student";
import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { StudentTable } from "@/components/StudentTable";
import { AddStudentModal } from "@/components/AddStudentModal";
import { FilterModal, FilterState } from "@/components/FilterModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, UserCheck, GraduationCap, TrendingUp, Plus, Search, Filter, Loader2, BookOpen, X } from "lucide-react";
import { toast } from "sonner";
import { studentApi } from "@/services/api";
import { Badge } from "@/components/ui/badge";

const Students = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    program: "all",
    year: "all",
  });
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const queryClient = useQueryClient();

  // Récupérer les étudiants depuis l'API
  const { data: allStudents = [], isLoading, error } = useQuery({
    queryKey: ["students"],
    queryFn: () => studentApi.getAll(),
    staleTime: 30000, // Cache pendant 30 secondes
  });

  // Filtrer les étudiants localement
  const students = useMemo(() => {
    let filtered = allStudents;

    // Filtre par recherche
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter((student) =>
        student.firstName?.toLowerCase().includes(searchLower) ||
        student.lastName?.toLowerCase().includes(searchLower) ||
        student.email?.toLowerCase().includes(searchLower) ||
        student.program?.toLowerCase().includes(searchLower)
      );
    }

    // Filtre par statut
    if (filters.status !== "all") {
      filtered = filtered.filter((student) => student.status === filters.status);
    }

    // Filtre par programme
    if (filters.program !== "all") {
      filtered = filtered.filter((student) => student.program === filters.program);
    }

    // Filtre par année
    if (filters.year !== "all") {
      filtered = filtered.filter((student) => student.year === parseInt(filters.year));
    }

    return filtered;
  }, [allStudents, searchQuery, filters]);

  // Mutation pour créer/mettre à jour un étudiant
  const mutation = useMutation({
    mutationFn: async (data: { student: StudentFormData; id?: string }) => {
      if (data.id) {
        return studentApi.update(data.id, data.student);
      } else {
        return studentApi.create(data.student);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success(editingStudent ? "Étudiant modifié avec succès" : "Étudiant ajouté avec succès");
      setIsModalOpen(false);
      setEditingStudent(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Une erreur est survenue");
    },
  });

  // Mutation pour supprimer un étudiant
  const deleteMutation = useMutation({
    mutationFn: studentApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Étudiant supprimé");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erreur lors de la suppression");
    },
  });

  const stats = useMemo(() => {
    const total = allStudents.length;
    const active = allStudents.filter((s) => s.status === "active").length;
    const graduated = allStudents.filter((s) => s.status === "graduated").length;
    // Compter le nombre de programmes uniques
    const uniquePrograms = new Set(allStudents.map((s) => s.program).filter(Boolean));
    const programCount = uniquePrograms.size;
    // Calculer le taux de réussite (diplômés / total * 100)
    const successRate = total > 0 ? Math.round((graduated / total) * 100) : 0;
    // Calculer la variation du mois (simulation - vous pouvez améliorer avec des données réelles)
    const previousMonthRate = total > 0 ? Math.round(((graduated - 3) / (total - 3)) * 100) : 0;
    const trendValue = successRate - previousMonthRate;
    return { total, active, graduated, programCount, successRate, trendValue };
  }, [allStudents]);

  // Extraire les programmes uniques pour le filtre
  const uniquePrograms = useMemo(() => {
    return Array.from(new Set(allStudents.map((s) => s.program).filter(Boolean))).sort();
  }, [allStudents]);

  const activeFiltersCount = Object.values(filters).filter((v) => v !== "all").length;

  const handleAddStudent = (data: StudentFormData) => {
    mutation.mutate({
      student: data,
      id: editingStudent?.id,
    });
  };

  const handleDeleteStudent = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">Gestion des étudiants</h1>
          <p className="text-muted-foreground">Gérez la liste complète des étudiants inscrits</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Étudiants"
            value={stats.total}
            icon={Users}
            trend={{ value: 12, positive: true }}
            delay={0}
          />
          <StatsCard
            title="Étudiants Actifs"
            value={stats.active}
            icon={UserCheck}
            trend={{ value: 5, positive: true }}
            delay={100}
          />
          <StatsCard
            title="Programmes"
            value={stats.programCount}
            icon={BookOpen}
            delay={200}
          />
          <StatsCard
            title="Taux de Réussite"
            value={`${stats.successRate}%`}
            icon={TrendingUp}
            trend={{ value: stats.trendValue, positive: stats.trendValue >= 0 }}
            delay={300}
          />
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un étudiant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="gap-2 relative"
              onClick={() => setIsFilterModalOpen(true)}
            >
              <Filter className="h-4 w-4" />
              Filtrer
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setFilters({ status: "all", program: "all", year: "all" });
                }}
                className="h-10 w-10"
                title="Réinitialiser les filtres"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button onClick={() => setIsModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un étudiant
            </Button>
          </div>
        </div>

        {/* Students Table */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Chargement des étudiants...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Erreur de chargement
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-4">
              {error instanceof Error ? error.message : "Impossible de charger les étudiants"}
            </p>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["students"] })}>
              Réessayer
            </Button>
          </div>
        ) : (
          <StudentTable
            students={students}
            onDelete={handleDeleteStudent}
            onEdit={handleEditStudent}
          />
        )}
      </main>

      <AddStudentModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setEditingStudent(null);
        }}
        onSubmit={handleAddStudent}
        editingStudent={editingStudent}
      />

      <FilterModal
        open={isFilterModalOpen}
        onOpenChange={setIsFilterModalOpen}
        onApplyFilters={setFilters}
        programs={uniquePrograms}
      />
    </div>
  );
};

export default Students;
