'use client';
import { useState } from 'react';
import GoogleLogo from '../shared/GoogleLogo';
import FloatingLabelInput from '../shared/FloatingLabelInput';
import GoogleButton from '../shared/GoogleButton';
import ErrorMessage from '../shared/ErrorMessage';
import styles from './PasswordStep.module.css';
import signinStyles from './SignInStep.module.css';

interface Props {
  email: string;
  wide?: boolean;
  onNext: () => void;
  onBack: () => void;
  onForgotPassword: () => void;
  appName: string;
}

export default function PasswordStep({ email, wide = false, onNext, onBack, onForgotPassword, appName }: Props) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // First letter for avatar initial
  const avatarLetter = email ? email[0].toUpperCase() : 'U';

  function handleNext() {
    if (!password.trim()) {
      setError('Enter your password');
      return;
    }
    setError('');
    onNext();
  }

  return (
    <div className={[signinStyles.card, wide ? signinStyles.wideCard : ''].filter(Boolean).join(' ')}>
      <div className={signinStyles.header}>
        <GoogleLogo size={20} />
        <span className={signinStyles.headerTitle}>Sign in with Google</span>
      </div>
      <div className={signinStyles.divider} />

      <div className={[signinStyles.body, wide ? signinStyles.wideBody : ''].filter(Boolean).join(' ')}>
        {/* Left column */}
        <div className={[signinStyles.leftCol, wide ? signinStyles.wideLeftCol : ''].filter(Boolean).join(' ')}>
          <h1 className={signinStyles.title}>Welcome</h1>
          <div className={styles.userChip}>
            {/* Person icon like real Google */}
            <svg className={styles.personIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" fill="#e8eaed" />
              <circle cx="12" cy="9" r="4" fill="#9aa0a6" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#9aa0a6" />
            </svg>
            <span className={styles.chipEmail}>{email}</span>
          </div>
        </div>

        {/* Right column */}
        <div className={[signinStyles.rightCol, wide ? signinStyles.wideRightCol : ''].filter(Boolean).join(' ')}>
          <p className={styles.heading}>To continue, first verify it&apos;s you</p>
          <FloatingLabelInput
            id="password"
            label="Enter your password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={setPassword}
            autoFocus
          />
          <label className={styles.showPasswordRow}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className={styles.checkbox}
            />
            Show password
          </label>

          {error && <ErrorMessage message={error} />}

          <div className={styles.actions}>
            <button type="button" className={styles.tryAnotherWay} onClick={onForgotPassword}>
              Try another way
            </button>
            <GoogleButton variant="filled" onClick={handleNext}>Next</GoogleButton>
          </div>
        </div>
      </div>
    </div>
  );
}
