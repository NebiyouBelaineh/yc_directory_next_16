/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "./PostDescription";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
const PostDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const post = await getPosts(params);
  if (!post) return notFound();

  const md = markdownit();
  const parsedContent = md.render(post.pitch || "");
  return (
    <>
      <img
        src={post.image || ""}
        alt="thumbnail"
        className="w-full h-auto rounded-xl"
      />
      <div className="space-y-5 mt-10 max-w-4xl mx-auto">
        <div className="flex-between gap-5">
          <Link
            href={`/user/${post.author?._id}/`}
            className="flex gap-2 items-center mb-3"
          >
            <Image
              src={`${post.author?.image}`}
              alt="avatar"
              height={64}
              width={64}
              className="rounded-full drop-shadow-lg"
            />
            <div className="flex flex-col leading-tight">
              <p className="text-20-medium">{post.author?.name}</p>
              <p className="text-16-medium !text-black-300">
                @{post.author?.username}
              </p>
            </div>
          </Link>
          <p className="category-tag">{post.category}</p>
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
