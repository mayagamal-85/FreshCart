"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h2 className="text-3xl font-bold text-slate-900">Something went wrong</h2>
      <p className="mt-3 text-slate-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
      >
        Try again
      </button>
    </div>
  );
}