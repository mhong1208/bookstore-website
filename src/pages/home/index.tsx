
import React from 'react';
import HeroBanner from './components/HeroBanner';
import BestSellers from './components/BestSellers';
import FeaturedCategories from './components/FeaturedCategories';
import SpecialOffers from './components/SpecialOffers';
import NewReleases from './components/NewReleases';
import CustomerReviews from './components/CustomerReviews';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      <BestSellers />
      <FeaturedCategories />
      <SpecialOffers />
      <NewReleases />
      <CustomerReviews />
    </div>
  );
};

export default HomePage;
