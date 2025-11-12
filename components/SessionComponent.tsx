import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { IoCreate, IoLogOut } from "react-icons/io5";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const SessionComponent = async () => {
  const session = await auth();
  // console.log(`session: ${JSON.stringify(session, null, 2)}`);
  return (
    <>
      <div className="flex items-center gap-2 text-black">
        {session && session.user ? (
          // If user is signed in
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/startup/create"}
                  className="hover:bg-secondary border-1 rounded-lg border-black-100 p-3"
                >
                  <IoCreate />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <span className="hover:cursor-pointer bg-black text-white rounded p-1">
                  Create Pitch
                </span>
              </TooltipContent>
            </Tooltip>

            {/* SignOut form action */}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="submit"
                    className="hover: cursor-pointer hover:bg-secondary border-1 rounded-lg border-black-100 p-3"
                  >
                    <IoLogOut />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="hover:cursor-pointer bg-black text-white rounded p-1">
                    Logout
                  </span>
                </TooltipContent>
              </Tooltip>
            </form>
            <Link href={`/user/${session?.id}`}>
              <Avatar className="avatar">
                <AvatarImage src={session?.user?.image || undefined} />
                <AvatarFallback>
                  {session.user.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          </>
        ) : (
          // If user is NOT signed in
          <>
            {/* SignIn form action */}
            <form
              className=""
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="submit"
                    className="hover: cursor-pointer hover:bg-secondary border-1 rounded-lg border-black-100 p-3"
                  >
                    <FaGithub />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="hover:cursor-pointer bg-black text-white rounded p-1">
                    Login with Github
                  </span>
                </TooltipContent>
              </Tooltip>
            </form>
            <form
              className=""
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="submit"
                    className="hover: cursor-pointer hover:bg-secondary border-1 rounded-lg border-black-100 p-3"
                  >
                    <FaGoogle />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="hover:cursor-pointer bg-black text-white rounded p-1">
                    Login with Google
                  </span>
                </TooltipContent>
              </Tooltip>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default SessionComponent;
