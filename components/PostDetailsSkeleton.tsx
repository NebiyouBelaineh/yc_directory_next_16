// components/skeletons/PostDetailsSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"

export function PostDetailsSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-10">
      {/* Header image */}
      <Skeleton className="bg-gray-300 w-full h-[800px] rounded-xl" />

      {/* Author section */}
      <div className="space-y-5 mt-10">
        <div className="flex-between gap-5">
          <div className="flex gap-3 items-center mb-3">
            <Skeleton className="bg-gray-300 h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="bg-gray-300 h-5 w-40" /> {/* author name */}
              <Skeleton className="bg-gray-300 h-4 w-32" /> {/* username */}
            </div>
          </div>
          <Skeleton className="bg-gray-300 h-8 w-24 rounded-full" /> {/* category tag */}
        </div>

        <Skeleton className="bg-gray-300 h-8 w-52" /> {/* "Pitch Details" heading */}

        {/* Article body placeholder */}
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full bg-gray-300" />
          ))}
        </div>
      </div>
    </div>
  )
}
