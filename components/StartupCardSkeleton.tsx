import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const StartupGridSkeleton = () => {
  return (
    <li className="startup-card space-y-4">
      <div className="flex-between">
        <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-8 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>

      <Skeleton className="h-16 w-full bg-gray-200 dark:bg-gray-700" />
      <Skeleton className="h-48 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />

      <div className="flex-between mt-5 gap-3">
        <Skeleton className="h-5 w-20 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-10 w-24 rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>
    </li>
  );
};

export default StartupGridSkeleton;
