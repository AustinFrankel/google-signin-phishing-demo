'use client';
import LanguageDropdown from './LanguageDropdown';
import styles from './CardFooter.module.css';

interface Props {
  language: string;
  onLanguageChange: (lang: string) => void;
}

export default function CardFooter({ language, onLanguageChange }: Props) {
  return (
    <div className={styles.footer}>
      <div className={styles.left}>
        <LanguageDropdown selected={language} onSelect={onLanguageChange} />
      </div>
      <div className={styles.right}>
        <a href="https://support.google.com/accounts" target="_blank" rel="noopener" className={styles.link}>Help</a>
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" className={styles.link}>Privacy</a>
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener" className={styles.link}>Terms</a>
      </div>
    </div>
  );
}
