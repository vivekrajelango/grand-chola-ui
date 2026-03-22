import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({handleSearch}:any) => {
  return (
    <>
      <div className="top-0 left-0 right-0 bg-white p-3 space-y-3 border-b border-gray-200 z-10">
        <div className="relative flex flex-row">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search menu"
            onChange={(e)=>handleSearch(e.target.value)}
            style={{
              WebkitAppearance: 'searchfield', // Ensure Safari treats it as a search field
              appearance: 'searchfield',
              fontSize: '16px', // Avoid zoom issues
              paddingRight: '2.5rem', // Space for the clear button
            }}
            className="w-full !text-md pl-8 pr-8 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

    </>
  );
};

export default SearchBar;
