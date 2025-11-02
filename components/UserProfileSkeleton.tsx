import { Skeleton } from "@/components/ui/skeleton";
import StartupGridSkeleton from "./StartupCardSkeleton";
export function UserProfileSkeleton() {
  return (
    <section className="profile_container animate-pulse">
      {/* Profile card */}
      <div className="profile_card flex flex-col items-center">
        {/* Name */}
        <div className="profile_title mb-3">
          <Skeleton className="h-6 w-40 bg-gray-300 rounded-md mx-auto" />
        </div>

        {/* Profile image */}
        <Skeleton className="h-[220px] w-[220px] rounded-full bg-gray-300 mx-auto" />

        {/* Username */}
        <Skeleton className="h-7 w-52 bg-gray-300 rounded-md mt-7 mx-auto" />

        {/* Bio */}
        <Skeleton className="h-4 w-64 bg-gray-300 rounded-md mt-2 mx-auto" />
      </div>

      {/* Startups section */}
      <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
        {/* Section title */}
        <Skeleton className="h-8 w-48 bg-gray-300 rounded-md" />

        {/* Grid of startup cards */}
        {/* Skeleton grid mimicking your startup cards */}
        <ul className="card_grid-sm">
          {[...Array(6)].map((_, i) => (
            <StartupGridSkeleton key={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
