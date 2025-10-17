import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUPS_VIEWS_BY_ID } from "@/sanity/lib/queries";
import { formatViews } from "@/lib/utils";

const Views = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const sanityClient = client.withConfig({ useCdn: false });
  const post = await sanityClient.fetch(STARTUPS_VIEWS_BY_ID, { id });

  // TODO: update views whenever the post is viewed.
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
