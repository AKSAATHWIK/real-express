'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Home, DollarSign, Shield, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import SynoppyBadge from '@/components/SynoppyBadge';
import { usePropertyStore } from '@/store/propertyStore';
import { initialProperties } from '@/data/properties';

export default function HomePage() {
  const { properties, setProperties } = usePropertyStore();

  useEffect(() => {
    if (properties.length === 0) {
      setProperties(initialProperties);
    }
  }, [properties.length, setProperties]);

  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">🏠</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Dream Home
            </h1>
            <p className="text-xl sm:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto">
              Discover the perfect property that matches your lifestyle. Browse thousands of listings with our intuitive search.
            </p>

            <div className="mb-12">
              <SearchBar />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">{properties.length}+</div>
                <div className="text-blue-100">Properties Listed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">$2.5M+</div>
                <div className="text-blue-100">Properties Sold</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Customer Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-xl text-gray-600">Handpicked homes that stand out</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/properties">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              View All Properties
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">We make home buying simple and enjoyable</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Home,
                title: 'Wide Selection',
                description: 'Browse thousands of properties across multiple cities and neighborhoods'
              },
              {
                icon: DollarSign,
                title: 'Best Prices',
                description: 'Competitive pricing and transparent fees with no hidden costs'
              },
              {
                icon: Shield,
                title: 'Secure Process',
                description: 'Protected transactions and verified listings for your peace of mind'
              },
              {
                icon: TrendingUp,
                title: 'Market Insights',
                description: 'Real-time market data and trends to help you make informed decisions'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Home?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get started today and discover properties that match your dreams
            </p>
            <Link href="/properties">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer"
              >
                Browse Properties
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <SynoppyBadge />
    </div>
  );
}