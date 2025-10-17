import HomeContent from "@/components/HomeContent";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  return (
    <>
      <HomeContent searchParams={searchParams} />
    </>
  )
}
