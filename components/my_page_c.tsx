'use client';

import { useState, useEffect } from 'react';
import {
  useRouter,
  usePathname,
  useSearchParams,
} from 'next/navigation';
import ProductGrid from 'components/my_grid';
import ProductFilters from 'components/my_filter';
import { Product, Collection } from 'lib/shopify/types';

interface ClientProductsPageProps {
  initialProducts: Product[];
  initialCollections: Collection[];
  initialCollection: string;
  initialSortKey: string;
  initialReverse: boolean;
}

export default function ClientProductsPage({
  initialProducts,
  initialCollections,
  initialCollection,
  initialSortKey,
  initialReverse,
}: ClientProductsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  // Update URL when filters change
  const updateUrl = (
    collection: string,
    sortKey: string,
    reverse: boolean
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (collection) {
      params.set('collection', collection);
    } else {
      params.delete('collection');
    }

    const sortParam = reverse ? `${sortKey}-reverse` : sortKey;
    params.set('sort', sortParam);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCollectionChange = (newCollection: string) => {
    setIsLoading(true);
    updateUrl(newCollection, initialSortKey, initialReverse);
  };

  const handleSortChange = (
    newSortKey: string,
    reverse?: boolean
  ) => {
    setIsLoading(true);
    updateUrl(initialCollection, newSortKey, !!reverse);
  };

  // When products change, end loading state
  useEffect(() => {
    setIsLoading(false);
  }, [initialProducts]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
        Shop Our Products
      </h2>

      <ProductFilters
        collections={initialCollections}
        onCollectionChange={handleCollectionChange}
        onSortChange={handleSortChange}
        initialCollection={initialCollection}
        initialSortKey={initialSortKey}
      />

      <ProductGrid
        products={initialProducts}
        gridColumns={3}
        isLoading={isLoading}
      />
    </div>
  );
}
