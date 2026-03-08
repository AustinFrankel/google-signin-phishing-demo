'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import GoogleLogo from '@/components/shared/GoogleLogo';

export default function Home() {
  const router = useRouter();
  const [appInput, setAppInput] = useState('');

  // Derive display name and redirect URL from input
  const appName = appInput.trim() || 'Google Sign-In Replica';
  const redirectUrl = (() => {
    const v = appInput.trim();
    if (!v) return '';
    if (v.startsWith('http://') || v.startsWith('https://')) return v;
    if (v.includes('.')) return 'https://' + v;
    return '';
  })();

  return (
    <div className={styles.page}>
      {/* ── Fake browser chrome ─────────────────────────── */}
      <div className={styles.browser}>
        {/* Browser title bar */}
        <div className={styles.titleBar}>
          <div className={styles.trafficLights}>
            <span className={styles.tlClose} />
            <span className={styles.tlMin} />
            <span className={styles.tlMax} />
          </div>
          <div className={styles.tabBar}>
            <div className={styles.tab}>
              <GoogleLogo size={14} />
              <span className={styles.tabTitle}>Google Sign-In Replica</span>
              <span className={styles.tabClose}>×</span>
            </div>
            <span className={styles.newTab}>+</span>
          </div>
        </div>

        {/* Address bar */}
        <div className={styles.addressBar}>
          <div className={styles.navBtns}>
            <span className={styles.navBtn}>‹</span>
            <span className={[styles.navBtn, styles.navBtnDisabled].join(' ')}>›</span>
            <span className={styles.navBtn}>↻</span>
          </div>
          <div className={styles.omnibox}>
            <svg className={styles.lockIcon} width="12" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="#5f6368"/>
            </svg>
            <span className={styles.omniUrl}>localhost:3002</span>
          </div>
        </div>

        {/* Browser content */}
        <div className={styles.browserContent}>
          <main className={styles.main}>
            <div className={styles.logoRow}>
              <GoogleLogo size={40} />
            </div>

            <h1 className={styles.title}>Google Sign-In Replica</h1>
            <p className={styles.description}>
              A tool developed to teach the importance of cybersecurity and phishing awareness,
              developed by{' '}
              <a
                href="https://linkedin.com/in/austin-frankel"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.authorLink}
              >
                Austin Frankel
              </a>
              .
            </p>

            {/* App name / URL input */}
            <div className={styles.section}>
              <label className={styles.sectionLabel} htmlFor="appInput">
                Enter app name or website URL:
              </label>
              <input
                id="appInput"
                type="text"
                className={styles.urlInput}
                placeholder="e.g. MIT App Inventor  or  https://example.com"
                value={appInput}
                onChange={(e) => setAppInput(e.target.value)}
              />
            </div>

            {/* Begin button */}
            <div className={styles.btnGroup}>
              <button
                className={styles.filledBtn}
                onClick={() =>
                  router.push(
                    `/fullscreen?app=${encodeURIComponent(appName)}&redirect=${encodeURIComponent(redirectUrl)}`
                  )
                }
              >
                Begin
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
