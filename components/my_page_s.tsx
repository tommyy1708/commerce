import { Suspense } from 'react';
import { getCollections, getProducts } from 'lib/shopify';
import ClientProductsPage from './my_page_c';

// Loading component
const ProductsLoading = () => (
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-6"></div>

    <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0 mb-8">
      <div className="w-full md:w-64">
        <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-2"></div>
        <div className="h-10 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
      </div>
      <div className="w-full md:w-64">
        <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-2"></div>
        <div className="h-10 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square w-full bg-neutral-200 dark:bg-neutral-800 rounded"></div>
          <div className="mt-4 h-4 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
          <div className="mt-2 h-4 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

// This interface helps TypeScript understand our searchParams
interface ProductsPageProps {
  searchParams?: {
    collection?: string;
    sort?: string;
  };
}





  return (
    <Suspense fallback={<ProductsLoading />}>
      <ClientProductsPage
        initialProducts={products}
        initialCollections={collections}
        initialCollection={collection}
        initialSortKey={sortKey}
        initialReverse={reverse}
      />
    </Suspense>
  );
}
