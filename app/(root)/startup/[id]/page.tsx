import EditorsPick from "@/components/EditorsPick";
import PostDescription from "@/components/PostDescription";
import PostDescriptionSkeleton from "@/components/PostDescriptionSkeleton";
import PostDetails from "@/components/PostDetails";
import { PostDetailsSkeleton } from "@/components/PostDetailsSkeleton";
import StartupDetails from "@/components/StartupDetails";
import { Skeleton } from "@/components/ui/skeleton";
import Views from "@/components/Views";
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
      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <Views params={params} />
      </Suspense>
    </>
  );
};

export default Page;
