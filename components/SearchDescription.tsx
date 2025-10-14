import { SearchFormPropsType } from './SearchForm';

const SearchDescription = async ({ query }: SearchFormPropsType) => {
  const q = query;
  return (
    <div>
      <p className="text-30-semibold">
        {q ? `Search results for "${q}"` : 'All Startups'}
      </p>
    </div>
  )
}

export default SearchDescription