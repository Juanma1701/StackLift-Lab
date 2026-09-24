import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { subscribeToasts, dismissToast, type Toast } from "@/lib/toast";

const STYLES: Record<Toast["type"], string> = {
  error: "border-destructive bg-destructive/10 text-destructive",
  success: "border-primary bg-primary/10 text-primary",
  info: "border-border bg-card text-foreground",
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => subscribeToasts(setToasts), []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start justify-between gap-2 rounded-md border px-3 py-2 text-sm shadow-lg ${STYLES[t.type]}`}
        >
          <span>{t.message}</span>
          <button onClick={() => dismissToast(t.id)} className="flex-shrink-0 opacity-70 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}