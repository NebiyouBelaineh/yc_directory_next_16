import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FormDetails from "./FormDetails";
import { STARTUP_BY_ID_QUERYResult } from "@/sanity/types";

const StartupForm = async ({
  startup,
}: {
  startup?: STARTUP_BY_ID_QUERYResult;
}) => {
  const session = await auth();
  return (
    <>
      <div>{session ? <FormDetails session={session} startup={startup}/> : redirect("/")}</div>
    </>
  );
};

export default StartupForm;
