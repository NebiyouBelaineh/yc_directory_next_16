import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_USER_ID, STARTUPS_BY_AUTHOR_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import StartUpCard, { StartupTypeCard } from "./StartUpCard";

const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const user = await client.fetch(AUTHOR_BY_USER_ID, {
    id,
  });
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_ID, { id });
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
            alt={(user?.name as string).replace(" ", "-")}
            className="profile_image"
          />
          <p className="text-30-extrabold mt-7 text-center">
            {"@" + (user?.username || user?.name)}
          </p>
          <p className=".mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">All Startups</p>
          <ul className="card_grid-sm">
            {startups.map((s: StartupTypeCard) => (
              <StartUpCard post={s} key={s._id} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
