import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-semibold">Welcome</h1>
        <p className="text-lg">
          Go to{" "}
          <Link
            href="/survey"
            className="text-blue-600 underline hover:text-blue-800"
          >
            /survey
          </Link>
        </p>
      </div>
    </main>
  );
}
