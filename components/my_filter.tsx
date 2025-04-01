'use client';

import { useState } from 'react';
import { Collection } from 'lib/shopify/types';

const sortOptions = [
  { name: 'Best Selling', key: 'BEST_SELLING' },
  { name: 'Price: Low to high', key: 'PRICE' },
  { name: 'Price: High to low', key: 'PRICE', reverse: true },
  { name: 'Newest', key: 'CREATED_AT', reverse: true },
];

interface ProductFiltersProps {
  collections: Collection[]; // Added collections prop
  onCollectionChange: (collection: string) => void;
  onSortChange: (sortKey: string, reverse?: boolean) => void;
  initialCollection?: string;
  initialSortKey?: string;
}

const ProductFilters = ({
  collections, // Using collections from props
  onCollectionChange,
  onSortChange,
  initialCollection = '',
  initialSortKey = 'BEST_SELLING',
}: ProductFiltersProps) => {
  const [selectedCollection, setSelectedCollection] =
    useState(initialCollection);
  const [selectedSort, setSelectedSort] = useState({
    key: initialSortKey,
    reverse: false,
  });

  const handleCollectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const collection = e.target.value;
    setSelectedCollection(collection);
    onCollectionChange(collection);
  };

  const handleSortChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const sortValue = e.target.value;
    const option = sortOptions.find(
      (opt) =>
        opt.key === sortValue.split('-')[0] &&
        (opt.reverse
          ? sortValue.includes('-reverse')
          : !sortValue.includes('-reverse'))
    );

    if (option) {
      setSelectedSort({
        key: option.key,
        reverse: !!option.reverse,
      });
      onSortChange(option.key, option.reverse);
    }
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
      <div className="w-full md:w-64">
        <label
          htmlFor="collection-filter"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
        >
          Collection
        </label>
        <select
          id="collection-filter"
          value={selectedCollection}
          onChange={handleCollectionChange}
          className="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
        >
          <option value="">All Products</option>
          {collections.map((collection) => (
            <option key={collection.handle} value={collection.handle}>
              {collection.title}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-64">
        <label
          htmlFor="sort-filter"
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
        >
          Sort by
        </label>
        <select
          id="sort-filter"
          value={`${selectedSort.key}${selectedSort.reverse ? '-reverse' : ''}`}
          onChange={handleSortChange}
          className="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
        >
          {sortOptions.map((option) => (
            <option
              key={option.key + (option.reverse ? '-reverse' : '')}
              value={option.key + (option.reverse ? '-reverse' : '')}
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;
