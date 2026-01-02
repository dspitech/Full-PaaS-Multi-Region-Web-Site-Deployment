import { useMemo } from "react";
import { Student } from "@/types/student";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, GraduationCap, TrendingUp } from "lucide-react";

interface ProgramsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  students: Student[];
}

export function ProgramsModal({ open, onOpenChange, students }: ProgramsModalProps) {
  const programsData = useMemo(() => {
    const programMap = new Map<string, {
      name: string;
      total: number;
      active: number;
      graduated: number;
      years: { [key: number]: number };
    }>();

    students.forEach((student) => {
      if (!student.program) return;

      if (!programMap.has(student.program)) {
        programMap.set(student.program, {
          name: student.program,
          total: 0,
          active: 0,
          graduated: 0,
          years: {},
        });
      }

      const program = programMap.get(student.program)!;
      program.total++;
      
      if (student.status === "active") program.active++;
      if (student.status === "graduated") program.graduated++;
      
      if (!program.years[student.year]) {
        program.years[student.year] = 0;
      }
      program.years[student.year]++;
    });

    return Array.from(programMap.values()).sort((a, b) => b.total - a.total);
  }, [students]);

  const getSuccessRate = (program: typeof programsData[0]) => {
    if (program.total === 0) return 0;
    return Math.round((program.graduated / program.total) * 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-card border-border max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Programmes d'études
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {programsData.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">Aucun programme disponible</p>
            </div>
          ) : (
            programsData.map((program, index) => {
              const successRate = getSuccessRate(program);
              const yearEntries = Object.entries(program.years).sort((a, b) => 
                parseInt(a[0]) - parseInt(b[0])
              );

              return (
                <div
                  key={program.name}
                  className="glass-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* En-tête du programme */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {program.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="gap-1">
                          <Users className="w-3 h-3" />
                          {program.total} étudiant{program.total > 1 ? "s" : ""}
                        </Badge>
                        <Badge variant="outline" className="gap-1 bg-primary/10 text-primary border-primary/20">
                          <GraduationCap className="w-3 h-3" />
                          {program.active} actif{program.active > 1 ? "s" : ""}
                        </Badge>
                        {program.graduated > 0 && (
                          <Badge variant="outline" className="gap-1 bg-blue-500/10 text-blue-400 border-blue-500/20">
                            <TrendingUp className="w-3 h-3" />
                            {program.graduated} diplômé{program.graduated > 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {successRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">Taux de réussite</div>
                    </div>
                  </div>

                  {/* Répartition par année */}
                  {yearEntries.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm font-medium text-muted-foreground mb-3">
                        Répartition par année :
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {yearEntries.map(([year, count]) => (
                          <div
                            key={year}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border border-border"
                          >
                            <span className="text-sm font-medium text-foreground">
                              {year}ère année
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {count}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Résumé global */}
        {programsData.length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {programsData.length}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Programmes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {students.length}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Total étudiants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(
                    (students.filter((s) => s.status === "graduated").length / students.length) * 100
                  ) || 0}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">Taux global</div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

