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
}: NewLinkInputProps) {

  const [isFocused, setIsFocused] = useState(false);

  const hasError = Boolean(errorMessage);
  // const isActive = isFocused || hasError;
  return (
    <div>
      <label htmlFor={name} className={` pl-1 text-xs mb-2 ${isFocused ? 'font-semibold text-blue-base' : 'text-gray-500'}`}>{label}</label>
      <input
        id={name}
        type={type}
        className={`w-full h-[48px] border rounded-lg px-4 py-2 border-gray-300 focus:outline-blue-base text-md ${errorMessage ? 'mb-1': 'mb-4'} `}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {hasError && (
        <span className="flex flex-row ml-1 items-center gap-1">
          <Warning size={12} className="text-danger"/>
          <span className="text-gray-500 text-sm">{errorMessage}</span>
        </span>
      )}
    </div>
  )
}