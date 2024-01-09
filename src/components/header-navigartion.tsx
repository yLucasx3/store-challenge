"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { signOut, useSession } from "next-auth/react";

const HeaderNavigation = () => {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center p-4 border-b border-slate-600 fixed w-full bg-background">
      <Link href="/" legacyBehavior passHref>
        <h1 className="text-xl text-slate-300 cursor-pointer">
          Store Challenge
        </h1>
      </Link>

      {session && session.user && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  color="red"
                >
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}

      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={session?.user?.image || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {session && session.user && (
            <span className="text-sm text-slate-300 cursor-pointer">
              Hi, {session.user.name}
            </span>
          )}
        </div>

        {session && (
          <Button variant="destructive" onClick={() => signOut()}>
            Sign out
          </Button>
        )}
      </div>
    </header>
  );
};

export default HeaderNavigation;
