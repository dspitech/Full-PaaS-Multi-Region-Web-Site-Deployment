import { useState, useMemo } from "react";
import { Student, StudentFormData } from "@/types/student";
import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { StudentTable } from "@/components/StudentTable";
import { AddStudentModal } from "@/components/AddStudentModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, UserCheck, GraduationCap, TrendingUp, Plus, Search, Filter } from "lucide-react";
import { toast } from "sonner";

const initialStudents: Student[] = [
  {
    id: "1",
    firstName: "Marie",
    lastName: "Laurent",
    email: "marie.laurent@universite.fr",
    phone: "+33 6 12 34 56 78",
    program: "Informatique",
    year: 3,
    status: "active",
    enrollmentDate: "2022-09-01",
  },
  {
    id: "2",
    firstName: "Thomas",
    lastName: "Bernard",
    email: "thomas.bernard@universite.fr",
    phone: "+33 6 98 76 54 32",
    program: "Commerce",
    year: 2,
    status: "active",
    enrollmentDate: "2023-09-01",
  },
  {
    id: "3",
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@universite.fr",
    phone: "+33 6 45 67 89 01",
    program: "Médecine",
    year: 5,
    status: "graduated",
    enrollmentDate: "2019-09-01",
  },
];

const Students = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        student.firstName.toLowerCase().includes(searchLower) ||
        student.lastName.toLowerCase().includes(searchLower) ||
        student.email.toLowerCase().includes(searchLower) ||
        student.program.toLowerCase().includes(searchLower)
      );
    });
  }, [students, searchQuery]);

  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => s.status === "active").length;
    const graduated = students.filter((s) => s.status === "graduated").length;
    return { total, active, graduated };
  }, [students]);

  const handleAddStudent = (data: StudentFormData) => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingStudent.id ? { ...data, id: editingStudent.id } : s
        )
      );
      toast.success("Étudiant modifié avec succès");
      setEditingStudent(null);
    } else {
      const newStudent: Student = {
        ...data,
        id: Date.now().toString(),
      };
      setStudents((prev) => [...prev, newStudent]);
      toast.success("Étudiant ajouté avec succès");
    }
  };

  const handleDeleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    toast.success("Étudiant supprimé");
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
            title="Diplômés"
            value={stats.graduated}
            icon={GraduationCap}
            delay={200}
          />
          <StatsCard
            title="Taux de Réussite"
            value="94%"
            icon={TrendingUp}
            trend={{ value: 3, positive: true }}
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
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtrer
            </Button>
            <Button onClick={() => setIsModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un étudiant
            </Button>
          </div>
        </div>

        {/* Students Table */}
        <StudentTable
          students={filteredStudents}
          onDelete={handleDeleteStudent}
          onEdit={handleEditStudent}
        />
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
    </div>
  );
};

export default Students;
