import PostDescriptionSkeleton from "@/components/PostDescriptionSkeleton";
import { PostDetailsSkeleton } from "@/components/PostDetailsSkeleton";
import StartupDetails from "@/components/StartupDetails";
import { Suspense } from "react";

// export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <Suspense
        fallback={
          <div>
            <PostDescriptionSkeleton />
            <PostDetailsSkeleton />
          </div>
        }
      >
        <StartupDetails params={params} />
      </Suspense>
    </>
  );
};

export default Page;
