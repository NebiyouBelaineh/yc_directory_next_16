/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { STARTUP_BY_ID_QUERYResult } from "@/sanity/types";
const PostDetails = async ({ startup }: { startup: STARTUP_BY_ID_QUERYResult }) => {
  if (!startup) return notFound();

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
                @{startup.author?.username || startup.author?.name?.replace(" ", "")}
              </p>
            </div>
          </Link>
          <p className="category-tag">{startup.category}</p>
        </div>
        <h3 className="text-30-bold">Pitch Details</h3>
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
