import React from 'react'
import Form from 'next/form'
import SearchFormReset from '../components/SearchFormReset';
import { Search } from "lucide-react"
import { Button } from './ui/button';
import { SearchParamsType } from './HomeContent';

export type SearchFormPropsType = {
  query: Promise<{ query?: string }>
} | { query?: string }

const SearchForm = async ({ searchParams }: SearchParamsType) => {
  // you want to await searchParams and then extract query
  const { query } = await searchParams;
  // const q = query;
  return (
    <Form action={"/"} scroll={false} className='search-form'>
      <input
        className="search-input"
        name="query" defaultValue=""
        placeholder='Search Startups'
      />
      <div className='flex gap-2'>
        {query && (
          <SearchFormReset />
        )}
        <Button className="search-btn text-white" type='submit'>
          <Search className='size-5' />
        </Button>
      </div>
    </Form>

  )
}

export default SearchForm