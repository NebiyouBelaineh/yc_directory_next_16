import SearchForm from "./SearchForm";
import SearchDescription from "@/components/SearchDescription";
import { Suspense } from "react";
import StartupCardsContainer from "./StartupCardsContainer";

export type SearchParamsType = { searchParams: Promise<{ query?: string }> }
const HomeContent = async ({ searchParams }: SearchParamsType) => {
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br /> Connect with Entrepreneur</h1>
        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>
        <Suspense fallback="loading search form ...">
          <SearchForm searchParams={searchParams} />
        </Suspense>
      </section>
      <section className="section_container">
        <Suspense fallback="Loading Search descriptions ....">
          <SearchDescription searchParams={searchParams} />
        </Suspense>
        <Suspense fallback="Loading Startup cards ....">
          <StartupCardsContainer searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}

export default HomeContent