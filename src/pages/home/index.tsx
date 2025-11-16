
import React from 'react';
import HeroBanner from './components/HeroBanner';
import BestSellers from './components/BestSellers';
import FeaturedCategories from './components/FeaturedCategories';
import NewReleases from './components/NewReleases';
import CustomerReviews from './components/CustomerReviews';
import useProducts from './hooks/useListProduct';
import BlogSection from './components/Blogs';

const HomePage: React.FC = () => {
  // Fetch best-selling products
  const { products: bestSellers, loading: loadingBestSellers } = useProducts({ 
    _sort: 'sold', 
    _order: 'desc',
    _limit: 8 
  });

  // Fetch newly released products
  const { products: newReleases, loading: loadingNewReleases } = useProducts({ 
    _sort: 'createdAt', 
    _order: 'desc',
    _limit: 6
  });

  return (
    <div>
      <HeroBanner />
      <FeaturedCategories />
      <BestSellers data={bestSellers} loading={loadingBestSellers} />
      <NewReleases data={newReleases} loading={loadingNewReleases} />
      <CustomerReviews />
      <BlogSection />
    </div>
  );
};

export default HomePage;
