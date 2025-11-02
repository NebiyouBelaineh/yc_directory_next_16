import UserProfile from "@/components/UserProfile";
import { UserProfileSkeleton } from "@/components/UserProfileSkeleton";
import { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <Suspense fallback={<UserProfileSkeleton/>}>
        <UserProfile params={params} />
      </Suspense>
    </>
  );
};

export default page;
