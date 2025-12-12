'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import SynoppyBadge from '@/components/SynoppyBadge';
import { usePropertyStore } from '@/store/propertyStore';
import { initialProperties } from '@/data/properties';
import type { Property } from '@/types/property';

export default function PropertiesPage() {
  const { properties, filters, setProperties } = usePropertyStore();

  useEffect(() => {
    if (properties.length === 0) {
      setProperties(initialProperties);
    }
  }, [properties.length, setProperties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property: Property) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          property.title.toLowerCase().includes(searchLower) ||
          property.city.toLowerCase().includes(searchLower) ||
          property.address.toLowerCase().includes(searchLower) ||
          property.propertyType.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Price filter
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;

      // Bedrooms filter
      if (filters.bedrooms > 0 && property.bedrooms < filters.bedrooms) return false;

      // Bathrooms filter
      if (filters.bathrooms > 0 && property.bathrooms < filters.bathrooms) return false;

      // Property type filter
      if (filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) return false;

      // Status filter
      if (filters.status !== 'all' && property.status !== filters.status) return false;

      return true;
    });
  }, [properties, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Properties</h1>
          <p className="text-xl text-gray-600">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PropertyFilters />
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {filteredProperties.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-12 text-center shadow-lg"
              >
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property: Property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <SynoppyBadge />
    </div>
  );
}