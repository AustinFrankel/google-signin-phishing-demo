'use client';
import { useEffect, useState } from 'react';
import styles from './ProgressBar.module.css';

interface Props {
  active: boolean;
}

export default function ProgressBar({ active }: Props) {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setVisible(true);
      setWidth(0);
      const t1 = setTimeout(() => setWidth(30), 20);
      const t2 = setTimeout(() => setWidth(70), 200);
      const t3 = setTimeout(() => setWidth(90), 400);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    } else {
      setWidth(100);
      const t = setTimeout(() => {
        setVisible(false);
        setWidth(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [active]);

  if (!visible && width === 0) return null;

  return (
    <div className={styles.track}>
      <div
        className={styles.bar}
        style={{
          width: `${width}%`,
          opacity: width === 100 ? 0 : 1,
          transition:
            width === 0
              ? 'none'
              : width === 100
              ? 'width 0.2s ease, opacity 0.3s ease'
              : 'width 0.3s ease',
        }}
      />
    </div>
  );
}
