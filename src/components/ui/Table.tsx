import React, { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (id: number) => void;
  emptyMessage?: string;
  getRowId?: (item: T) => number;
  itemsPerPage?: number;
}

function Table<T extends { id: number }>({
  columns,
  data,
  onEdit,
  onDelete,
  emptyMessage = 'No data found.',
  getRowId = (item) => item.id,
  itemsPerPage = 10,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleDelete = (item: T) => {
    if (onDelete && window.confirm('Are you sure you want to delete this item?')) {
      onDelete(getRowId(item));
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
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
      <div className="overflow-x-auto p-3 sm:p-4 md:p-6">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
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
                      className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium ${
                        column.className || 'text-gray-900 group-hover:text-white'
                      }`}
                    >
                      {value as React.ReactNode}
                    </td>
                  );
                })}
                {(onEdit || onDelete) && (
                  <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="text-white bg-indigo-600 hover:bg-indigo-500 font-semibold mr-2 sm:mr-3 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm tracking-wide"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-white font-semibold bg-red-600 group-hover:bg-red-700 hover:bg-red-700 px-2 py-1 rounded text-xs sm:text-sm tracking-wide"
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

      {data.length === 0 && (
        <div className="text-center py-12 text-gray-500 font-medium">
          {emptyMessage}
        </div>
      )}

      {/* Pagination */}
      {data.length > 0 && totalPages > 1 && (
        <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 border-t border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm text-gray-600 font-normal text-center sm:text-left">
              Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
              <span className="font-semibold text-gray-900">{Math.min(endIndex, data.length)}</span> of{' '}
              <span className="font-semibold text-gray-900">{data.length}</span> results
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all"
                aria-label="Previous page"
              >
                <MdChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="hidden sm:inline-flex items-center justify-center w-10 h-10 text-gray-400">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page as number)}
                    className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-md border font-semibold transition-all text-xs sm:text-sm ${
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
                className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all"
                aria-label="Next page"
              >
                <MdChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
