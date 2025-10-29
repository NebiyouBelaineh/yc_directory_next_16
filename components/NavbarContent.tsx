import Image from "next/image";
import Link from "next/link";
import SessionComponent from "./SessionComponent";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

const NavbarContent = () => {
  return (
    <>
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <Suspense
          fallback={
            <div className="flex space-x-2">
              <Skeleton className="w-[145px] h-[34px] bg-gray-300" />
              <Skeleton className="w-[145px] h-[34px] bg-gray-300" />
            </div>
          }
        >
          <SessionComponent />
        </Suspense>
      </nav>
    </>
  );
};

export default NavbarContent;
