'use client';
import { useState } from 'react';
import GoogleLogo from '../shared/GoogleLogo';
import FloatingLabelInput from '../shared/FloatingLabelInput';
import GoogleButton from '../shared/GoogleButton';
import ErrorMessage from '../shared/ErrorMessage';
import styles from './StepCard.module.css';
import pwStyles from './CreatePasswordStep.module.css';

interface Props {
  password: string;
  confirmPassword: string;
  onPasswordChange: (v: string) => void;
  onConfirmPasswordChange: (v: string) => void;
  onNext: () => void;
}

export default function CreatePasswordStep({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  onNext,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const handleNext = () => {
    let hasError = false;
    if (password.length < 8) {
      setPasswordError('Use 8 characters or more for your password');
      hasError = true;
    } else {
      setPasswordError('');
    }
    if (confirmPassword !== password) {
      setConfirmError("Those passwords didn't match. Try again.");
      hasError = true;
    } else {
      setConfirmError('');
    }
    if (!hasError) onNext();
  };

  const inputType = showPassword ? 'text' : 'password';

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <GoogleLogo size={40} />
        <h1 className={styles.heading}>Create a strong password</h1>
        <p className={styles.subtitle}>
          Create a strong password with a mix of letters, numbers and symbols
        </p>
        <div className={styles.fields}>
          <div>
            <FloatingLabelInput
              label="Password"
              value={password}
              onChange={(v) => { onPasswordChange(v); setPasswordError(''); }}
              type={inputType}
              hasError={!!passwordError}
              id="password"
              autoFocus
              autoComplete="new-password"
            />
            {passwordError && <ErrorMessage message={passwordError} />}
          </div>
          <div>
            <FloatingLabelInput
              label="Confirm"
              value={confirmPassword}
              onChange={(v) => { onConfirmPasswordChange(v); setConfirmError(''); }}
              type={inputType}
              hasError={!!confirmError}
              id="confirmPassword"
              autoComplete="new-password"
            />
            {confirmError && <ErrorMessage message={confirmError} />}
          </div>
        </div>

        <label className={pwStyles.showPasswordLabel}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className={pwStyles.showPasswordCheckbox}
          />
          <span className={pwStyles.showPasswordText}>Show password</span>
        </label>

        <div className={styles.actions}>
          <GoogleButton onClick={handleNext}>Next</GoogleButton>
        </div>
      </div>
    </div>
  );
}
