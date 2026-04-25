import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 cursor-pointer group"
    >
      <Image
        src="/logo.svg"
        alt="MonoShop logo"
        width={32}
        height={32}
        priority
        className="transition-transform group-hover:scale-105"
      />
      <span className="text-xl font-extrabold tracking-tight">MonoShop.</span>
    </Link>
  );
}
