import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-900">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 bg-white text-gray-900 ${
            error ? 'border-red-200 bg-red-50' : 'border-gray-200'
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-gray-900 bg-red-50 px-2 py-1 rounded">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;