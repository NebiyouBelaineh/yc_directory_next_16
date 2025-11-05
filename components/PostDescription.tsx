import { formatDate } from "@/lib/utils";
import { STARTUP_BY_ID_QUERYResult } from "@/sanity/types";
import { notFound } from "next/navigation";

const PostDescription = async ({
  startup,
}: {
  startup: STARTUP_BY_ID_QUERYResult;
}) => {
  if (!startup) return notFound();
  return (
    <>
      <p className="tag">{formatDate(startup._createdAt)}</p>
      <h1 className="heading">{startup?.title}</h1>
      <p className="sub-heading !max-w-5xl">{startup.description}</p>
    </>
  );
};

export default PostDescription;
