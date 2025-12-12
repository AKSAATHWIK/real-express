'use client';

import { motion } from 'framer-motion';
import { usePropertyStore } from '@/store/propertyStore';
import { SlidersHorizontal, X } from 'lucide-react';

export default function PropertyFilters() {
  const { filters, setFilters, resetFilters } = usePropertyStore();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={24} className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetFilters}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <X size={16} />
          Reset
        </motion.button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ minPrice: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ maxPrice: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3, 4].map((num: number) => (
              <motion.button
                key={num}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilters({ bedrooms: num })}
                className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  filters.bedrooms === num
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {num === 0 ? 'Any' : num === 4 ? '4+' : num}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Bathrooms</label>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((num: number) => (
              <motion.button
                key={num}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilters({ bathrooms: num })}
                className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  filters.bathrooms === num
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {num === 0 ? 'Any' : num === 3 ? '3+' : num}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type</label>
          <select
            value={filters.propertyType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ propertyType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters({ status: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="for-sale">For Sale</option>
            <option value="for-rent">For Rent</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>
    </div>
  );
}