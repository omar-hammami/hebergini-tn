import React, { useState } from 'react';
import { ChevronDown, ArrowUpDown } from 'lucide-react';
import { SortOption } from '../../types/property';

interface SortingOptionsProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortingOptions: React.FC<SortingOptionsProps> = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'relevance', label: 'Pertinence' },
    { value: 'price-low', label: 'Prix croissant' },
    { value: 'price-high', label: 'Prix décroissant' },
    { value: 'rating', label: 'Mieux notés' },
    { value: 'reviews', label: 'Plus d\'avis' },
    { value: 'newest', label: 'Plus récents' }
  ];

  const currentSort = sortOptions.find(option => option.value === sortBy);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white"
      >
        <ArrowUpDown size={16} className="text-gray-500" />
        <span className="text-sm text-gray-700">{currentSort?.label}</span>
        <ChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[180px]">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  sortBy === option.value ? 'bg-teal-50 text-teal-700' : 'text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SortingOptions;