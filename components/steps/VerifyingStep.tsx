'use client';
import GoogleLogo from '../shared/GoogleLogo';
import ProgressBar from '../shared/ProgressBar';
import styles from './VerifyingStep.module.css';
import signinStyles from './SignInStep.module.css';

interface Props {
  email: string;
  wide?: boolean;
  onTryAnotherWay: () => void;
}

export default function VerifyingStep({ email, wide = false, onTryAnotherWay }: Props) {
  const avatarLetter = email ? email[0].toUpperCase() : 'U';

  return (
    <div
      className={[signinStyles.card, wide ? signinStyles.wideCard : ''].filter(Boolean).join(' ')}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <ProgressBar active />
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
          <p className={styles.heading}>Verifying it&apos;s you&hellip;</p>
          <p className={styles.subText}>Complete sign-in using your passkey</p>

          <div className={styles.actions}>
            <button type="button" className={styles.tryAnotherWay} onClick={onTryAnotherWay}>
              Try another way
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
