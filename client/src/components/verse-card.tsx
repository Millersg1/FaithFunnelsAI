import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface VerseCardProps {
  verse: string;
  reference: string;
}

export function VerseCard({ verse, reference }: VerseCardProps) {
  return (
    <Card className="border-l-4 border-l-primary" data-testid="card-verse">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-base leading-relaxed italic" data-testid="text-verse-content">
              "{verse}"
            </p>
            <p className="text-sm font-medium text-muted-foreground" data-testid="text-verse-reference">
              — {reference}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
