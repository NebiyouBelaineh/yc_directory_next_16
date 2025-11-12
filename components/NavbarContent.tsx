import Image from "next/image";
import Link from "next/link";
import SessionComponent from "./SessionComponent";
import { Suspense } from "react";

const NavbarContent = () => {
  return (
    <>
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <Suspense>
          <SessionComponent />
        </Suspense>
      </nav>
    </>
  );
};

export default NavbarContent;
