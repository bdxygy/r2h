import { Menu } from "lucide-react";
import { lazy } from "react";

const Button = lazy(() =>
  import("$client/components/ui/button").then((m) => ({ default: m.Button })),
);
const Sheet = lazy(() =>
  import("$client/components/ui/sheet").then((m) => ({ default: m.Sheet })),
);
const SheetTrigger = lazy(() =>
  import("$client/components/ui/sheet").then((m) => ({
    default: m.SheetTrigger,
  })),
);
const SheetContent = lazy(() =>
  import("$client/components/ui/sheet").then((m) => ({
    default: m.SheetContent,
  })),
);
const Link = lazy(() =>
  import("react-router").then((m) => ({ default: m.NavLink })),
);
// const Menu = lazy(() => import("lucide-react").then(m => ({ default: m.Menu })))

export default function Header() {
  return (
    <header className="w-full border-b shadow-sm">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          MySite
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <Link to="/about" className="hover:text-primary">
            About
          </Link>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-10">
                <Link to="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link to="/about" className="text-lg font-medium">
                  About
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
