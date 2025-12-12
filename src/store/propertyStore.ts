import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Property, PropertyFilters } from '@/types/property';

interface PropertyStore {
  properties: Property[];
  favorites: string[];
  filters: PropertyFilters;
  setProperties: (properties: Property[]) => void;
  addProperty: (property: Property) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  resetFilters: () => void;
}

const initialFilters: PropertyFilters = {
  search: '',
  minPrice: 0,
  maxPrice: 10000000,
  bedrooms: 0,
  bathrooms: 0,
  propertyType: 'all',
  status: 'all'
};

export const usePropertyStore = create<PropertyStore>()(persist(
  (set) => ({
    properties: [],
    favorites: [],
    filters: initialFilters,

    setProperties: (properties: Property[]) => set({ properties }),

    addProperty: (property: Property) => set((state: PropertyStore) => ({
      properties: [...state.properties, property]
    })),

    updateProperty: (id: string, updates: Partial<Property>) => set((state: PropertyStore) => ({
      properties: state.properties.map((p: Property) => 
        p.id === id ? { ...p, ...updates } : p
      )
    })),

    deleteProperty: (id: string) => set((state: PropertyStore) => ({
      properties: state.properties.filter((p: Property) => p.id !== id)
    })),

    toggleFavorite: (id: string) => set((state: PropertyStore) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((fid: string) => fid !== id)
        : [...state.favorites, id]
    })),

    setFilters: (filters: Partial<PropertyFilters>) => set((state: PropertyStore) => ({
      filters: { ...state.filters, ...filters }
    })),

    resetFilters: () => set({ filters: initialFilters })
  }),
  { name: 'property-storage' }
));
