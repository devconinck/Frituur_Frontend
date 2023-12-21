import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { AuthContextValue, useAuth } from "~/contexts/auth.contexts";
import { useCallback } from "react";
import { useRouter } from "next/router";

export function ProfileButton() {
  const { user, logout } = useAuth() as AuthContextValue;
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    logout();

    router.push("/");
  }, [logout, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="04.png" />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-lg font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/account/orders">
            <DropdownMenuItem>My Orders</DropdownMenuItem>
          </Link>
          <Link href="/account/customer-card">
            <DropdownMenuItem>My Customer Card</DropdownMenuItem>
          </Link>
          <Link href="/account">
            <DropdownMenuItem>My Account</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
