'use client';
import { useState } from 'react';
import GoogleLogo from '../shared/GoogleLogo';
import FloatingLabelInput from '../shared/FloatingLabelInput';
import FloatingLabelSelect from '../shared/FloatingLabelSelect';
import GoogleButton from '../shared/GoogleButton';
import ErrorMessage from '../shared/ErrorMessage';
import styles from './StepCard.module.css';
import basicStyles from './BasicInfoStep.module.css';

const MONTHS = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'rather-not-say', label: 'Rather not say' },
  { value: 'custom', label: 'Custom' },
];

interface Props {
  month: string;
  day: string;
  year: string;
  gender: string;
  onMonthChange: (v: string) => void;
  onDayChange: (v: string) => void;
  onYearChange: (v: string) => void;
  onGenderChange: (v: string) => void;
  onNext: () => void;
}

export default function BasicInfoStep({
  month, day, year, gender,
  onMonthChange, onDayChange, onYearChange, onGenderChange,
  onNext,
}: Props) {
  const [birthdayError, setBirthdayError] = useState('');
  const [genderError, setGenderError] = useState('');

  const handleNext = () => {
    let hasError = false;
    if (!month || !day.trim() || !year.trim()) {
      setBirthdayError('Please fill in a complete birthday');
      hasError = true;
    } else {
      setBirthdayError('');
    }
    if (!gender) {
      setGenderError('Please select your gender');
      hasError = true;
    } else {
      setGenderError('');
    }
    if (!hasError) onNext();
  };

  const birthdayHasError = !!birthdayError;
  const genderHasError = !!genderError;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <GoogleLogo size={40} />
        <h1 className={styles.heading}>Basic information</h1>
        <p className={styles.subtitle}>Enter your birthday and gender</p>

        {/* Birthday row */}
        <div className={basicStyles.birthdayRow}>
          <div className={basicStyles.monthField}>
            <FloatingLabelSelect
              label="Month"
              value={month}
              onChange={(v) => { onMonthChange(v); setBirthdayError(''); }}
              options={MONTHS}
              hasError={birthdayHasError}
              id="bMonth"
            />
          </div>
          <div className={basicStyles.dayField}>
            <FloatingLabelInput
              label="Day"
              value={day}
              onChange={(v) => { onDayChange(v); setBirthdayError(''); }}
              type="number"
              hasError={birthdayHasError}
              id="bDay"
            />
          </div>
          <div className={basicStyles.yearField}>
            <FloatingLabelInput
              label="Year"
              value={year}
              onChange={(v) => { onYearChange(v); setBirthdayError(''); }}
              type="number"
              hasError={birthdayHasError}
              id="bYear"
            />
          </div>
        </div>
        {birthdayError && <ErrorMessage message={birthdayError} />}

        {/* Gender row */}
        <div className={basicStyles.genderRow}>
          <FloatingLabelSelect
            label="Gender"
            value={gender}
            onChange={(v) => { onGenderChange(v); setGenderError(''); }}
            options={GENDERS}
            hasError={genderHasError}
            id="gender"
          />
        </div>
        {genderError && <ErrorMessage message={genderError} />}

        <a href="#" className={basicStyles.whyLink}>
          Why we ask for your birthday and gender
        </a>

        <div className={styles.actions}>
          <GoogleButton onClick={handleNext}>Next</GoogleButton>
        </div>
      </div>
    </div>
  );
}
