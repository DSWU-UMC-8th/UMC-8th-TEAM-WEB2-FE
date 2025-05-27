import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

interface SearchResponse<T> {
  result: {
    lectures?: T[];
    platforms?: T[];
  };
}

interface UseSearchProps<T> {
  searchFn: (query: string) => Promise<SearchResponse<T>>;
  debounceTime?: number;
  onSelect?: (item: T) => void;
}

export const useSearch = <T>({ searchFn, debounceTime = 500, onSelect }: UseSearchProps<T>) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: searchResults, refetch: searchQuery } = useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query) return { result: { lectures: [], platforms: [] } };
      try {
        const data = await searchFn(query);
        return {
          result: {
            lectures: Array.isArray(data.result.lectures) ? data.result.lectures : [],
            platforms: Array.isArray(data.result.platforms) ? data.result.platforms : []
          }
        };
      } catch {
        return { result: { lectures: [], platforms: [] } };
      }
    },
    enabled: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (value.length > 0) {
      timeoutRef.current = setTimeout(() => {
        searchQuery();
        setIsOpen(true);
      }, debounceTime);
    } else {
      setIsOpen(false);
    }
  };

  const handleSearchClick = () => {
    if (query.length > 0) {
      searchQuery();
      setIsOpen(true);
    }
  };

  const handleSelect = (item: T) => {
    if (onSelect) onSelect(item);
    setIsOpen(false);
  };

  return {
    query,
    setQuery,
    isOpen,
    setIsOpen,
    searchResults: searchResults?.result.lectures || searchResults?.result.platforms || [],
    handleInputChange,
    handleSearchClick,
    handleSelect,
  };
}; 