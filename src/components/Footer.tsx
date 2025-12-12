'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🏠</span>
              <span className="text-xl font-bold">RealEstate</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner in finding the perfect home. We make real estate simple, transparent, and enjoyable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/properties" className="hover:text-white transition-colors cursor-pointer">Browse Properties</Link></li>
              <li><Link href="/favorites" className="hover:text-white transition-colors cursor-pointer">Saved Homes</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors cursor-pointer">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors cursor-pointer">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@realestate.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>123 Main St, San Francisco, CA</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-400 transition-colors cursor-pointer">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-pink-600 transition-colors cursor-pointer">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} RealEstate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}