import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: FilterState) => void;
  programs: string[];
}

export interface FilterState {
  status: string;
  program: string;
  year: string;
}

export function FilterModal({ open, onOpenChange, onApplyFilters, programs }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    program: "all",
    year: "all",
  });

  const handleApply = () => {
    onApplyFilters(filters);
    onOpenChange(false);
  };

  const handleReset = () => {
    const resetFilters = {
      status: "all",
      program: "all",
      year: "all",
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const activeFiltersCount = Object.values(filters).filter((v) => v !== "all").length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground flex items-center justify-between">
            <span>Filtrer les étudiants</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} actif{activeFiltersCount > 1 ? "s" : ""}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Filtre par statut */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Statut</Label>
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters({ ...filters, status: value })}
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
                <SelectItem value="graduated">Diplômé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtre par programme */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Programme</Label>
            <Select
              value={filters.program}
              onValueChange={(value) => setFilters({ ...filters, program: value })}
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Tous les programmes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les programmes</SelectItem>
                {programs.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filtre par année */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Année d'études</Label>
            <Select
              value={filters.year}
              onValueChange={(value) => setFilters({ ...filters, year: value })}
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Toutes les années" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les années</SelectItem>
                <SelectItem value="1">1ère année</SelectItem>
                <SelectItem value="2">2ème année</SelectItem>
                <SelectItem value="3">3ème année</SelectItem>
                <SelectItem value="4">4ème année</SelectItem>
                <SelectItem value="5">5ème année</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex gap-2 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            Réinitialiser
          </Button>
          <Button type="button" onClick={handleApply} className="flex-1">
            Appliquer les filtres
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

