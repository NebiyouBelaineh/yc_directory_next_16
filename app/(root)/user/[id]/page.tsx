import UserProfile from "@/components/UserProfile";
import { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <Suspense>
        <UserProfile params={params} />
      </Suspense>
    </>
  );
};

export default page;
