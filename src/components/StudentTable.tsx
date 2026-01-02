import { useState } from "react";
import { Student } from "@/types/student";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Edit, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface StudentTableProps {
  students: Student[];
  onDelete: (id: string) => void;
  onEdit: (student: Student) => void;
}

const statusColors = {
  active: "bg-primary/20 text-primary border-primary/30",
  inactive: "bg-muted text-muted-foreground border-border",
  graduated: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const statusLabels = {
  active: "Actif",
  inactive: "Inactif",
  graduated: "Diplômé",
};

export function StudentTable({ students, onDelete, onEdit }: StudentTableProps) {
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const handleSendEmail = (student: Student) => {
    const subject = encodeURIComponent(`Message de EduManager`);
    const body = encodeURIComponent(
      `Bonjour ${student.firstName} ${student.lastName},\n\n`
    );
    window.open(`mailto:${student.email}?subject=${subject}&body=${body}`, '_blank');
    toast.success(`Ouverture de l'email pour ${student.firstName} ${student.lastName}`);
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      onDelete(studentToDelete.id);
      setStudentToDelete(null);
    }
  };

  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
          <span className="text-3xl">👨‍🎓</span>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          Aucun étudiant
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Commencez par ajouter votre premier étudiant en cliquant sur le bouton "Ajouter un étudiant"
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-border overflow-hidden animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Étudiant</TableHead>
              <TableHead className="text-muted-foreground font-medium">Programme</TableHead>
              <TableHead className="text-muted-foreground font-medium">Année</TableHead>
              <TableHead className="text-muted-foreground font-medium">Statut</TableHead>
              <TableHead className="text-muted-foreground font-medium">Contact</TableHead>
              <TableHead className="text-muted-foreground font-medium w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow 
                key={student.id} 
                className="border-border hover:bg-secondary/50 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {student.firstName[0]}{student.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-foreground">{student.program}</TableCell>
                <TableCell className="text-foreground">{student.year}ème année</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`${statusColors[student.status]} font-medium`}
                  >
                    {statusLabels[student.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{student.phone}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onEdit(student)} className="gap-2 cursor-pointer">
                        <Edit className="h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendEmail(student)} className="gap-2 cursor-pointer">
                        <Mail className="h-4 w-4" />
                        Envoyer un email
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setStudentToDelete(student)} 
                        className="gap-2 text-destructive focus:text-destructive cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!studentToDelete} onOpenChange={(open) => !open && setStudentToDelete(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Êtes-vous sûr de vouloir supprimer l'étudiant{" "}
              <span className="font-medium text-foreground">
                {studentToDelete?.firstName} {studentToDelete?.lastName}
              </span>{" "}
              ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary border-border hover:bg-secondary/80">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
