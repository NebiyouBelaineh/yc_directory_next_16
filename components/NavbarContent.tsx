import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'

const NavbarContent = async () => {
  const session = await auth();
  return (
    <>
      <nav className='flex justify-between items-center'>
        <Link href="/">
          <Image src="/logo.png" alt='logo' width={144} height={30} />
        </Link>
        <div className='flex items-center gap-5 text-black'>
          {
            session && session.user ? (
              <>
                <Link href={"/startup/create"}>Create</Link>

                {/* SignOut form action */}
                <form action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}>
                  <button type='submit'><span>Logout</span></button>
                </form>
                <Link href={`/user/${session?.id}`}>
                  <span>{session?.user?.name}</span>
                </Link>
              </>
            ) :
              <>
                {/* SignIn form action */}
                <form action={async () => {
                  "use server";
                  await signIn('github');
                }}>
                  <button type='submit'><span>Login with Github</span></button>
                </form>
                <form action={async () => {
                  "use server";
                  await signIn('google');
                }}>
                  <button type='submit'><span>Login with Google</span></button>
                </form>
              </>
          }
        </div>
      </nav>
    </>
  )
}

export default NavbarContent