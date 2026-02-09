import { useState, useRef, useEffect } from 'react';
import { Input } from './Input';

export interface AutocompleteOption {
  value: string;
  label: string;
  geoId?: string;
}

interface AutocompleteProps {
  value: string;
  onChange: (value: string, geoId?: string) => void;
  options: AutocompleteOption[];
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function Autocomplete({
  value,
  onChange,
  options,
  onSearch,
  placeholder,
  className
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    onChange(newValue, undefined);
    onSearch(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleOptionClick = (option: AutocompleteOption) => {
    onChange(option.value, option.geoId);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      !isOpen &&
      options.length > 0 &&
      (e.key === 'ArrowDown' || e.key === 'ArrowUp')
    ) {
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          handleOptionClick(options[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (options.length > 0) setIsOpen(true);
        }}
        placeholder={placeholder}
        maxLength={3}
        className="uppercase"
      />

      {isOpen && options.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option)}
              className={`w-full text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors text-sm ${
                index === highlightedIndex
                  ? 'bg-accent text-accent-foreground'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium truncate">{option.label}</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {option.value}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
