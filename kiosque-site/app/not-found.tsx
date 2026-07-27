import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
      <p className="text-4xl">🗞️</p>
      <h1 className="mt-4 font-title text-xl font-semibold text-marine">
        Cette édition n&apos;est pas au kiosque
      </h1>
      <p className="mt-2 text-gray-600">
        Elle a peut-être été retirée lors de la dernière synchronisation.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-electrique px-4 py-2 text-sm font-medium text-white"
      >
        Retour au kiosque
      </Link>
    </div>
  );
}
