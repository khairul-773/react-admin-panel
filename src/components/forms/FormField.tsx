interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'textarea' | 'select';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  rows?: number;
  className?: string;
}

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder,
  options = [],
  rows = 4,
  className = '',
}: FormFieldProps) => {
  const baseInputClasses = "w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4361ee] bg-white text-gray-900";

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={baseInputClasses}
          required={required}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={baseInputClasses}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={baseInputClasses}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

export default FormField;
