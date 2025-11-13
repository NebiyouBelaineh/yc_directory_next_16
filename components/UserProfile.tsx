import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_USER_ID, STARTUPS_BY_AUTHOR_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import StartUpCard, { StartupTypeCard } from "./StartUpCard";
import { auth } from "@/auth";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_USER_ID, {
    id,
  });
  const startups = await sanityFetch({
    query: STARTUPS_BY_AUTHOR_ID,
    params: { id },
  });
  // console.log(`startups: ${JSON.stringify(startups, null, 2)}`);
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user?.name}
            </h3>
          </div>
          <Image
            height={220}
            width={220}
            src={user?.image || "https://placehold.co/600x600"}
            alt="avatar"
            className="profile_image"
          />
          <p className="text-30-extrabold mt-7 text-center">
            {"@" + (user?.username || user?.name)}
          </p>
          <p className=".mt-1 text-center text-14-normal font-bold">{user?.bio}</p>
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {(session?.id === user?._id ? "Your" : "All") + " Startups"}
          </p>
          <ul className="card_grid-sm">
            {startups.data.map((s) => (
              <StartUpCard post={s as StartupTypeCard} key={s._id} />
            ))}
          </ul>
        </div>
        <SanityLive/>
      </section>
    </>
  );
};

export default UserProfile;
