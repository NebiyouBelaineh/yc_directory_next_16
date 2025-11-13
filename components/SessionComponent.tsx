import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaGithub, FaGoogle, FaUserAlt } from "react-icons/fa";
import { IoCreate, IoLogOut } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FeedBackButton from "./FeedBackButton";

const SessionComponent = async () => {
  const session = await auth();

  return (
    <div className="flex items-center gap-2 text-black">
      {session && session.user ? (
        <>
          {/* --- Desktop View (lg and up) --- */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Create pitch */}
            <Link href="/startup/create" className="navbar-menu_hover flex">
              <IoCreate /> Create Pitch
            </Link>
          </div>

          {/* --- Mobile/Tablet View (md and smaller) --- */}
          <div className="block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer avatar">
                  <AvatarImage src={session?.user?.image || undefined} />
                  <AvatarFallback>
                    {session.user.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dropdown-menu">
                {/* Profile */}
                <DropdownMenuItem asChild className="dropdown_border">
                  <Link href={`/user/${session?.id}`}>
                    <FaUserAlt /> Profile
                  </Link>
                </DropdownMenuItem>
                {/* Create pitch */}
                <DropdownMenuItem asChild className="dropdown_border lg:hidden">
                  <Link
                    href="/startup/create"
                    className="flex items-center gap-2"
                  >
                    <IoCreate className="text-lg" /> Create Pitch
                  </Link>
                </DropdownMenuItem>
                {/* Logout */}
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button
                    type="submit"
                    className="flex w-full items-center px-2 py-1.5 text-sm gap-2 dropdown_border rounded"
                  >
                    <IoLogOut className="text-lg" /> Logout
                  </button>
                </form>
                {/* <DropdownMenuItem >
                </DropdownMenuItem> */}

                <DropdownMenuItem asChild className="dropdown_border">
                  <FeedBackButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        // --- If NOT signed in ---
        <div className="flex gap-2">
          {/* Sign in Github */}
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button type="submit" className="navbar-menu_hover flex lg:hidden">
              <FaGithub />
            </button>
            <button type="submit" className="navbar-menu_hover hidden lg:flex">
              Login with <FaGithub />
            </button>
          </form>

          {/* Sign in Google */}
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            {/* for sm & md displays, hides "login with" text */}
            <button type="submit" className="navbar-menu_hover flex lg:hidden">
              <FaGoogle />
            </button>
            <button type="submit" className="navbar-menu_hover hidden lg:flex">
              Login with <FaGoogle />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SessionComponent;
