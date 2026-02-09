import { useState, useRef, useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ComboboxOption {
  value: string;
  label: string;
  geoId?: string;
}

interface ComboboxProps {
  value?: string;
  onChange: (value: string, geoId?: string) => void;
  options: ComboboxOption[];
  onSearch: (query: string) => void;
  placeholder?: string;
  emptyText?: string;
}

export function Combobox({
  value,
  onChange,
  options,
  onSearch,
  placeholder = 'Select...',
  emptyText = 'No results found.'
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
    setHighlightedIndex(-1);
  };

  const handleSelect = (selectedValue: string) => {
    const selectedOption = options.find((opt) => opt.value === selectedValue);
    if (selectedValue === value) {
      onChange('', undefined);
    } else {
      onChange(selectedValue, selectedOption?.geoId);
    }
    setIsOpen(false);
    setSearchQuery('');
    setHighlightedIndex(-1);
  };

  const handleButtonClick = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (newIsOpen) {
      // Trigger search with empty query to load initial options
      onSearch('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } else {
      setSearchQuery('');
      setHighlightedIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
          handleSelect(options[highlightedIndex].value);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        onClick={handleButtonClick}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          !value && 'text-muted-foreground'
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md">
          <div className="flex max-h-[300px] flex-col overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center border-b px-3">
              <input
                ref={inputRef}
                className="flex h-10 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                placeholder={`Search ${placeholder.toLowerCase()}...`}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </div>

            {/* Results List */}
            <div className="max-h-[250px] overflow-y-auto overflow-x-hidden">
              {options.length === 0 && searchQuery.length >= 2 && (
                <div className="py-6 text-center text-sm">{emptyText}</div>
              )}
              {options.length === 0 &&
                searchQuery.length > 0 &&
                searchQuery.length < 2 && (
                  <div className="py-6 text-center text-sm">
                    Type at least 2 characters to search...
                  </div>
                )}
              {options.length > 0 && (
                <div className="overflow-hidden p-1">
                  {options.map((option, index) => (
                    <div
                      key={option.value}
                      className={cn(
                        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
                        value === option.value && 'bg-accent',
                        highlightedIndex === index && 'bg-accent/50'
                      )}
                      onClick={() => handleSelect(option.value)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === option.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <span className="truncate">{option.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
