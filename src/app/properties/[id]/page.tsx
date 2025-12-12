'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bed, Bath, Square, MapPin, Calendar, Heart, Phone, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import SynoppyBadge from '@/components/SynoppyBadge';
import { usePropertyStore } from '@/store/propertyStore';
import { initialProperties } from '@/data/properties';
import type { Property } from '@/types/property';

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = params?.id as string;
  const { properties, favorites, toggleFavorite, setProperties } = usePropertyStore();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (properties.length === 0) {
      setProperties(initialProperties);
    }
  }, [properties.length, setProperties]);

  const property = properties.find((p: Property) => p.id === propertyId);
  const isFavorite = property ? favorites.includes(property.id) : false;

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Link href="/properties" className="text-blue-600 hover:text-blue-700 cursor-pointer">
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/properties">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 cursor-pointer"
          >
            <ArrowLeft size={20} />
            Back to Properties
          </motion.button>
        </Link>

        {/* Image Gallery */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-96 lg:h-[600px]">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleFavorite(property.id)}
                className="p-3 bg-white rounded-full shadow-lg cursor-pointer"
              >
                <Heart
                  size={24}
                  className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}
                />
              </motion.button>
            </div>
          </div>
          {property.images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {property.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 cursor-pointer ${
                    currentImageIndex === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{property.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600 text-lg">
                    <MapPin size={20} />
                    <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{formatPrice(property.price)}</div>
                  <div className="px-4 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold">
                    {property.status === 'for-sale' ? 'For Sale' : property.status === 'for-rent' ? 'For Rent' : 'Sold'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-200">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Bed size={20} />
                    <span className="text-sm">Bedrooms</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Bath size={20} />
                    <span className="text-sm">Bathrooms</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Square size={20} />
                    <span className="text-sm">Square Feet</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.sqft.toLocaleString()}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Calendar size={20} />
                    <span className="text-sm">Year Built</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.yearBuilt}</div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Agent */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Agent</h3>
                <div className="mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {property.agentName.charAt(0)}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{property.agentName}</div>
                  <div className="text-sm text-gray-600">Licensed Real Estate Agent</div>
                </div>
                <div className="space-y-3 mb-6">
                  <a href={`tel:${property.agentPhone}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                    <Phone size={18} />
                    <span>{property.agentPhone}</span>
                  </a>
                  <a href={`mailto:${property.agentEmail}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                    <Mail size={18} />
                    <span>{property.agentEmail}</span>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Schedule a Viewing</h3>
                <ContactForm propertyId={property.id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <SynoppyBadge />
    </div>
  );
}