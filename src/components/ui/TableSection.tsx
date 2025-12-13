import { ReactNode } from 'react';

interface TableSectionProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonPath?: string;
  onButtonClick?: () => void;
  children: ReactNode;
}

const TableSection = ({ 
  title, 
  description, 
  buttonText, 
  // buttonPath, 
  onButtonClick,
  children 
}: TableSectionProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header inside border */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
          {description && <p className="text-sm text-gray-600 mt-1 leading-relaxed">{description}</p>}
        </div>
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-sm font-semibold tracking-wide"
          >
            {buttonText}
          </button>
        )}
      </div>
      
      {/* Content (Table) */}
      <div>
        {children}
      </div>
    </div>
  );
};

export default TableSection;
