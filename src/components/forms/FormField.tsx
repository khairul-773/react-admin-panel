import Select from 'react-select';

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
  const baseInputClasses = "w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4361ee] bg-white text-gray-900";

  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: '42px',
      height: '42px',
      borderColor: state.isFocused ? '#4361ee' : '#e5e7eb',
      boxShadow: state.isFocused ? '0 0 0 1px #4361ee' : 'none',
      '&:hover': {
        borderColor: '#4361ee',
      },
    }),
    valueContainer: (base: any) => ({
      ...base,
      height: '42px',
      padding: '0 12px',
    }),
    input: (base: any) => ({
      ...base,
      margin: '0',
      padding: '0',
    }),
    indicatorsContainer: (base: any) => ({
      ...base,
      height: '42px',
    }),
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'select' ? (
        <Select
          name={name}
          options={options}
          value={options.find(opt => opt.value === value) || null}
          onChange={(option) => {
            const event = {
              target: {
                name,
                value: option?.value || '',
              },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange(event);
          }}
          placeholder={`Select ${label}`}
          styles={customSelectStyles}
          isClearable
          className="react-select-container"
          classNamePrefix="react-select"
        />
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
          className={`${baseInputClasses} h-[42px]`}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

export default FormField;
