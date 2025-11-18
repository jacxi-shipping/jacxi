'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  X, 
  Calendar,
  DollarSign,
  User,
  Package,
  Truck,
  MapPin,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface SmartSearchProps {
  onSearch: (filters: SearchFilters) => void;
  placeholder?: string;
  showTypeFilter?: boolean;
  showStatusFilter?: boolean;
  showDateFilter?: boolean;
  showPriceFilter?: boolean;
  showUserFilter?: boolean;
  defaultType?: 'all' | 'shipments' | 'items' | 'users';
}

export interface SearchFilters {
  query: string;
  type: 'all' | 'shipments' | 'items' | 'users';
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  minPrice?: string;
  maxPrice?: string;
  userId?: string;
}

const SHIPMENT_STATUSES = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'IN_TRANSIT', label: 'In Transit' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'ON_HOLD', label: 'On Hold' },
  { value: 'PICKUP_COMPLETED', label: 'Pickup Completed' },
  { value: 'AT_PORT', label: 'At Port' },
  { value: 'CUSTOMS_CLEARANCE', label: 'Customs Clearance' },
  { value: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
];

const ITEM_STATUSES = [
  { value: 'ON_HAND', label: 'On Hand' },
  { value: 'READY_FOR_SHIPMENT', label: 'Ready for Shipment' },
];

export default function SmartSearch({
  onSearch,
  placeholder = 'Search shipments, tracking numbers, VIN...',
  showTypeFilter = true,
  showStatusFilter = true,
  showDateFilter = true,
  showPriceFilter = true,
  showUserFilter = false,
  defaultType = 'all',
}: SmartSearchProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: defaultType,
  });
  const [isSearching, setIsSearching] = useState(false);

  // Count active filters (derived state, no need for useEffect)
  const activeFiltersCount = (() => {
    let count = 0;
    if (filters.status) count++;
    if (filters.dateFrom || filters.dateTo) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.userId) count++;
    return count;
  })();

  const handleSearch = useCallback((newFilters: SearchFilters) => {
    setIsSearching(true);
    setFilters(newFilters);
    onSearch(newFilters);
    setTimeout(() => setIsSearching(false), 300);
  }, [onSearch]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== filters.query) {
        handleSearch({ ...filters, query });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, filters, handleSearch]);

  const updateFilter = (key: keyof SearchFilters, value: string | undefined) => {
    const newFilters = { ...filters, [key]: value || undefined };
    handleSearch(newFilters);
  };

  const clearFilters = () => {
    setQuery('');
    const clearedFilters: SearchFilters = {
      query: '',
      type: defaultType,
    };
    setFilters(clearedFilters);
    handleSearch(clearedFilters);
  };

  const hasActiveFilters = query || activeFiltersCount > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 pointer-events-none">
            {isSearching ? (
              <Loader2 className="h-5 w-5 text-cyan-400 animate-spin" />
            ) : (
              <Search className="h-5 w-5 text-white/40" />
            )}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-32 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 transition-all"
          />
          <div className="absolute right-2 flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'border-white/20 text-white hover:bg-white/10',
                showFilters && 'bg-cyan-500/20 border-cyan-500/40'
              )}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-cyan-500 text-white text-xs rounded-full">
                  {activeFiltersCount}
                </span>
              )}
              {showFilters ? (
                <ChevronUp className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-1" />
              )}
            </Button>
          </div>
        </div>

        {/* Quick Type Filter */}
        {showTypeFilter && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm text-white/60">Search in:</span>
            {[
              { value: 'all', label: 'All', icon: Search },
              { value: 'shipments', label: 'Shipments', icon: Truck },
              { value: 'items', label: 'Items', icon: Package },
              ...(showUserFilter ? [{ value: 'users', label: 'Users', icon: User }] : []),
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => updateFilter('type', value as 'all' | 'shipments' | 'items' | 'users')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
                  filters.type === value
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Filter className="h-5 w-5 text-cyan-400" />
                  Advanced Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Status Filter */}
                {showStatusFilter && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-cyan-400" />
                      Status
                    </label>
                    <select
                      value={filters.status || ''}
                      onChange={(e) => updateFilter('status', e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 transition-all"
                    >
                      <option value="">All Statuses</option>
                      {(filters.type === 'items' ? ITEM_STATUSES : SHIPMENT_STATUSES).map((statusOption) => (
                        <option key={statusOption.value} value={statusOption.value}>
                          {statusOption.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Date From */}
                {showDateFilter && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      Date From
                    </label>
                    <input
                      type="date"
                      value={filters.dateFrom || ''}
                      onChange={(e) => updateFilter('dateFrom', e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                )}

                {/* Date To */}
                {showDateFilter && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      Date To
                    </label>
                    <input
                      type="date"
                      value={filters.dateTo || ''}
                      onChange={(e) => updateFilter('dateTo', e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                )}

                {/* Min Price */}
                {showPriceFilter && filters.type !== 'users' && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-cyan-400" />
                      Min Price
                    </label>
                    <input
                      type="number"
                      value={filters.minPrice || ''}
                      onChange={(e) => updateFilter('minPrice', e.target.value)}
                      placeholder="0"
                      min="0"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                )}

                {/* Max Price */}
                {showPriceFilter && filters.type !== 'users' && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-cyan-400" />
                      Max Price
                    </label>
                    <input
                      type="number"
                      value={filters.maxPrice || ''}
                      onChange={(e) => updateFilter('maxPrice', e.target.value)}
                      placeholder="10000"
                      min="0"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Filter Summary */}
              {hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg"
                >
                  <div className="flex items-start gap-2">
                    <Filter className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-cyan-300">Active Filters:</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {query && (
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                            Query: &ldquo;{query}&rdquo;
                          </span>
                        )}
                        {filters.status && (
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                            Status: {filters.status}
                          </span>
                        )}
                        {(filters.dateFrom || filters.dateTo) && (
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                            Date Range
                          </span>
                        )}
                        {(filters.minPrice || filters.maxPrice) && (
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                            Price Range
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

