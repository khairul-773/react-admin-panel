import { MdSearch, MdCalendarToday, MdClose } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
  isDate?: boolean;
}

interface TableFiltersProps<T> {
  enableSearch?: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  enableDateFilter?: boolean;
  dateColumns: (keyof T)[];
  dateFilters: Record<string, { start: string; end: string }>;
  onDateFilterChange: (field: string, type: 'start' | 'end', value: string) => void;
  onClearDateFilter: (field: string) => void;
  columns: Column<T>[];
}

function TableFilters<T>({
  enableSearch = false,
  searchTerm,
  onSearchChange,
  enableDateFilter = false,
  dateColumns = [],
  dateFilters,
  onDateFilterChange,
  onClearDateFilter,
  columns,
}: TableFiltersProps<T>) {
  if (!enableSearch && !enableDateFilter) return null;

  return (
    <div className="p-3 sm:p-4 md:p-6 pb-0">
      {/* Search and Date Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch">
        {/* Search Bar */}
        {enableSearch && (
          <div className="relative flex-1">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search across all columns..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-[46px] pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm"
            />
          </div>
        )}
        
        {/* Date Range Filter */}
        {enableDateFilter && dateColumns.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
            {dateColumns.map((column) => {
              const columnDef = columns.find(c => c.accessor === column);
              const fieldKey = String(column);
              return (
                <div key={fieldKey} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 h-[46px]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 whitespace-nowrap">
                    <MdCalendarToday className="text-indigo-600" />
                    <span>{columnDef?.header || String(column)}:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DatePicker
                      selected={dateFilters[fieldKey]?.start ? new Date(dateFilters[fieldKey].start) : null}
                      onChange={(date) => onDateFilterChange(fieldKey, 'start', date ? date.toISOString().split('T')[0] : '')}
                      selectsStart
                      startDate={dateFilters[fieldKey]?.start ? new Date(dateFilters[fieldKey].start) : undefined}
                      endDate={dateFilters[fieldKey]?.end ? new Date(dateFilters[fieldKey].end) : undefined}
                      placeholderText="From"
                      dateFormat="dd/MM/yyyy"
                      className="w-28 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <span className="text-gray-400 text-xs">—</span>
                    <DatePicker
                      selected={dateFilters[fieldKey]?.end ? new Date(dateFilters[fieldKey].end) : null}
                      onChange={(date) => onDateFilterChange(fieldKey, 'end', date ? date.toISOString().split('T')[0] : '')}
                      selectsEnd
                      startDate={dateFilters[fieldKey]?.start ? new Date(dateFilters[fieldKey].start) : undefined}
                      endDate={dateFilters[fieldKey]?.end ? new Date(dateFilters[fieldKey].end) : undefined}
                      minDate={dateFilters[fieldKey]?.start ? new Date(dateFilters[fieldKey].start) : undefined}
                      placeholderText="To"
                      dateFormat="dd/MM/yyyy"
                      className="w-28 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {(dateFilters[fieldKey]?.start || dateFilters[fieldKey]?.end) && (
                      <button
                        onClick={() => onClearDateFilter(fieldKey)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Clear date filter"
                      >
                        <MdClose className="text-sm" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default TableFilters;
