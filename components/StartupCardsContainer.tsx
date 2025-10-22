import React from 'react'
import StartUpCard, { StartupTypeCard } from './StartUpCard'
import { SearchParamsType } from './HomeContent'
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';

const StartupCardsContainer = async ({ searchParams }: SearchParamsType) => {
  // "use cache"

  const query = (await searchParams).query;
  const params = { search: query || null };

  const posts = await sanityFetch({
    query: STARTUPS_QUERY,
    params
  });
  return (
    <>
      <ul className="mt-7 card_grid">
        {posts.data.length > 0 ? posts.data.map((p) => (
          <StartUpCard key={p._id} post={p as StartupTypeCard} />
        )) : (
          <p className="no-results">No startups found.</p>
        )}
      </ul>
      <SanityLive />
    </>
  )
}

export default StartupCardsContainer