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
}

function Table<T extends { id: number }>({
  columns,
  data,
  onEdit,
  onDelete,
  emptyMessage = 'No data found.',
  getRowId = (item) => item.id,
}: TableProps<T>) {
  const handleDelete = (item: T) => {
    if (onDelete && window.confirm('Are you sure you want to delete this item?')) {
      onDelete(getRowId(item));
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((item) => (
              <tr
                key={getRowId(item)}
                className="hover:bg-[#4361ee] hover:text-white transition-colors group"
              >
                {columns.map((column, colIndex) => {
                  const value = typeof column.accessor === 'function'
                    ? column.accessor(item)
                    : item[column.accessor];
                  
                  return (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        column.className || 'text-gray-900 group-hover:text-white'
                      }`}
                    >
                      {value as React.ReactNode}
                    </td>
                  );
                })}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="text-white bg-[#4361ee] hover:bg-[#3651de] font-medium mr-3 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-white font-medium bg-red-600 group-hover:bg-red-700 hover:bg-red-700 px-2 py-1 rounded"
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
        <div className="text-center py-12 text-gray-500">
          {emptyMessage}
        </div>
      )}
    </div>
  );
}

export default Table;
export type { Column };
