import EditStartups from "@/components/EditStartups";
import { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <Suspense>
        <EditStartups params={params} />
      </Suspense>
    </>
  );
};

export default page;
