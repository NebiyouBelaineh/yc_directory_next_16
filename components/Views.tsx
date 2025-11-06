import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUPS_VIEWS_BY_ID } from "@/sanity/lib/queries";
import { formatViews } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";

const Views = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const sanityClient = client.withConfig({ useCdn: false });
  const post = await sanityClient.fetch(STARTUPS_VIEWS_BY_ID, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({
          views: post && post.views ? post?.views + 1 : 1,
        })
        .commit()
  );

  return (
    <>
      <div className="view-container">
        <div className="absolute -top-2 -right-2">
          <Ping />
        </div>
        <p className="view-text">
          <span className="font-black"></span>
          {formatViews(post?.views)}
        </p>
      </div>
    </>
  );
};

export default Views;
