import { revalidateTag } from "next/cache";

export function revalidateCollection(tag: string) {
  try {
    revalidateTag(tag);
  } catch {
    // silently fail outside Next.js context
  }
}
