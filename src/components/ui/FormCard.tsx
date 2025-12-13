import { ReactNode } from 'react';

interface FormCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  submitText?: string;
  isSubmitting?: boolean;
}

const FormCard = ({ 
  title, 
  description, 
  children, 
  onSubmit, 
  submitText = 'Submit',
  isSubmitting = false 
}: FormCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">{title}</h3>
        {description && <p className="text-sm text-gray-600 mt-1 leading-relaxed">{description}</p>}
      </div>

      {/* Body */}
      <form onSubmit={onSubmit} className="p-6">
        {children}

        {/* Footer */}
        {onSubmit && (
          <div className="border-t border-gray-200 -mx-6 -mb-6 mt-6 px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold tracking-wide"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold tracking-wide"
            >
              {isSubmitting ? 'Submitting...' : submitText}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormCard;
