import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import StartupCardSkeleton from "./StartupCardSkeleton";

const StartupGridSkeleton = () => {
  return (
    <section className="py-10">
      {/* Optional heading placeholder */}
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-64 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-96 bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Skeleton grid mimicking your startup cards */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <StartupCardSkeleton key={i} />
        ))}
      </ul>
    </section>
  );
};

export default StartupGridSkeleton;
