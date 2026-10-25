"use client";
import catalog from "@/data/responsive-images.json";

const images: Record<string, { folder: string; widths: number[] }> = catalog;
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const image = images[src];
  // New uncatalogued assets remain usable until their responsive variants are generated.
  if (!image) return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
  const size = image.widths.find(size => size >= width) ?? image.widths[image.widths.length - 1];
  return `${image.folder}/${size}.webp`;
}
