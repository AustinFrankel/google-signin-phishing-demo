'use client';
import { useState, useMemo } from 'react';
import GoogleLogo from '../shared/GoogleLogo';
import FloatingLabelInput from '../shared/FloatingLabelInput';
import GoogleButton from '../shared/GoogleButton';
import ErrorMessage from '../shared/ErrorMessage';
import styles from './StepCard.module.css';
import emailStyles from './CreateEmailStep.module.css';

interface Props {
  firstName: string;
  lastName: string;
  selectedEmail: string;
  customEmail: string;
  onSelectedEmailChange: (v: string) => void;
  onCustomEmailChange: (v: string) => void;
  onNext: () => void;
}

export default function CreateEmailStep({
  firstName,
  lastName,
  selectedEmail,
  customEmail,
  onSelectedEmailChange,
  onCustomEmailChange,
  onNext,
}: Props) {
  const [emailError, setEmailError] = useState('');

  // Derive suggestions from name
  const suggestions = useMemo(() => {
    const first = (firstName || 'user').toLowerCase().replace(/\s+/g, '');
    const last = (lastName || '').toLowerCase().replace(/\s+/g, '');
    const s1 = last ? `${first}${last}@gmail.com` : `${first}@gmail.com`;
    const s2 = last
      ? `${first}.${last}72@gmail.com`
      : `${first}72@gmail.com`;
    return [s1, s2];
  }, [firstName, lastName]);

  const handleNext = () => {
    const effectiveEmail =
      selectedEmail === 'custom' ? customEmail : selectedEmail;
    if (!effectiveEmail) {
      setEmailError('Choose a Gmail address');
      return;
    }
    setEmailError('');
    onNext();
  };

  const handleSelect = (val: string) => {
    onSelectedEmailChange(val);
    setEmailError('');
  };

  const options = [
    { value: suggestions[0], label: suggestions[0] },
    { value: suggestions[1], label: suggestions[1] },
    { value: 'custom', label: 'Create your own Gmail address' },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <GoogleLogo size={40} />
        <h1 className={styles.heading}>Create an email address</h1>
        <p className={styles.subtitle}>
          Create a Gmail address for signing in to your Google Account
        </p>

        <div className={emailStyles.radioList}>
          {options.map((opt, i) => {
            const isSelected = selectedEmail === opt.value;
            const isError = !!emailError;
            return (
              <label
                key={opt.value}
                className={[
                  emailStyles.radioItem,
                  i < options.length - 1 ? emailStyles.radioItemDivider : '',
                ].join(' ')}
              >
                <span
                  className={[
                    emailStyles.radioCircle,
                    isSelected ? emailStyles.radioSelected : '',
                    isError && !isSelected ? emailStyles.radioError : '',
                  ].join(' ')}
                >
                  {isSelected && <span className={emailStyles.radioDot} />}
                </span>
                <input
                  type="radio"
                  name="gmailChoice"
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => handleSelect(opt.value)}
                  className={emailStyles.radioInput}
                />
                <span className={emailStyles.radioLabel}>{opt.label}</span>
              </label>
            );
          })}
        </div>

        {/* Custom email input */}
        {selectedEmail === 'custom' && (
          <div style={{ marginTop: 12 }}>
            <FloatingLabelInput
              label="Username"
              value={customEmail}
              onChange={onCustomEmailChange}
              id="customEmail"
              autoFocus
            />
            <span className={emailStyles.gmailSuffix}>@gmail.com</span>
          </div>
        )}

        {emailError && <ErrorMessage message={emailError} />}

        <div className={styles.actionsSpaced}>
          <a href="#" className={emailStyles.useExistingLink}>
            Use your existing email
          </a>
          <GoogleButton onClick={handleNext}>Next</GoogleButton>
        </div>
      </div>
    </div>
  );
}
