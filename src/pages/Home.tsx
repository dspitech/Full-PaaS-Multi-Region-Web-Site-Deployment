import { useState } from "react";
import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { ProgramsModal } from "@/components/ProgramsModal";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, GraduationCap, TrendingUp, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { studentApi } from "@/services/api";
import { useMemo } from "react";

const Home = () => {
  const [isProgramsModalOpen, setIsProgramsModalOpen] = useState(false);
  // Récupérer les étudiants depuis l'API pour automatiser les données
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: () => studentApi.getAll(),
    staleTime: 30000,
  });

  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => s.status === "active").length;
    const graduated = students.filter((s) => s.status === "graduated").length;
    const uniquePrograms = new Set(students.map((s) => s.program).filter(Boolean));
    const programCount = uniquePrograms.size;
    // Calculer le taux de réussite (diplômés / total * 100)
    const successRate = total > 0 ? Math.round((graduated / total) * 100) : 0;
    return { total, active, graduated, programCount, successRate };
  }, [students]);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Bienvenue sur <span className="gradient-text">DSPI-TECH</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            La plateforme professionnelle de gestion des étudiants. 
            Gérez facilement les inscriptions, suivez les parcours et optimisez votre administration.
          </p>
          <Link to="/etudiants">
            <Button size="lg" className="gap-2">
              Gérer les étudiants
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-foreground mb-6 animate-fade-in">
            Vue d'ensemble
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Étudiants"
              value={isLoading ? "..." : stats.total}
              icon={Users}
              trend={{ value: 12, positive: true }}
              delay={0}
            />
            <StatsCard
              title="Étudiants Actifs"
              value={isLoading ? "..." : stats.active}
              icon={UserCheck}
              trend={{ value: 5, positive: true }}
              delay={100}
            />
            <StatsCard
              title="Programmes"
              value={isLoading ? "..." : stats.programCount}
              icon={BookOpen}
              delay={200}
            />
            <StatsCard
              title="Taux de Réussite"
              value={isLoading ? "..." : `${stats.successRate}%`}
              icon={TrendingUp}
              trend={{ value: 3, positive: true }}
              delay={300}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/etudiants" className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Liste des étudiants</h3>
              <p className="text-sm text-muted-foreground">
                Consultez et gérez la liste complète des étudiants inscrits.
              </p>
            </Link>

            <Link to="/etudiants" className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <UserCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Ajouter un étudiant</h3>
              <p className="text-sm text-muted-foreground">
                Enregistrez un nouvel étudiant dans le système.
              </p>
            </Link>

            <div 
              className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-200 group cursor-pointer"
              onClick={() => setIsProgramsModalOpen(true)}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Programmes</h3>
              <p className="text-sm text-muted-foreground">
                Consultez les programmes d'études disponibles.
              </p>
            </div>
          </div>
        </div>
      </main>

      <ProgramsModal
        open={isProgramsModalOpen}
        onOpenChange={setIsProgramsModalOpen}
        students={students}
      />
    </div>
  );
};

export default Home;
