'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './LanguageDropdown.module.css';

const LANGUAGES = [
  'Afrikaans',
  'azərbaycan',
  'bosanski',
  'català',
  'Čeština',
  'Cymraeg',
  'Dansk',
  'Deutsch',
  'eesti',
  'English (United Kingdom)',
  'English (United States)',
  'español',
  'español (Latinoamérica)',
  'euskara',
  'Filipino',
  'français',
  'français (Canada)',
  'galego',
  'Hrvatski',
  'Indonesia',
  'isiZulu',
  'íslenska',
  'italiano',
  'Kiswahili',
  'latviešu',
  'lietuvių',
  'magyar',
  'Melayu',
  'Nederlands',
  'norsk',
  'o\'zbek',
  'polski',
  'português (Brasil)',
  'português (Portugal)',
  'română',
  'shqip',
  'Slovenčina',
  'slovenščina',
  'srpski',
  'suomi',
  'Svenska',
  'Tiếng Việt',
  'Türkçe',
  'Ελληνικά',
  'беларуская',
  'български',
  'кыргызча',
  'қазақ тілі',
  'македонски',
  'монгол',
  'русский',
  'српски',
  'українська',
  'Հայերեն',
  'עברית',
  'اردو',
  'العربية',
  'فارسی',
  'मराठी',
  'हिन्दी',
  'অসমীয়া',
  'বাংলা',
  'ਪੰਜਾਬੀ',
  'ગુજરાતી',
  'ଓଡ଼ିଆ',
  'தமிழ்',
  'తెలుగు',
  'ಕನ್ನಡ',
  'മലയാളം',
  'සිංහල',
  'ภาษาไทย',
  'ລາວ',
  'မြန်မာ',
  'ខ្មែរ',
  '한국어',
  '中文（香港）',
  '日本語',
  '简体中文',
  '繁體中文',
];

interface Props {
  selected: string;
  onSelect: (lang: string) => void;
}

export default function LanguageDropdown({ selected, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Scroll selected language into view when dropdown opens
  useEffect(() => {
    if (open && listRef.current) {
      const selectedEl = listRef.current.querySelector('[data-selected="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
    }
  }, [open]);

  const handleSelect = (lang: string) => {
    onSelect(lang);
    setOpen(false);
  };

  return (
    <div ref={ref} className={styles.container}>
      {open && (
        <div className={styles.popover}>
          <div ref={listRef} className={styles.list}>
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                data-selected={lang === selected}
                type="button"
                onClick={() => handleSelect(lang)}
                className={[
                  styles.langOption,
                  lang === selected ? styles.langOptionSelected : '',
                ].join(' ')}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[styles.trigger, open ? styles.triggerOpen : ''].join(' ')}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{selected}</span>
        <svg
          className={[styles.arrow, open ? styles.arrowUp : ''].join(' ')}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path
            d="M1 5l4-4 4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
