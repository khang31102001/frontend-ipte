import Image from "next/image";
import Link from "next/link";

export function AppLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <Image src="/logo.png" alt="PTE iPASS" width={120} height={32} priority />
    </Link>
  );
}
