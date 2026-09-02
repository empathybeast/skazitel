import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="desk flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center text-page">
      <span className="text-page-dark" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={1.5} />
      </span>
      <h1 className="font-display text-2xl font-semibold text-page">Страница порвана</h1>
      <p className="max-w-md font-body text-sm break-words text-page-dark">
        {error.message || "Не удалось открыть запись. Попробуйте перезагрузить страницу."}
      </p>
    </main>
  );
}
