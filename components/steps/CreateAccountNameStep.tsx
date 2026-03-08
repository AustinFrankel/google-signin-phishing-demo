'use client';
import { useState } from 'react';
import GoogleLogo from '../shared/GoogleLogo';
import FloatingLabelInput from '../shared/FloatingLabelInput';
import GoogleButton from '../shared/GoogleButton';
import ErrorMessage from '../shared/ErrorMessage';
import styles from './StepCard.module.css';

interface Props {
  firstName: string;
  lastName: string;
  onFirstNameChange: (v: string) => void;
  onLastNameChange: (v: string) => void;
  onNext: () => void;
}

export default function CreateAccountNameStep({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onNext,
}: Props) {
  const [firstNameError, setFirstNameError] = useState('');

  const handleNext = () => {
    if (!firstName.trim()) {
      setFirstNameError('Enter a name');
      return;
    }
    setFirstNameError('');
    onNext();
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <GoogleLogo size={40} />
        <h1 className={styles.heading}>Create a Google Account</h1>
        <p className={styles.subtitle}>Enter your name</p>
        <div className={styles.fields}>
          <div>
            <FloatingLabelInput
              label="First name"
              value={firstName}
              onChange={(v) => { onFirstNameChange(v); setFirstNameError(''); }}
              hasError={!!firstNameError}
              id="firstName"
              autoFocus
            />
            {firstNameError && <ErrorMessage message={firstNameError} />}
          </div>
          <FloatingLabelInput
            label="Last name (optional)"
            value={lastName}
            onChange={onLastNameChange}
            id="lastName"
          />
        </div>
        <div className={styles.actions}>
          <GoogleButton onClick={handleNext}>Next</GoogleButton>
        </div>
      </div>
    </div>
  );
}
