import { isAuthenticated } from "@monocloud/auth-nextjs";
import { SignIn, SignOut } from "@monocloud/auth-nextjs/components";
import { FileText, LogOut, ShoppingBag, UserCircle2 } from "lucide-react";
import { Brand } from "./brand";
import { NavItemLink, NavItemShell } from "./nav-item";

const iconClass = "w-4 h-4";

export async function Navbar() {
  const authenticated = await isAuthenticated();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 md:px-10 py-5 flex items-center justify-between">
      <Brand />

      <nav>
        <ul className="flex items-center gap-2 font-medium text-sm">
          {authenticated ? (
            <>
              <li>
                <NavItemLink
                  href="/products"
                  icon={<ShoppingBag className={iconClass} />}
                >
                  Products
                </NavItemLink>
              </li>
              <li>
                <NavItemLink
                  href="/invoices"
                  icon={<FileText className={iconClass} />}
                >
                  Invoices
                </NavItemLink>
              </li>
              <li>
                <SignOut>
                  <NavItemShell
                    icon={<LogOut className={iconClass} />}
                    variant="danger"
                  >
                    Sign Out
                  </NavItemShell>
                </SignOut>
              </li>
            </>
          ) : (
            <li>
              <SignIn>
                <NavItemShell
                  icon={<UserCircle2 className={iconClass} />}
                  variant="primary"
                >
                  Sign In
                </NavItemShell>
              </SignIn>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
