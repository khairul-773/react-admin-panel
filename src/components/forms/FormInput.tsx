import { UseFormReturn, Controller, FieldValues, Path } from 'react-hook-form';
import Select, { StylesConfig, ActionMeta, SingleValue } from 'react-select';

/**
 * Option interface for select inputs
 */
interface SelectOption {
  value: string | number;
  label: string;
}

/**
 * FormInput component props
 */
interface FormInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: 'text' | 'number' | 'textarea' | 'select' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
  rows?: number;
  className?: string;
  form: UseFormReturn<T>;
}

/**
 * Custom styles for react-select
 */
const getCustomSelectStyles = (hasError: boolean): StylesConfig<SelectOption, false> => ({
  control: (base, state) => ({
    ...base,
    minHeight: '42px',
    height: '42px',
    borderColor: hasError ? '#ef4444' : state.isFocused ? '#4361ee' : '#e5e7eb',
    boxShadow: state.isFocused ? '0 0 0 1px #4361ee' : 'none',
    '&:hover': {
      borderColor: hasError ? '#ef4444' : '#4361ee',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    height: '42px',
    padding: '0 12px',
  }),
  input: (base) => ({
    ...base,
    margin: '0',
    padding: '0',
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: '42px',
  }),
});

/**
 * FormInput Component
 * Generic form input component with support for various input types
 */
function FormInput<T extends FieldValues>({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  options = [],
  rows = 4,
  className = '',
  form,
}: FormInputProps<T>) {
  const { register, formState: { errors }, control } = form;
  const error = errors[name]?.message as string | undefined;

  const baseInputClasses = `w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-1 bg-white text-gray-900 ${
    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#4361ee]'
  }`;

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
            <Select<SelectOption, false>
              {...field}
              options={options}
              value={options.find(opt => opt.value === field.value) || null}
              onChange={(
                option: SingleValue<SelectOption>,
                _actionMeta: ActionMeta<SelectOption>
              ) => field.onChange(option?.value || '')}
              placeholder={placeholder || `Select ${label}`}
              styles={getCustomSelectStyles(!!error)}
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
}

export default FormInput;
export type { SelectOption };
