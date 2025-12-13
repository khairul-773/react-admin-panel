import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'textarea' | 'select' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
  options?: { value: string | number; label: string }[];
  rows?: number;
  className?: string;
  form: UseFormReturn<any>;
}

const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  options = [],
  rows = 4,
  className = '',
  form,
}: FormInputProps) => {
  const { register, formState: { errors }, control } = form;
  const error = errors[name]?.message as string | undefined;

  const baseInputClasses = `w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-1 bg-white text-gray-900 ${
    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#4361ee]'
  }`;

  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: '42px',
      height: '42px',
      borderColor: error ? '#ef4444' : state.isFocused ? '#4361ee' : '#e5e7eb',
      boxShadow: state.isFocused ? '0 0 0 1px #4361ee' : 'none',
      '&:hover': {
        borderColor: error ? '#ef4444' : '#4361ee',
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
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'select' ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={options}
              value={options.find(opt => opt.value === field.value) || null}
              onChange={(option) => field.onChange(option?.value || '')}
              placeholder={`Select ${label}`}
              styles={customSelectStyles}
              isClearable
              className="react-select-container"
              classNamePrefix="react-select"
            />
          )}
        />
      ) : type === 'textarea' ? (
        <textarea
          {...register(name)}
          rows={rows}
          className={baseInputClasses}
          placeholder={placeholder}
        />
      ) : (
        <input
          {...register(name)}
          type={type}
          className={`${baseInputClasses} h-[42px]`}
          placeholder={placeholder}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
