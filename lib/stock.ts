import type { ColorStock } from "./types";

export const totalQty = (colors?: ColorStock[]) => (colors ?? []).reduce((n, c) => n + (c.qty || 0), 0);

/** Reduz a imagem escolhida (máx. 1200 px, JPEG) para caber no armazenamento do navegador. */
export function fileToPhoto(file: File, max = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Ficheiro de imagem inválido."));
    };
    img.src = url;
  });
}
