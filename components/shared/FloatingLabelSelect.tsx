'use client';
import { useState } from 'react';
import styles from './FloatingLabelSelect.module.css';

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  hasError?: boolean;
  id?: string;
}

export default function FloatingLabelSelect({
  label,
  value,
  onChange,
  options,
  hasError = false,
  id,
}: Props) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  return (
    <div
      className={[
        styles.wrapper,
        focused ? styles.focused : '',
        hasError ? styles.hasError : '',
      ].join(' ')}
    >
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[styles.select, isFloating ? styles.selectFloating : ''].join(' ')}
      >
        <option value="" disabled hidden />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={[
          styles.label,
          isFloating ? styles.labelFloating : '',
          focused && !hasError ? styles.labelFocused : '',
          hasError ? styles.labelError : '',
        ].join(' ')}
      >
        {label}
      </label>
      {/* Custom dropdown arrow */}
      <span
        className={[styles.arrow, hasError ? styles.arrowError : focused ? styles.arrowFocused : ''].join(' ')}
      >
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
