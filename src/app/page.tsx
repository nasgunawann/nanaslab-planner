// app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // user belum login → render landing page
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">
        Selamat datang di Nanaslab Planner 🚀
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Atur kontenmu dengan mudah, cepat, dan terstruktur.
      </p>
      <div className="mt-6 flex gap-4">
        <a
          href="/login"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Login
        </a>
        <a
          href="/register"
          className="rounded border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
        >
          Daftar
        </a>
      </div>
    </main>
  );
}
