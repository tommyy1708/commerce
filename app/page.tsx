import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import Grid from 'components/grid';

import { Suspense } from 'react';
import { getCollections, getProducts } from 'lib/shopify';
import ClientProductsPage from '../components/my_page_c';



export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};



// Loading component
const ProductsLoading = () => (
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    loading
  </div>
);



interface ProductsPageProps {
  searchParams?: {
    collection?: string;
    sort?: string;
  };
}


export async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const collection = searchParams?.collection || '';
  const sortParam = searchParams?.sort || 'BEST_SELLING';

  // Parse the sort parameter to handle reverse
  const [sortKey, sortDirection] = sortParam.split('-');
  const reverse = sortDirection === 'reverse';

  // Fetch collections
  const collections = await getCollections();

  // Fetch products based on filters
  const products = await getProducts({
    query: collection ? `collection:${collection}` : '',
    sortKey: sortKey as any,
    reverse,
  });

    return (
        <ClientProductsPage
          initialProducts={products}
          initialCollections={collections}
          initialCollection={collection}
          initialReverse={reverse}
        />
    );
  }


export default function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Grid />
      <Carousel />
       <Suspense fallback={<ProductsLoading />}>
          <ProductsPage/>
      </Suspense>
      <Footer />
    </>
  );
}
