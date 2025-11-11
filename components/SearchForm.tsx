import Form from "next/form";
import SearchFormReset from "../components/SearchFormReset";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { SearchParamsType } from "./HomeContent";

export type SearchFormPropsType =
  | {
      query: Promise<{ query?: string }>;
    }
  | { query?: string };

const SearchForm = async ({ searchParams }: SearchParamsType) => {
  // you want to await searchParams and then extract query
  const { query } = await searchParams;
  // const q = query;
  return (
    <Form action={"/"} scroll={false} className="search-form">
      <input
        className="search-input"
        name="query"
        defaultValue=""
        placeholder="Search Startups"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <Button className="search-btn text-white" type="submit">
          <Search className="size-5" />
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;

import { Skeleton } from "@/components/ui/skeleton";

export function SearchFormSkeleton() {
  return (
    <div className="bg-gray-300 search-form flex items-center gap-2">
      {/* Input skeleton */}
      <Skeleton className="bg-gray-300  h-10 flex-1 rounded-md" />

      {/* Buttons container */}
      <div className="flex gap-2">
        <Skeleton className="bg-gray-300  h-10 w-10 rounded-md" />{" "}
        {/* Reset button */}
        <Skeleton className=" bg-gray-300 h-10 w-10 rounded-md" />{" "}
        {/* Search button */}
      </div>
    </div>
  );
}
