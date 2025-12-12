export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: 'house' | 'apartment' | 'condo' | 'townhouse';
  status: 'for-sale' | 'for-rent' | 'sold';
  images: string[];
  features: string[];
  yearBuilt: number;
  featured: boolean;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  createdAt: string;
}

export interface PropertyFilters {
  search: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  status: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
}