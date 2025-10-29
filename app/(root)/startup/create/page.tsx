import { FormDetailsSkeleton } from "@/components/FormDetailsSkeleton";
import StartupForm from "@/components/StartupForm";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <section className="pink_container !min-h-80">
        <h1 className="heading">Submit your startup</h1>
      </section>
      <Suspense fallback={<FormDetailsSkeleton/>}>
        <StartupForm />
      </Suspense>
    </>
  );
};

export default page;
