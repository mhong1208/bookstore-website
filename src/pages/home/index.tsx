
import React from 'react';
import HeroBanner from './components/HeroBanner';
import BestSellers from './components/BestSellers';
import FeaturedCategories from './components/FeaturedCategories';
import NewReleases from './components/NewReleases';
import CustomerReviews from './components/CustomerReviews';
import useProducts from './hooks/useListProduct';
import BlogSection from './components/Blogs';

const HomePage: React.FC = () => {
  const { products } = useProducts(1, 10);
  return (
    <div>
      <HeroBanner />
      <FeaturedCategories />
      <BestSellers data={products} />
      <NewReleases />
      <CustomerReviews />
      <BlogSection />
    </div>
  );
};

export default HomePage;
