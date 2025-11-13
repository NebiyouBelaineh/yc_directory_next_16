import { FormDetailsSkeleton } from "@/components/FormDetailsSkeleton";
import StartupForm from "@/components/StartupForm";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Suspense } from "react";

const EditStartups = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const startup = await client.fetch(STARTUP_BY_ID_QUERY, {
    id,
  });
  return (
    <>
      <section className="orange_container !min-h-80">
        <h1 className="heading">Edit your startup pitch </h1>
      </section>
      <Suspense fallback={<FormDetailsSkeleton />}>
        <StartupForm startup={startup} />
      </Suspense>
    </>
  );
};

export default EditStartups;
