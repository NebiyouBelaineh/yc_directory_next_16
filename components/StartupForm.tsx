import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FormDetails from "./FormDetails";


const StartupForm = async () => {
  const session = await auth();
  return (
    <>
      <div>{session ?  <FormDetails session={session}/>: redirect("/")}</div>
    </>
  );
};

export default StartupForm;
