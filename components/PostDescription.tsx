import { auth } from "@/auth";
import { formatDate } from "@/lib/utils";
import { STARTUP_BY_ID_QUERYResult } from "@/sanity/types";
import { Edit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const PostDescription = async ({
  startup,
}: {
  startup: STARTUP_BY_ID_QUERYResult;
}) => {
  if (!startup) return notFound();
  const session = await auth();
  return (
    <>
      <p className="tag">{formatDate(startup._createdAt)}</p>
      <h1 className="heading">{startup?.title}</h1>
      <p className="sub-heading !max-w-5xl">{startup.description}</p>
      {session && session?.id === startup.author?._id && (
        <Link
          className="flex gap-2 items-center mt-5 p-3 rounded-lg hover:bg-green-300 hover:text-black hover:font-bold bg-green-700 text-white"
          href={`/startup/edit/${startup?._id}`}
        >
          <Edit/>Edit your pitch
        </Link>
      )}
    </>
  );
};

export default PostDescription;
