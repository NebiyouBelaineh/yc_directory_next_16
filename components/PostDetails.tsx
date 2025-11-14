/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import {
  STARTUP_BY_ID_QUERYResult,
  STARTUPS_VIEWS_BY_IDResult,
} from "@/sanity/types";
import { Edit, Eye } from "lucide-react";
import { after } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";
import { Tooltip, TooltipContent } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { auth } from "@/auth";
const PostDetails = async ({
  startup,
  views,
}: {
  startup: STARTUP_BY_ID_QUERYResult;
  views: STARTUPS_VIEWS_BY_IDResult;
}) => {
  if (!startup) return notFound();

  if (views) {
    after(
      async () =>
        await writeClient
          .patch(views?._id)
          .set({
            views: views && views.views ? views?.views + 1 : 1,
          })
          .commit()
    );
  }
  const session = await auth();
  const md = markdownit();
  const parsedContent = md.render(startup.pitch || "");
  return (
    <>
      <img
        src={startup.image || ""}
        alt="thumbnail"
        className="w-full h-auto rounded-xl"
      />
      <div className="space-y-5 mt-10 max-w-4xl mx-auto">
        <div className="flex-between gap-5">
          <Link
            href={`/user/${startup.author?._id}/`}
            className="flex gap-2 items-center mb-3"
          >
            <Image
              src={`${startup?.author?.image || "https://placehold.co/600x600"}`}
              alt="avatar"
              height={64}
              width={64}
              className="rounded-full drop-shadow-lg"
            />
            <div className="flex flex-col leading-tight">
              <p className="text-20-medium">{startup.author?.name}</p>
              <p className="text-16-medium !text-black-300">
                @
                {startup.author?.username ||
                  startup.author?.name?.replace(" ", "")}
              </p>
            </div>
          </Link>
          <div className="grid grid-cols-1 items-center gap-2 p-2">
            <div className="flex items-center justify-center gap-2 bg-primary-100 rounded-full">
              <Eye />
              <p className="">
                <span className="font-black"></span>
                {`${views?.views || 0}`}
              </p>
            </div>
            <p className="category-tag">{startup.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-30-bold">Pitch Details</h3>
          {session && session.id === startup.author?._id && (
            <Tooltip>
              <TooltipTrigger>
                <Link href={`/startup/edit/${startup._id}`}>
                  <Edit className="text-green-700 hover:size-7" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-black border border-gray-700 font-bold p-2 bg-white-100 text-sm flex items-center rounded-2xl">
                  Edit your pitch
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        {parsedContent ? (
          <article
            className="prose max-w-4xl font-work-sans break-all"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        ) : (
          <p className="no-result">No pitch details provided.</p>
        )}
      </div>
    </>
  );
};

export default PostDetails;
