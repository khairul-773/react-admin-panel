import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
  const { register, formState: { errors } } = form;
  const error = errors[name]?.message as string | undefined;

  const baseInputClasses = `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 bg-white text-gray-900 ${
    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#4361ee]'
  }`;

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'select' ? (
        <select {...register(name)} className={baseInputClasses}>
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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
          className={baseInputClasses}
          placeholder={placeholder}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
