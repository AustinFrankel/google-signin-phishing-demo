'use client';
import styles from './GoogleButton.module.css';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'filled' | 'text' | 'outlined';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function GoogleButton({
  children,
  onClick,
  variant = 'filled',
  type = 'button',
  disabled = false,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        styles.btn,
        variant === 'filled' ? styles.filled :
        variant === 'outlined' ? styles.outlined :
        styles.text,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
