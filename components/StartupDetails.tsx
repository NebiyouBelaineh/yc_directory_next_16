import PostDescription from "./PostDescription";
import PostDetails from "./PostDetails";
import EditorsPick from "./EditorsPick";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { StartupTypeCard } from "./StartUpCard";

export const getPost = async (params: Promise<{ id: string }>) => {
  const { id } = await params;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  return post;
};

const StartupDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const startup = await getPost(params);
  const result = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
    slug: "editor-picks",
  });
  const editorsPick = result?.select;

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <PostDescription startup={startup} />
      </section>
      <section className="section_container">
        <PostDetails startup={startup} />
        <hr className="divider" />
        {/* TODO: Editor's Pick startups show here */}
        <EditorsPick post={editorsPick as unknown as StartupTypeCard[]} />
      </section>
    </>
  );
};

export default StartupDetails;
