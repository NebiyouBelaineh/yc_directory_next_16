import { sanityFetch } from '@/sanity/lib/live';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import React from 'react'

const Page = async ({ params }: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  const startUpData = await sanityFetch({
    query: STARTUP_BY_ID_QUERY,
    params: { id }
  });
  const startup = startUpData.data;
  return (
    <>
      <h1 className='text-3xl'>Title: {startup?.title}</h1>
      <h1 className='text-3xl'>Author: {startup?.author?.name}</h1>
      <h1 className='text-3xl'>Author: {startup?.pitch}</h1>
    </>
  )
}

export default Page