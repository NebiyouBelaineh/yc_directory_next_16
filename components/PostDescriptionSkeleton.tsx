import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const PostDescriptionSkeleton = () => {
  return (
    <section className="pink_container !min-h-[230px] flex flex-col items-center justify-center text-center space-y-6">
      {/* Tag placeholder */}
      <div className="relative">
        <Skeleton className="h-8 w-32 rounded-sm bg-white/40" />
      </div>

      {/* Heading placeholder */}
      <div className="w-full flex justify-center">
        <Skeleton className="h-12 w-[80%] sm:w-[60%] bg-white/60 rounded-md" />
      </div>

      {/* Sub-heading placeholder */}
      <div className="w-full flex justify-center">
        <Skeleton className="h-6 w-[70%] sm:w-[50%] bg-white/40 rounded-md" />
      </div>
      <div className="w-full flex justify-center">
        <Skeleton className="h-6 w-[60%] sm:w-[40%] bg-white/30 rounded-md" />
      </div>
    </section>
  )
}

export default PostDescriptionSkeleton
