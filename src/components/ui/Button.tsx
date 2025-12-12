import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', isLoading, className = '', disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-[#4361ee] hover:bg-[#3651de] text-white border border-[#4361ee]',
      secondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300',
      danger: 'bg-white hover:bg-red-50 text-red-600 border border-red-200',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
        {...props}
      >
        {isLoading ? 'Loading...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;