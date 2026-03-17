export async function revalidateCollection(tag: string) {
  try {
    const { revalidateTag } = await import("next/cache");
    revalidateTag(tag);
  } catch {
    // silently fail outside Next.js context
  }
}
