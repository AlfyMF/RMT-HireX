import { AlertCircle } from "lucide-react";

interface ValidationErrorProps {
  message?: string;
}

export default function ValidationError({ message }: ValidationErrorProps) {
  if (!message) return null;
  
  return (
    <div className="flex items-center gap-2 text-destructive text-sm mt-1" data-testid="validation-error">
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
