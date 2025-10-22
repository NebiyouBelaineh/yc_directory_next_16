
import { auth, signIn, signOut } from '@/auth'
import Link from 'next/link';

const SessionComponent = async () => {
  const session = await auth()
  return (
    <>
      <div className="flex items-center gap-5 text-black">
        {session && session.user ? (
          // If user is signed in
          <>
            <Link href={"/startup/create"}>Create</Link>

            {/* SignOut form action */}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit">
                <span>Logout</span>
              </button>
            </form>
            <Link href={`/user/${session?.user.id}`}>
              <span>{session?.user?.name}</span>
            </Link>
          </>
        ) : (
          // If user is NOT signed in
          <>
            {/* SignIn form action */}
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">
                <span>Login with Github</span>
              </button>
            </form>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button type="submit">
                <span>Login with Google</span>
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default SessionComponent;
