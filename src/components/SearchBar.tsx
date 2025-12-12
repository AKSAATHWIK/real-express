'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { usePropertyStore } from '@/store/propertyStore';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const setFilters = usePropertyStore((state) => state.setFilters);
  const router = useRouter();

  const handleSearch = () => {
    setFilters({ search: searchQuery });
    router.push('/properties');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search by city, address, or property type..."
          className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 text-lg"
        />
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-8 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Search
        </motion.button>
      </div>
    </div>
  );
}