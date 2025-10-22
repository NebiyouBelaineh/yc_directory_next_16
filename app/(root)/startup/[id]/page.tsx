import PostDescription from "@/components/PostDescription";
import PostDescriptionSkeleton from "@/components/PostDescriptionSkeleton";
import PostDetails from "@/components/PostDetails";
import { Skeleton } from "@/components/ui/skeleton";
import Views from "@/components/Views";
import { Suspense } from "react";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <Suspense fallback={<PostDescriptionSkeleton />}>
        <section className="pink_container !min-h-[230px]">
          <PostDescription params={params} />
        </section>
      </Suspense>
      <section className="section_container">
        <Suspense fallback="loading post....">
          <PostDetails params={params} />
        </Suspense>
        <hr className="divider" />
        {/* TODO: Editor's Pick startups show here */}
      </section>
      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <Views params={params} />
      </Suspense>
    </>
  );
};

export default Page;
