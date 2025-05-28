import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

// 리뷰 등록 페이지의 검색
interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T[];
}

interface UseSearchProps<T> {
  searchFn: (query: string) => Promise<ApiResponse<T>>;
  debounceTime?: number;
  onSelect?: (item: T) => void;
  type: 'lecture' | 'platform';
}

export const useSearch = <T>({ searchFn, debounceTime = 500, onSelect, type }: UseSearchProps<T>) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: searchResults, refetch: searchQuery } = useQuery({
    queryKey: ['search', query, type],
    queryFn: async () => {
      if (!query) return { isSuccess: true, code: '', message: '', result: [] };
      try {
        const data = await searchFn(query);
        return data;
      } catch (error) {
        console.error(`[${type}] Search error:`, error);
        return { isSuccess: false, code: '', message: '', result: [] };
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
    console.log(`[${type}] Selected item:`, item);
    if (onSelect) onSelect(item);
    setIsOpen(false);
  };

  return {
    query,
    setQuery,
    isOpen,
    setIsOpen,
    searchResults: searchResults?.result || [],
    handleInputChange,
    handleSearchClick,
    handleSelect,
  };
}; 