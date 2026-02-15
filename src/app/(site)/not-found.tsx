import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-6xl font-bold text-[#111111]">404</h1>
      <p className="text-[#666666]">Page not found.</p>
      <Link href="/" className="text-sm text-[#2563EB] hover:underline font-medium">
        ← Back home
      </Link>
    </div>
  );
}
