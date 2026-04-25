import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "default" | "danger" | "primary";

const variants: Record<Variant, string> = {
  default: "bg-gray-50 text-black hover:bg-gray-100",
  danger: "bg-gray-50 text-black hover:bg-red-50 hover:text-red-500",
  primary: "bg-accent text-black shadow-sm hover:brightness-95",
};

const baseClasses =
  "inline-flex items-center gap-2 h-11 px-4 rounded-full text-sm font-semibold transition-all hover:scale-[1.03] cursor-pointer";

interface NavItemProps {
  icon: ReactNode;
  children: ReactNode;
  variant?: Variant;
}

export function NavItemLink({
  href,
  icon,
  variant = "default",
  children,
}: NavItemProps & { href: ComponentProps<typeof Link>["href"] }) {
  return (
    <Link href={href} className={`${baseClasses} ${variants[variant]}`}>
      {icon}
      <span>{children}</span>
    </Link>
  );
}

export function NavItemShell({
  icon,
  variant = "default",
  children,
}: NavItemProps) {
  return (
    <div className={`${baseClasses} ${variants[variant]}`}>
      {icon}
      <span>{children}</span>
    </div>
  );
}
