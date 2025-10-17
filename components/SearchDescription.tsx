import { SearchParamsType } from './HomeContent';
import { SearchFormPropsType } from './SearchForm';

const SearchDescription = async ({ searchParams }: SearchParamsType) => {
  const { query } = await searchParams;
  return (
    <div>
      <p className="text-30-semibold">
        {query ? `Search results for "${query}"` : 'All Startups'}
      </p>
    </div>
  )
}

export default SearchDescription