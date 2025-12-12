'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import SynoppyBadge from '@/components/SynoppyBadge';
import { usePropertyStore } from '@/store/propertyStore';
import { initialProperties } from '@/data/properties';
import type { Property } from '@/types/property';

export default function FavoritesPage() {
  const { properties, favorites, setProperties } = usePropertyStore();

  useEffect(() => {
    if (properties.length === 0) {
      setProperties(initialProperties);
    }
  }, [properties.length, setProperties]);

  const favoriteProperties = properties.filter((p: Property) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Saved Properties</h1>
          <p className="text-xl text-gray-600">
            {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} saved
          </p>
        </motion.div>

        {favoriteProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-16 text-center shadow-lg"
          >
            <div className="text-6xl mb-6">❤️</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Saved Properties</h2>
            <p className="text-xl text-gray-600 mb-8">
              Start exploring and save your favorite properties to view them here
            </p>
            <a href="/properties" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-colors cursor-pointer">
              Browse Properties
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteProperties.map((property: Property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      <Footer />
      <SynoppyBadge />
    </div>
  );
}