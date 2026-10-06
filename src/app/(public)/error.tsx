"use client";

import { AppError } from "@/features/site/client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <AppError error={error} reset={reset} />;
}
