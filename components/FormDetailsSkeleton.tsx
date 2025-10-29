import { Skeleton } from "@/components/ui/skeleton";

export function FormDetailsSkeleton() {
  return (
    <div className="startup-form space-y-8 animate-pulse">
      {/* Title */}
      <div>
        <Skeleton className="h-[22px] w-28 bg-gray-300 rounded-md" />{" "}
        {/* Label */}
        <Skeleton className="startup-form_input bg-gray-300 mt-3 rounded-full h-[60px] w-full" />{" "}
        {/* Input */}
      </div>

      {/* Description */}
      <div>
        <Skeleton className="h-[22px] w-40 bg-gray-300 rounded-md" />
        <Skeleton className="startup-form_textarea bg-gray-300 mt-3 rounded-[20px] h-[150px] w-full" />
      </div>

      {/* Category */}
      <div>
        <Skeleton className="h-[22px] w-32 bg-gray-300 rounded-md" />
        <Skeleton className="startup-form_input bg-gray-300 mt-3 rounded-full h-[60px] w-full" />
      </div>

      {/* Link */}
      <div>
        <Skeleton className="h-[22px] w-24 bg-gray-300 rounded-md" />
        <Skeleton className="startup-form_input bg-gray-300 mt-3 rounded-full h-[60px] w-full" />
      </div>

      {/* Pitch (Markdown Editor placeholder) */}
      <div>
        <Skeleton className="h-[22px] w-24 bg-gray-300 rounded-md" />
        <Skeleton className="startup-form_textarea bg-gray-300 mt-3 rounded-[20px] h-[300px] w-full" />
      </div>

      {/* Submit Button */}
      <div className="flex justify-start">
        <Skeleton className="bg-gray-300 h-[60px] w-[250px] rounded-full" />
      </div>
    </div>
  );
}
