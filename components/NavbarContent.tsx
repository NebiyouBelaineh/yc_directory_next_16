import Image from "next/image";
import Link from "next/link";
import SessionComponent from "./SessionComponent";
import { Suspense } from "react";
// import { Skeleton } from "./ui/skeleton";
import FeedBackButton from "./FeedBackButton";

const NavbarContent = () => {
  return (
    <>
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <FeedBackButton />
        <Suspense>
          <SessionComponent />
        </Suspense>
      </nav>
    </>
  );
};

export default NavbarContent;
