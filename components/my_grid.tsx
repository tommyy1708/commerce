'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from 'lib/shopify/types';

// Loading skeleton component
const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="relative aspect-square w-full bg-neutral-200 dark:bg-neutral-800"></div>
    <div className="mt-4 h-4 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800"></div>
    <div className="mt-2 h-4 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800"></div>
  </div>
);

// Product card component
const ProductCard = ({ product }: { product: Product }) => {
  const { handle, title, images, priceRange } = product;
  const image = images[0];

  // Format the price - using the first variant's price
  const price = priceRange.minVariantPrice.amount;
  const currency = priceRange.minVariantPrice.currencyCode;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(parseFloat(price));

  return (
    <Link
      href={`/product/${handle}`}
      className="group flex flex-col h-full overflow-hidden rounded-lg border border-neutral-200 hover:border-neutral-400 transition-colors dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <div className="relative aspect-square h-full w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        {image && (
          <Image
            src={image.url}
            alt={image.altText || title}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            fill
          />
        )}
      </div>
      <div className="flex flex-col p-4">
        <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
        <p className="mt-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {formattedPrice}
        </p>
      </div>
    </Link>
  );
};

interface ProductGridProps {
  products: Product[];
  gridColumns?: 2 | 3 | 4;
  isLoading?: boolean;
}

const ProductGrid = ({
  products,
  gridColumns = 3,
  isLoading = false,
}: ProductGridProps) => {
  // Define grid columns class based on prop
  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[gridColumns];

  // Show loading skeletons while fetching
  if (isLoading) {
    return (
      <div className={`grid ${gridClass} gap-6`}>
        {Array.from({ length: 6 }, (_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  // If no products found
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          No products found
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Try changing your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
