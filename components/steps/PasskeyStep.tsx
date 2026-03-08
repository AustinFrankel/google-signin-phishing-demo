'use client';
import { useState } from 'react';
import GoogleLogo from '../shared/GoogleLogo';
import GoogleButton from '../shared/GoogleButton';
import ErrorMessage from '../shared/ErrorMessage';
import styles from './PasskeyStep.module.css';
import signinStyles from './SignInStep.module.css';

interface Props {
  email: string;
  wide?: boolean;
  onContinue: () => void;
  onTryAnotherWay: () => void;
  onBack: () => void;
}

export default function PasskeyStep({ email, wide = false, onContinue, onTryAnotherWay, onBack }: Props) {
  const [error, setError] = useState('');
  const avatarLetter = email ? email[0].toUpperCase() : 'U';

  async function handleContinue() {
    setError('');
    try {
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: crypto.getRandomValues(new Uint8Array(32)),
          rpId: window.location.hostname,
          allowCredentials: [],
          userVerification: 'preferred',
        },
      } as CredentialRequestOptions);

      if (credential) {
        onContinue();
      } else {
        setError('Passkey verification was cancelled. Try again or choose another sign-in option.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('cancel') || msg.includes('abort') || msg.includes('NotAllowed')) {
        setError('Passkey verification was cancelled. Try again or choose another sign-in option.');
      } else if (msg.includes('NotSupported') || msg.includes('not supported')) {
        setError('Passkeys are not supported on this device. Try another sign-in option.');
      } else {
        setError('Something went wrong. Try again or use another sign-in option.');
      }
    }
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
            <div className={styles.avatar}>{avatarLetter}</div>
            <span className={styles.email}>{email}</span>
          </div>
        </div>

        {/* Right column */}
        <div className={[signinStyles.rightCol, wide ? signinStyles.wideRightCol : ''].filter(Boolean).join(' ')}>
          <p className={styles.heading}>Use your passkey to confirm it&apos;s really you</p>

          {/* Passkey illustration */}
          <div className={styles.illustration}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="20" r="11" fill="#e8f0fe" stroke="#1a73e8" strokeWidth="2.5"/>
              <circle cx="32" cy="20" r="5" fill="#1a73e8"/>
              <path d="M14 52c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="#dadce0" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <rect x="26" y="40" width="12" height="9" rx="2" fill="#1a73e8" opacity=".15" stroke="#1a73e8" strokeWidth="1.5"/>
              <path d="M32 43v3" stroke="#1a73e8" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          <p className={styles.subText}>
            Your device will ask for your fingerprint, face, or screen lock
          </p>

          {error && <ErrorMessage message={error} />}

          <div className={styles.actions}>
            <button type="button" className={styles.tryAnotherWay} onClick={onTryAnotherWay}>
              Try another way
            </button>
            <GoogleButton variant="filled" onClick={handleContinue}>Continue</GoogleButton>
          </div>
        </div>
      </div>
    </div>
  );
}
