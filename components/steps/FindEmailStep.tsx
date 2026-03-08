'use client';
import { useState } from 'react';
import GoogleLogo from '../shared/GoogleLogo';
import FloatingLabelInput from '../shared/FloatingLabelInput';
import GoogleButton from '../shared/GoogleButton';
import ErrorMessage from '../shared/ErrorMessage';
import styles from './SignInStep.module.css';
import findStyles from './FindEmailStep.module.css';

interface Props {
  wide?: boolean;
  onNext: () => void;
  onBack: () => void;
}

export default function FindEmailStep({ wide = false, onNext, onBack }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!value.trim()) {
      setError('Enter a phone number or email address');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className={[styles.card, wide ? styles.wideCard : ''].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <GoogleLogo size={20} />
        <span className={styles.headerTitle}>Sign in with Google</span>
      </div>
      <div className={styles.divider} />

      <div className={[styles.body, wide ? styles.wideBody : ''].filter(Boolean).join(' ')}>
        <div className={[styles.leftCol, wide ? styles.wideLeftCol : ''].filter(Boolean).join(' ')}>
          <h1 className={styles.title}>Find your email</h1>
          <p className={findStyles.subtitle}>Enter your phone number or recovery email</p>
        </div>
        <div className={[styles.rightCol, wide ? styles.wideRightCol : ''].filter(Boolean).join(' ')}>
          <FloatingLabelInput
            label="Phone number or email"
            value={value}
            onChange={(v) => { setValue(v); setError(''); }}
            hasError={!!error}
            id="findEmail"
            autoFocus
            autoComplete="email"
          />
          {error && <ErrorMessage message={error} />}
        </div>
      </div>

      <div className={[styles.actions, wide ? styles.wideActions : ''].filter(Boolean).join(' ')}>
        <button type="button" onClick={onBack} className={styles.createAccountBtn}>
          Back
        </button>
        <GoogleButton onClick={handleNext}>Next</GoogleButton>
      </div>
    </div>
  );
}
