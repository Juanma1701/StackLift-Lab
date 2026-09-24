import { useState } from "react";
import { Modal } from "./Modal";

interface Props {
  title: string;
  currentUrl: string | null;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
  onRemove?: () => Promise<void>;
}

export function ImageUploadModal({ title, currentUrl, onClose, onUpload, onRemove }: Props) {
  const [preview, setPreview] = useState<string | null>(currentUrl);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleSave() {
    if (!file) return;
    setSaving(true);
    try {
      await onUpload(file);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    if (!onRemove) return;
    setSaving(true);
    try {
      await onRemove();
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal title={title} onClose={onClose}>
      <div className="space-y-4">
        {preview ? (
          <img src={preview} alt="Vista previa" className="w-full h-40 object-cover rounded-md border border-border" />
        ) : (
          <div className="w-full h-40 flex items-center justify-center rounded-md border border-dashed border-border text-muted-foreground text-sm">
            Sin imagen
          </div>
        )}

        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="text-sm" />

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={!file || saving}
            className="flex-1 bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
          {currentUrl && onRemove && (
            <button
              onClick={handleRemove}
              disabled={saving}
              className="px-4 py-2 rounded-md text-sm border border-border text-destructive hover:bg-destructive/10"
            >
              Quitar
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}