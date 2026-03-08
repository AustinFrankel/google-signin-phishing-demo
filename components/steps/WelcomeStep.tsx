'use client';
import GoogleLogo from '../shared/GoogleLogo';
import styles from './WelcomeStep.module.css';
import signinStyles from './SignInStep.module.css';

interface Props {
  email: string;
  wide?: boolean;
  onPasskey: () => void;
  onPassword: () => void;
  onOtherWay: () => void;
}

export default function WelcomeStep({ email, wide = false, onPasskey, onPassword, onOtherWay }: Props) {
  return (
    <div className={[signinStyles.card, wide ? signinStyles.wideCard : ''].filter(Boolean).join(' ')}>
      <div className={signinStyles.header}>
        <GoogleLogo size={20} />
        <span className={signinStyles.headerTitle}>Sign in with Google</span>
      </div>
      <div className={signinStyles.divider} />

      <div className={[signinStyles.body, wide ? signinStyles.wideBody : ''].filter(Boolean).join(' ')} style={{ alignItems: 'flex-start' }}>
        {/* Left column */}
        <div className={[signinStyles.leftCol, wide ? signinStyles.wideLeftCol : ''].filter(Boolean).join(' ')}>
          <h1 className={signinStyles.title}>Welcome</h1>
          <div className={styles.userChip}>
            {/* Person icon, same as real Google Welcome screen */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={styles.personIcon}>
              <circle cx="12" cy="12" r="12" fill="#e8eaed" />
              <circle cx="12" cy="9" r="4.5" fill="#9aa0a6" />
              <path d="M3.5 21c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5" fill="#9aa0a6" />
            </svg>
            <span className={styles.email}>{email}</span>
          </div>
        </div>

        {/* Right column: choose how to sign in */}
        <div className={[signinStyles.rightCol, wide ? signinStyles.wideRightCol : ''].filter(Boolean).join(' ')}>
          <p className={styles.chooseLabel}>Choose how you want to sign in:</p>
          <div className={styles.optionsList}>
            <button type="button" className={styles.option} onClick={onPasskey}>
              <span className={styles.optionIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#1a73e8"/>
                </svg>
              </span>
              <span className={styles.optionLabel}>Use your passkey</span>
            </button>
            <div className={styles.optionDivider} />
            <button type="button" className={styles.option} onClick={onPassword}>
              <span className={styles.optionIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="#1a73e8"/>
                </svg>
              </span>
              <span className={styles.optionLabel}>Enter your password</span>
            </button>
            <div className={styles.optionDivider} />
            <button type="button" className={styles.option} onClick={onOtherWay}>
              <span className={styles.optionIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="#1a73e8"/>
                </svg>
              </span>
              <span className={styles.optionLabel}>Try another way</span>
            </button>
            <div className={styles.optionDivider} />
          </div>
        </div>
      </div>
    </div>
  );
}
