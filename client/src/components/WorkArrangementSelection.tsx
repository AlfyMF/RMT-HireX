import { Card } from "@/components/ui/card";
import { Building2, Globe2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface WorkArrangementSelectionProps {
  onSelect: (arrangement: "Offshore" | "Onsite") => void;
}

export default function WorkArrangementSelection({ onSelect }: WorkArrangementSelectionProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-6 py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Select Work Arrangement</h1>
      </div>

      <Alert className="border-primary/20 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-muted-foreground">
          Select whether the position is Onsite or Offshore.
          <br />
          This will determine which fields are shown in the following steps. You can change this later, but your progress will be reset.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <Card 
          className="p-8 cursor-pointer transition-all hover:shadow-xl hover:border-primary/50 hover:scale-[1.02] group"
          onClick={() => onSelect("Offshore")}
          data-testid="card-offshore"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Globe2 className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Offshore</h2>
              <p className="text-muted-foreground">
                Position based in India or remote locations
              </p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-8 cursor-pointer transition-all hover:shadow-xl hover:border-primary/50 hover:scale-[1.02] group"
          onClick={() => onSelect("Onsite")}
          data-testid="card-onsite"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Building2 className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Onsite</h2>
              <p className="text-muted-foreground">
                Position at client location
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
