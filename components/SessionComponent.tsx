import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { IoCreate, IoLogOut } from "react-icons/io5";

const SessionComponent = async () => {
  const session = await auth();
  // console.log(`session: ${JSON.stringify(session, null, 2)}`);
  return (
    <>
      <div className="flex items-center gap-2 text-black">
        {session && session.user ? (
          // If user is signed in
          <>
            <Link href={"/startup/create"}>
              <IoCreate />
            </Link>

            {/* SignOut form action */}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit">
                <IoLogOut />
              </button>
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
              <button
                type="submit"
                className="hover: cursor-pointer hover:bg-secondary border-1 rounded-lg border-black-100 p-3"
              >
                <FaGithub />
              </button>
            </form>
            <form
              className=""
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button
                type="submit"
                className="hover: cursor-pointer hover:bg-secondary border-1 rounded-lg border-black-100 p-3"
              >
                <FaGoogle />
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default SessionComponent;
