import React, { useState, useMemo } from 'react';
import { MdChevronLeft, MdChevronRight, MdSearch, MdSwapVert, MdCalendarToday } from 'react-icons/md';
import TableFilters from './TableFilters';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
  sortable?: boolean;
  isDate?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
  emptyMessage?: string;
  getRowId?: (item: T) => number;
  itemsPerPage?: number;
  enableSearch?: boolean;
  enableSort?: boolean;
  enableDateFilter?: boolean;
  dateColumns?: (keyof T)[];
}

type SortConfig<T> = {
  key: keyof T;
  direction: 'asc' | 'desc';
}[];

function Table<T extends { id: number }>({
  columns,
  data,
  onEdit,
  onDelete,
  emptyMessage = 'No data found.',
  getRowId = (item) => item.id,
  itemsPerPage = 10,
  enableSearch = true,
  enableSort = true,
  enableDateFilter = false,
  dateColumns = [],
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>([]);
  const [dateFilters, setDateFilters] = useState<Record<string, { start: string; end: string }>>({});

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = [...data];

    // Search filter
    if (enableSearch && searchTerm) {
      filtered = filtered.filter((item) => {
        return columns.some((column) => {
          if (typeof column.accessor === 'function') return false;
          const value = item[column.accessor];
          return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }

    // Date range filters for multiple columns
    if (enableDateFilter && Object.keys(dateFilters).length > 0) {
      filtered = filtered.filter((item) => {
        return Object.entries(dateFilters).every(([field, range]) => {
          if (!range.start && !range.end) return true;
          
          const itemDate = new Date(item[field as keyof T] as any);
          const start = range.start ? new Date(range.start) : null;
          const end = range.end ? new Date(range.end) : null;

          if (start && end) {
            return itemDate >= start && itemDate <= end;
          } else if (start) {
            return itemDate >= start;
          } else if (end) {
            return itemDate <= end;
          }
          return true;
        });
      });
    }

    // Multi-column sorting
    if (enableSort && sortConfig.length > 0) {
      filtered.sort((a, b) => {
        for (const sort of sortConfig) {
          const aValue = a[sort.key];
          const bValue = b[sort.key];

          if (aValue === bValue) continue;
          
          const comparison = aValue < bValue ? -1 : 1;
          return sort.direction === 'asc' ? comparison : -comparison;
        }
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig, dateFilters, enableSearch, enableSort, enableDateFilter, columns]);
  
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  const handleSort = (key: keyof T, addToSort: boolean = false) => {
    if (!enableSort) return;
    
    if (!addToSort) {
      // Single column sort (replace existing)
      const existing = sortConfig.find(s => s.key === key);
      if (existing) {
        setSortConfig([{ key, direction: existing.direction === 'asc' ? 'desc' : 'asc' }]);
      } else {
        setSortConfig([{ key, direction: 'asc' }]);
      }
    } else {
      // Multi-column sort (add/toggle)
      const existingIndex = sortConfig.findIndex(s => s.key === key);
      if (existingIndex >= 0) {
        const newConfig = [...sortConfig];
        const existingSort = newConfig[existingIndex];
        if (existingSort && existingSort.direction === 'asc') {
          existingSort.direction = 'desc';
        } else {
          newConfig.splice(existingIndex, 1);
        }
        setSortConfig(newConfig);
      } else {
        setSortConfig([...sortConfig, { key, direction: 'asc' }]);
      }
    }
  };

  const handleDateFilterChange = (field: string, type: 'start' | 'end', value: string) => {
    setDateFilters(prev => ({
      ...prev,
      [field]: {
        start: type === 'start' ? value : (prev[field]?.start || ''),
        end: type === 'end' ? value : (prev[field]?.end || ''),
      }
    }));
    setCurrentPage(1);
  };

  const handleDelete = (item: T) => {
    if (onDelete && window.confirm('Are you sure you want to delete this item?')) {
      onDelete(getRowId(item));
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateFilters({});
    setSortConfig([]);
  };

  const getSortIndicator = (key: keyof T) => {
    const sortIndex = sortConfig.findIndex(s => s.key === key);
    if (sortIndex === -1) return null;
    
    const sort = sortConfig[sortIndex];
    if (!sort) return null;
    
    return (
      <span className="inline-flex items-center gap-1 text-indigo-600">
        {sort.direction === 'asc' ? '↑' : '↓'}
        {sortConfig.length > 1 && <span className="text-xs">{sortIndex + 1}</span>}
      </span>
    );
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <>
      {/* Search and Filter Controls using TableFilters component */}
      <TableFilters
        enableSearch={enableSearch}
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
        enableDateFilter={enableDateFilter}
        dateColumns={dateColumns}
        dateFilters={dateFilters}
        onDateFilterChange={handleDateFilterChange}
        onClearDateFilter={(field) => {
          setDateFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[field];
            return newFilters;
          });
          setCurrentPage(1);
        }}
        columns={columns}
      />

      {/* Active Filters & Clear Button */}
      {(searchTerm || Object.keys(dateFilters).length > 0 || sortConfig.length > 0) && (
        <div className="px-3 sm:p-4 md:px-6 pb-0">
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-gray-200">
            <span className="text-xs font-medium text-gray-600">Active:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-md font-medium">
                <MdSearch className="text-xs" />
                "{searchTerm}"
              </span>
            )}
            {sortConfig.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md font-medium">
                <MdSwapVert className="text-xs" />
                {sortConfig.length} sort{sortConfig.length > 1 ? 's' : ''}
              </span>
            )}
            {Object.keys(dateFilters).length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md font-medium">
                <MdCalendarToday className="text-xs" />
                {Object.keys(dateFilters).length} date filter{Object.keys(dateFilters).length > 1 ? 's' : ''}
              </span>
            )}
            <button
              onClick={clearFilters}
              className="ml-auto px-3 py-1 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto p-3 sm:p-4 md:p-6">
        {enableSort && (
          <div className="mb-4 px-3 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 rounded">
            <p className="text-sm text-gray-800 leading-relaxed">
              <strong className="text-indigo-700">💡 Multi-Sort:</strong> Click any column to sort. 
              <span className="inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded font-mono text-xs font-semibold">
                Shift + Click
              </span> 
              additional columns to sort by multiple fields at once.
            </p>
          </div>
        )}
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  onClick={(e) => {
                    if (typeof column.accessor !== 'function' && enableSort) {
                      handleSort(column.accessor, e.shiftKey);
                    }
                  }}
                  className={`px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide ${
                    typeof column.accessor !== 'function' && enableSort ? 'cursor-pointer hover:bg-gray-100 select-none transition-colors' : ''
                  }`}
                  title={enableSort && typeof column.accessor !== 'function' ? 'Click to sort, Shift+Click for multi-sort' : ''}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {typeof column.accessor !== 'function' && enableSort && getSortIndicator(column.accessor)}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider w-1 whitespace-nowrap">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentData.map((item) => (
              <tr
                key={getRowId(item)}
                className="hover:bg-indigo-600 hover:text-white transition-colors group"
              >
                {columns.map((column, colIndex) => {
                  const value = typeof column.accessor === 'function'
                    ? column.accessor(item)
                    : item[column.accessor];
                  
                  return (
                    <td
                      key={colIndex}
                      className={`px-2 sm:px-3 py-2 text-sm ${
                        column.className || 'text-gray-900 group-hover:text-white'
                      }`}
                    >
                      {value as React.ReactNode}
                    </td>
                  );
                })}
                {(onEdit || onDelete) && (
                  <td className="px-2 sm:px-3 py-2 text-right text-sm w-1 whitespace-nowrap">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="text-white bg-indigo-600 hover:bg-indigo-500 font-semibold mr-1.5 px-2 py-1 rounded text-sm tracking-wide"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-white font-semibold bg-red-600 group-hover:bg-red-700 hover:bg-red-700 px-2 py-1 rounded text-sm tracking-wide"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedData.length === 0 && (
        <div className="text-center py-12 text-gray-500 font-medium">
          {searchTerm || Object.keys(dateFilters).length > 0 ? 'No results found. Try adjusting your filters.' : emptyMessage}
        </div>
      )}

      {/* Pagination */}
      {filteredAndSortedData.length > 0 && totalPages > 1 && (
        <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 border-t border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-sm sm:text-base text-gray-600 font-medium text-center sm:text-left">
              Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
              <span className="font-semibold text-gray-900">{Math.min(endIndex, filteredAndSortedData.length)}</span> of{' '}
              <span className="font-semibold text-gray-900">{filteredAndSortedData.length}</span> results
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all"
                aria-label="Previous page"
              >
                <MdChevronLeft className="w-5 h-5" />
              </button>
              
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="hidden sm:inline-flex items-center justify-center w-10 h-10 text-gray-500 font-medium text-base">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page as number)}
                    className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-md border font-semibold transition-all text-sm ${
                      currentPage === page
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm hover:bg-indigo-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )
              ))}
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all"
                aria-label="Next page"
              >
                <MdChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Table;
export type { Column };
