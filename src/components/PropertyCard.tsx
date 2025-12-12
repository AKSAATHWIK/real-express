'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import type { Property } from '@/types/property';
import { usePropertyStore } from '@/store/propertyStore';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { favorites, toggleFavorite } = usePropertyStore();
  const isFavorite = favorites.includes(property.id);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all"
    >
      <Link href={`/properties/${property.id}`} className="cursor-pointer">
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-lg">
            {property.status === 'for-sale' ? 'For Sale' : property.status === 'for-rent' ? 'For Rent' : 'Sold'}
          </div>
          {property.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-lg">
              Featured
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Link href={`/properties/${property.id}`} className="cursor-pointer flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              {property.title}
            </h3>
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(property.id)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Heart
              size={24}
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            />
          </motion.button>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin size={18} />
          <span className="text-sm">{property.city}, {property.state}</span>
        </div>

        <div className="text-3xl font-bold text-blue-600 mb-4">
          {formatPrice(property.price)}
        </div>

        <div className="flex items-center gap-6 text-gray-700">
          <div className="flex items-center gap-2">
            <Bed size={20} className="text-gray-500" />
            <span className="font-medium">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={20} className="text-gray-500" />
            <span className="font-medium">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Square size={20} className="text-gray-500" />
            <span className="font-medium">{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        <Link href={`/properties/${property.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}