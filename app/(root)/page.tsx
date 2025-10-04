import StartUpCard from "@/components/StartUpCard";
import SearchForm from "../../components/SearchForm";

export interface StartUpCardProps {
  _createAt: Date;
  views: number;
  author: { _id: number, name: string };
  _id: number;
  description: string;
  image: string;
  category: string;
  title: string;
  avatar?: string;
}
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const posts: StartUpCardProps[] = [{
    _createAt: new Date(),
    views: 55,
    author: { _id: 1, name: 'Nebiyou' },
    _id: 1,
    description: "This is a description",
    image: "https://m-cdn.phonearena.com/images/hub/508-wide-two_1200/iPhone-17-release-date-price-and-features.jpg",
    category: "Robots",
    title: "We Robots",
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRNo_FCHCV8wiQIF3ZCsKwfe5WocmUvjo5OQ&s'
  },
  {
    _createAt: new Date(),
    views: 55,
    author: { _id: 1, name: 'Nebiyou' },
    _id: 2,
    description: "This is a description",
    image: "https://m-cdn.phonearena.com/images/hub/508-wide-two_1200/iPhone-17-release-date-price-and-features.jpg",
    category: "Robots",
    title: "We Robots",
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRNo_FCHCV8wiQIF3ZCsKwfe5WocmUvjo5OQ&s'
  }]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br /> Connect with Entrepreneur</h1>
        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? posts.map((p) => (
            <StartUpCard key={p._id} post={p} />
          )) : (
            <p className="no-results">No startups found.</p>
          )}
        </ul>
      </section>
    </>
  );
}
