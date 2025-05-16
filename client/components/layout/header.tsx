import { Sheet, SheetTrigger, SheetContent } from "$client/components/ui/sheet";
import { Button } from "$client/components/ui/button";
import { Menu } from "lucide-react";
import { NavLink as Link } from "react-router";

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
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <Link to="/about" className="hover:text-primary">About</Link>
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
                                <Link to="/" className="text-lg font-medium">Home</Link>
                                <Link to="/about" className="text-lg font-medium">About</Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
