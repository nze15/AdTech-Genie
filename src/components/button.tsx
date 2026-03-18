import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-primary hover:bg-primary-dark text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-foreground',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-foreground hover:bg-gray-100',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={isLoading || disabled}
      className={`
        inline-flex items-center justify-center
        rounded-lg font-medium transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="animate-spin mr-2">⟳</span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
