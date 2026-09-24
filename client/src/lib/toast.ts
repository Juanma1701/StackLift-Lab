type ToastType = "error" | "success" | "info";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

type Listener = (toasts: Toast[]) => void;

let toasts: Toast[] = [];
let nextId = 0;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l(toasts));
}

export function showToast(message: string, type: ToastType = "info") {
  const id = nextId++;
  toasts = [...toasts, { id, message, type }];
  notify();

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  }, 5000);
}

export function dismissToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
}

export function subscribeToasts(listener: Listener): () => void {
  listeners.add(listener);
  listener(toasts);
  return () => {
    listeners.delete(listener);
  };
}