import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  storageKey: string;
  durationMinutes?: number;
}

export function CountdownTimer({ storageKey, durationMinutes = 10 }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const stored = sessionStorage.getItem(storageKey);
    if (stored) {
      const endTime = parseInt(stored, 10);
      const remaining = Math.max(0, endTime - Date.now());
      return remaining;
    }
    const endTime = Date.now() + durationMinutes * 60 * 1000;
    sessionStorage.setItem(storageKey, endTime.toString());
    return durationMinutes * 60 * 1000;
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = Math.max(0, prev - 1000);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const isUrgent = timeLeft < 3 * 60 * 1000;

  return (
    <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-lg border-2 ${
      isUrgent 
        ? 'bg-destructive/10 border-destructive/30 text-destructive' 
        : 'bg-primary/10 border-primary/30 text-primary'
    }`}>
      <Clock className={`w-6 h-6 ${isUrgent ? 'animate-pulse' : ''}`} />
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide">
          {timeLeft === 0 ? 'Offer Expired' : 'Offer Expires In'}
        </p>
        <p className="text-3xl font-bold tabular-nums">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}
