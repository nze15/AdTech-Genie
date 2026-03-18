import React from 'react';

export function Form({ children, onSubmit, className = '', ...props }: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form className={`space-y-6 ${className}`} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
}

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function FormGroup({ children, className = '', ...props }: FormGroupProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

export function Label({ children, required = false, className = '', ...props }: LabelProps) {
  return (
    <label className={`text-sm font-medium text-foreground ${className}`} {...props}>
      {children}
      {required && <span className="text-error"> *</span>}
    </label>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ error, className = '', ...props }: InputProps) {
  return (
    <>
      <input
        className={`
          w-full px-4 py-2 rounded-lg border border-border
          bg-background text-foreground
          focus:outline-none focus:ring-2 focus:ring-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
          ${error ? 'border-error focus:ring-error' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-error">{error}</p>}
    </>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function Textarea({ error, className = '', ...props }: TextareaProps) {
  return (
    <>
      <textarea
        className={`
          w-full px-4 py-2 rounded-lg border border-border
          bg-background text-foreground
          focus:outline-none focus:ring-2 focus:ring-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors resize-none
          ${error ? 'border-error focus:ring-error' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-error">{error}</p>}
    </>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export function Select({ error, options, className = '', ...props }: SelectProps) {
  return (
    <>
      <select
        className={`
          w-full px-4 py-2 rounded-lg border border-border
          bg-background text-foreground
          focus:outline-none focus:ring-2 focus:ring-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
          ${error ? 'border-error focus:ring-error' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-error">{error}</p>}
    </>
  );
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        className={`
          w-5 h-5 rounded border border-border
          bg-background text-primary
          focus:outline-none focus:ring-2 focus:ring-primary
          cursor-pointer
          ${className}
        `}
        {...props}
      />
      {label && (
        <label className="text-sm text-foreground cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
}
