'use client';
import { useState, useRef, useEffect } from 'react';
import GoogleLogo from '../shared/GoogleLogo';
import FloatingLabelInput from '../shared/FloatingLabelInput';
import GoogleButton from '../shared/GoogleButton';
import ErrorMessage from '../shared/ErrorMessage';
import styles from './SignInStep.module.css';

interface Props {
  appName: string;
  wide?: boolean;
  onNext: (email: string) => void;
  onCreateAccount: () => void;
  onForgotEmail: () => void;
}

export default function SignInStep({ appName, wide = false, onNext, onCreateAccount, onForgotEmail }: Props) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showDevPopup, setShowDevPopup] = useState(false);
  const devRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (!email.trim()) {
      setEmailError('Enter an email or phone number');
      return;
    }
    setEmailError('');
    onNext(email.trim());
  };

  const isCanva = appName === 'Canva';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (devRef.current && !devRef.current.contains(e.target as Node)) {
        setShowDevPopup(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className={[styles.card, wide ? styles.wideCard : ''].filter(Boolean).join(' ')}>
      {/* Header */}
      <div className={styles.header}>
        <GoogleLogo size={20} />
        <span className={styles.headerTitle}>Sign in with Google</span>
      </div>
      <div className={styles.divider} />

      {/* Body — two columns */}
      <div className={[styles.body, wide ? styles.wideBody : ''].filter(Boolean).join(' ')}>
        <div className={[styles.leftCol, wide ? styles.wideLeftCol : ''].filter(Boolean).join(' ')}>
          {isCanva && (
            <div className={styles.canvaWordmark}>Canva</div>
          )}
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.subtitle}>
            to continue to{' '}
            <span ref={devRef} style={{ position: 'relative' }}>
              <a
                href="#"
                className={styles.appLink}
                onClick={(e) => { e.preventDefault(); setShowDevPopup((v) => !v); }}
              >
                {appName}
              </a>
              {showDevPopup && (
                <div className={styles.devPopup}>
                  <div className={styles.devPopupTitle}>Developer info</div>
                  <div className={styles.devPopupName}>{appName}</div>
                  <div className={styles.devPopupDetail}>
                    Third-party app requesting access to your Google Account.
                    Make sure you trust this app before continuing.
                  </div>
                </div>
              )}
            </span>
          </p>
        </div>

        <div className={[styles.rightCol, wide ? styles.wideRightCol : ''].filter(Boolean).join(' ')}>
          <FloatingLabelInput
            label="Email or phone"
            value={email}
            onChange={(v) => { setEmail(v); setEmailError(''); }}
            hasError={!!emailError}
            id="signinEmail"
            autoFocus
            autoComplete="email"
          />
          {emailError && <ErrorMessage message={emailError} />}
          <button
            type="button"
            className={styles.forgotLink}
            onClick={onForgotEmail}
          >
            Forgot email?
          </button>
          {isCanva && (
            <p className={styles.disclaimer}>
              Before using this app, you can review Canva&apos;s{' '}
              <a href="https://www.canva.com/policies/privacy-policy/" target="_blank" rel="noopener" className={styles.disclaimerLink}>privacy policy</a>
              {' '}and{' '}
              <a href="https://www.canva.com/policies/terms-of-use/" target="_blank" rel="noopener" className={styles.disclaimerLink}>terms of service</a>.
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className={[styles.actions, wide ? styles.wideActions : ''].filter(Boolean).join(' ')}>
        <button
          type="button"
          onClick={onCreateAccount}
          className={styles.createAccountBtn}
        >
          Create account
        </button>
        <GoogleButton onClick={handleNext}>Next</GoogleButton>
      </div>
    </div>
  );
}
