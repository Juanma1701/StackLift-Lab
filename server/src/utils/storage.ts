import path from "path";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "uploads";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
  auth: { persistSession: false },
});

const EXT: Record<string, string> = {
  "image/png": ".png",
  "image/webp": ".webp",
  "image/jpeg": ".jpg",
};

export async function saveUpload(file: Express.Multer.File): Promise<string> {
  const filename = `${crypto.randomUUID()}${EXT[file.mimetype] ?? ".jpg"}`;
  const { error } = await supabase.storage.from(BUCKET).upload(filename, file.buffer, {
    contentType: file.mimetype,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw new Error(`Storage: ${error.message}`);
  return filename;
}

export async function deleteUpload(storedUrl: string): Promise<void> {
  try {
    const name = path.basename(storedUrl);
    if (!/^[\w.-]+$/.test(name)) return;
    await supabase.storage.from(BUCKET).remove([name]);
  } catch {
  }
}