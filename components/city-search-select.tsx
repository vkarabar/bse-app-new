'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { filterCitiesBySearch } from '@/lib/macedonian-cities';
import { cn } from '@/lib/utils';

type Props = {
  id: string;
  value: string;
  onChange: (city: string) => void;
  label?: string;
  placeholder?: string;
  inputClassName?: string;
};

export function CitySearchSelect({
  id,
  value,
  onChange,
  label = 'Град (опционално)',
  placeholder = 'Пребарај град',
  inputClassName,
}: Props) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = `${id}-listbox`;

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const filtered = useMemo(() => filterCitiesBySearch(query), [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setQuery(value);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  function selectCity(city: string) {
    onChange(city);
    setQuery(city);
    setOpen(false);
  }

  function handleInputChange(next: string) {
    setQuery(next);
    onChange('');
    setOpen(true);
  }

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className={cn(inputClassName, 'bg-white')}
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-52 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          {filtered.map((city) => (
            <li
              key={city}
              role="option"
              aria-selected={value === city}
            >
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectCity(city)}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm text-slate-800 hover:bg-sky-50',
                  value === city && 'bg-sky-50 font-medium',
                )}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && query.trim() && filtered.length === 0 && (
        <p className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-lg">
          Нема резултати
        </p>
      )}
    </div>
  );
}
