import { Warning } from "phosphor-react";
import { useState } from "react";

export interface NewLinkInputProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  type?: 'text' | 'url';
  showPrefix?: boolean;
}


export function NewLinkInput({
  label,
  name,
  value,
  placeholder = '',
  onChange,
  onClick,
  onKeyDown,
  errorMessage,
  type = 'text',
  showPrefix = false,
}: NewLinkInputProps) {

  const [isFocused, setIsFocused] = useState(false);
  const hasError = Boolean(errorMessage);

  const borderColorClass = hasError
  ? 'border-danger'
  : isFocused
  ? 'border-blue-base'
  : 'border-gray-300';

   return (
    <div>
      <label
        htmlFor={name}
        className={`pl-1 text-xs mb-2 ${isFocused ? 'font-semibold text-blue-base' : 'text-gray-500'}`}
      >
        {label}
      </label>

      <div
        className={`
          w-full h-[48px] flex items-center justify-center rounded-lg border
          px-2 py-1
          ${borderColorClass}
          ${errorMessage ? 'mb-1': 'mb-4'}
        `}
      >
        {showPrefix && (
          <span className="text-sm text-gray-500 select-none text-md">brev.ly/</span>
        )}
        <input
          id={name}
          type={type}
          className={`
            flex-1 pr-2 py-2 focus:outline-none text-md 
            placeholder-gray-400
          `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {hasError && (
        <span className="flex flex-row ml-1 items-center gap-1 mt-1">
          <Warning size={12} className="text-danger" />
          <span className="text-gray-500 text-sm">{errorMessage}</span>
        </span>
      )}
    </div>
  );
}