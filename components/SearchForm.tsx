import React from 'react'
import Form from 'next/form'
import SearchFormReset from '../components/SearchFormReset';
import { Search } from "lucide-react"
import { Button } from './ui/button';

export type SearchFormPropsType = {
  query: Promise<{ query?: string }>
} | { query?: string}

const SearchForm = async ({ query }: SearchFormPropsType) => {

  const q  = await query;
  return (
    <Form action={"/"} scroll={false} className='search-form'>
      <input
        className="search-input"
        name="query" defaultValue=""
        placeholder='Search Startups'
      />
      <div className='flex gap-2'>
        {q && (
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