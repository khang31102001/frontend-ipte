import type { Metadata } from "next";
import { PolicyRoute, policyMetadata } from "@/features/site";

interface PageProps {
  params: Promise<{ key?: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { key } = await params;
  return policyMetadata(key?.[0]);
}

export default async function Page({ params }: PageProps) {
  const { key } = await params;
  return <PolicyRoute policyKey={key?.[0]} />;
}
