import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, GraduationCap, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Bienvenue sur <span className="gradient-text">EduManager</span>
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
              value={156}
              icon={Users}
              trend={{ value: 12, positive: true }}
              delay={0}
            />
            <StatsCard
              title="Étudiants Actifs"
              value={142}
              icon={UserCheck}
              trend={{ value: 5, positive: true }}
              delay={100}
            />
            <StatsCard
              title="Diplômés"
              value={14}
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

            <div className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-200 group cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Programmes</h3>
              <p className="text-sm text-muted-foreground">
                Gérez les programmes d'études disponibles.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
