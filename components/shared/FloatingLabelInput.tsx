'use client';
import { useState, useEffect } from 'react';
import styles from './FloatingLabelInput.module.css';

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  hasError?: boolean;
  id?: string;
  autoFocus?: boolean;
  autoComplete?: string;
}

export default function FloatingLabelInput({
  label,
  value,
  onChange,
  type = 'text',
  hasError = false,
  id,
  autoFocus = false,
  autoComplete = 'off',
}: Props) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  // autoFocus doesn't fire React onFocus, so sync state manually
  useEffect(() => {
    if (autoFocus) setFocused(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={[
        styles.wrapper,
        focused ? styles.focused : '',
        hasError ? styles.hasError : '',
      ].join(' ')}
    >
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={[styles.input, isFloating ? styles.inputFloating : ''].join(' ')}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        placeholder=" "
      />
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
    </div>
  );
}
