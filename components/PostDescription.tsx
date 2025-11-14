import { auth } from "@/auth";
import { formatDate } from "@/lib/utils";
import { STARTUP_BY_ID_QUERYResult } from "@/sanity/types";
import { Edit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { Button } from "./ui/button";

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
        <div className="flex items-center gap-3">
          <Link
            className="flex gap-2 items-center mt-5 px-4 py-2 h-9 rounded-lg hover:bg-green-700 hover:font-bold bg-black-100 text-white sm:p-2 sm:text-sm shadow-md hover:scale-105 hover:transition duration-300 ease-in-out transform"
            href={`/startup/edit/${startup?._id}`}
          >
            <Edit />
            Edit Pitch
          </Link>
          {/* Delete Pitch */}
          <Button className="flex gap-2 items-center mt-5 p-2 rounded-lg hover:bg-red-700 hover:font-bold bg-black-100 text-white sm:p-2 sm:text-sm shadow-md hover:scale-105 hover:transition duration-300 ease-in-out transform">
            <MdDelete className="size-6" />
            Delete Pitch
          </Button>
        </div>
      )}
    </>
  );
};

export default PostDescription;
