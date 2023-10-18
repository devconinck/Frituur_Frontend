"use client";

import Link from "next/link";
import Container from "./ui/container";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "src/components/ui/sheet";
import { Menu, Moon, ShoppingCart, Sun } from "lucide-react";
import { ProfileButton } from "./ui/profile-button";
import ModeToggle from "./ModeToggle";
//import ProfileButton from "./ui/ProfileButton";

const Header = () => {
  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ];

  return (
    <header className="border-b px-4 py-3 sm:flex sm:justify-between">
      <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
      <Container>
        <div className="relative flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 w-6 md:hidden" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <Link
                      key={i}
                      href={route.href}
                      className="block px-2 py-1 text-lg"
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">Frituur d'Aa</h1>
            </Link>
          </div>
          <nav className="mx-6 flex hidden items-center space-x-4 md:block lg:space-x-6">
            {routes.map((route, i) => (
              <Button key={i} asChild variant="ghost">
                <Link
                  key={i}
                  href={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="mr-2 flex items-center">
            <Link href={"/order"}>
              <Button className="mr-4">Order</Button>
            </Link>
            <ModeToggle />
            <ProfileButton />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
