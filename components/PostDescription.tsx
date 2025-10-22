import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export const getPost = async (params: Promise<{ id: string }>) => {
  const { id } = await params;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  return post;
};

const PostDescription = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const post = await getPost(params);
  if (!post) return notFound();
  return (
    <>
      <p className="tag">{formatDate(post._createdAt)}</p>
      <h1 className="heading">{post?.title}</h1>
      <p className="sub-heading !max-w-5xl">{post.description}</p>
    </>
  );
};

export default PostDescription;
