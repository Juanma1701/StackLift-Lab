import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { api } from "@/lib/api";

interface Template {
  id: string;
  imageUrl: string;
  license: string;
  licenseAuthor: string | null;
  sourceUrl: string;
}

interface Props {
  title: string;
  exerciseName: string;
  currentUrl: string | null;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
  onSelectTemplate: (templateId: string) => Promise<void>;
  onRemove?: () => Promise<void>;
}

export function ImageUploadModal({
  title,
  exerciseName,
  currentUrl,
  onClose,
  onUpload,
  onSelectTemplate,
  onRemove,
}: Props) {
  const [tab, setTab] = useState<"galeria" | "subir">("galeria");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  const [preview, setPreview] = useState<string | null>(currentUrl);
  const [file, setFile] = useState<File | null>(null);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .getExerciseImageTemplates(exerciseName)
      .then((data) => setTemplates(data))
      .catch(() => setTemplates([]))
      .finally(() => setLoadingTemplates(false));
  }, [exerciseName]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function handleSelectTemplate(templateId: string) {
    setSaving(true);
    try {
      await onSelectTemplate(templateId);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  async function handleUploadOwn() {
    if (!file || !aceptaTerminos) return;
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
        {preview && (
          <img
            src={preview}
            alt="Vista previa"
            className="w-full h-40 object-cover rounded-md border border-border"
          />
        )}

        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setTab("galeria")}
            className={`px-3 py-2 text-sm font-medium ${
              tab === "galeria" ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"
            }`}
          >
            Elegir de la galería
          </button>
          <button
            onClick={() => setTab("subir")}
            className={`px-3 py-2 text-sm font-medium ${
              tab === "subir" ? "border-b-2 border-primary text-foreground" : "text-muted-foreground"
            }`}
          >
            Subir mi propia imagen
          </button>
        </div>

        {tab === "galeria" && (
          <div>
            {loadingTemplates ? (
              <p className="text-sm text-muted-foreground">Buscando imágenes...</p>
            ) : templates.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No hay imágenes prediseñadas para este ejercicio todavía. Puedes subir la tuya en la otra pestaña.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTemplate(t.id)}
                    disabled={saving}
                    className="group relative rounded-md overflow-hidden border border-border hover:border-primary disabled:opacity-50"
                  >
                    <img src={t.imageUrl} alt="" className="w-full h-20 object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] px-1 py-0.5 truncate">
                      wger.de{t.licenseAuthor ? ` · ${t.licenseAuthor}` : ""}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Imágenes bajo licencia Creative Commons, cortesía de{" "}
              <a href="https://wger.de" target="_blank" rel="noopener noreferrer" className="underline">
                wger.de
              </a>
              .
            </p>
          </div>
        )}

        {tab === "subir" && (
          <div className="space-y-3">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="text-sm"
            />

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
                className="mt-0.5"
              />
              Confirmo que tengo los derechos sobre esta imagen o que es de uso libre, y acepto los{" "}
              <a href="/terminos" target="_blank" rel="noopener noreferrer" className="underline">
                Términos de Uso
              </a>
              .
            </label>

            <button
              onClick={handleUploadOwn}
              disabled={!file || !aceptaTerminos || saving}
              className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        )}

        {currentUrl && onRemove && (
          <button
            onClick={handleRemove}
            disabled={saving}
            className="w-full px-4 py-2 rounded-md text-sm border border-border text-destructive hover:bg-destructive/10"
          >
            Quitar imagen actual
          </button>
        )}
      </div>
    </Modal>
  );
}