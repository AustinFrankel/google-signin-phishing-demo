import GoogleSignInFlow from './GoogleSignInFlow';
import styles from './GoogleSignInFullscreen.module.css';

interface Props {
  appName: string;
  redirectUrl?: string;
  onClose: () => void;
}

export default function GoogleSignInFullscreen({ appName, redirectUrl = '', onClose }: Props) {
  return (
    <div className={styles.page}>
      <main className={styles.center}>
        <GoogleSignInFlow appName={appName} redirectUrl={redirectUrl} onClose={onClose} />
      </main>
    </div>
  );
}
