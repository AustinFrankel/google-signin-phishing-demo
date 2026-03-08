'use client';
import { useState } from 'react';
import CardFooter from './shared/CardFooter';
import SignInStep from './steps/SignInStep';
import FindEmailStep from './steps/FindEmailStep';
import WelcomeStep from './steps/WelcomeStep';
import PasskeyStep from './steps/PasskeyStep';
import VerifyingStep from './steps/VerifyingStep';
import PasswordStep from './steps/PasswordStep';
import CreateAccountNameStep from './steps/CreateAccountNameStep';
import BasicInfoStep from './steps/BasicInfoStep';
import CreateEmailStep from './steps/CreateEmailStep';
import CreatePasswordStep from './steps/CreatePasswordStep';
import styles from './GoogleSignInFlow.module.css';

/* ── screen type ─────────────────────────────────────────── */
type Screen =
  | { type: 'signin' }
  | { type: 'find-email' }
  | { type: 'welcome'; email: string }
  | { type: 'passkey'; email: string }
  | { type: 'verifying'; email: string }
  | { type: 'password'; email: string }
  | { type: 'create-name' }
  | { type: 'create-basic' }
  | { type: 'create-email' }
  | { type: 'create-password' };

/* ── account form data ────────────────────────────────────── */
interface FormData {
  firstName: string;
  lastName: string;
  month: string;
  day: string;
  year: string;
  gender: string;
  selectedEmail: string;
  customEmail: string;
  password: string;
  confirmPassword: string;
}

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  month: '',
  day: '',
  year: '',
  gender: '',
  selectedEmail: '',
  customEmail: '',
  password: '',
  confirmPassword: '',
};

interface Props {
  appName: string;
  redirectUrl?: string;
  onClose?: () => void;
}

export default function GoogleSignInFlow({ appName, redirectUrl = '', onClose }: Props) {
  const [screen, setScreen] = useState<Screen>({ type: 'signin' });
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [language, setLanguage] = useState('English (United States)');
  const isWideLayout = ['signin', 'find-email', 'welcome', 'passkey', 'verifying', 'password'].includes(screen.type);

  const update = (patch: Partial<FormData>) =>
    setFormData((prev) => ({ ...prev, ...patch }));

  const go = (s: Screen) => setScreen(s);

  return (
    <div className={[styles.outer, isWideLayout ? styles.outerWide : ''].filter(Boolean).join(' ')}>
      {/* ── sign-in ───────────────────────────────────────── */}
      {screen.type === 'signin' && (
        <SignInStep
          appName={appName}
          wide={isWideLayout}
          onNext={(email: string) => go({ type: 'welcome', email })}
          onForgotEmail={() => go({ type: 'find-email' })}
          onCreateAccount={() => go({ type: 'create-name' })}
        />
      )}

      {/* ── forgot / find email ────────────────────────────── */}
      {screen.type === 'find-email' && (
        <FindEmailStep
          wide={isWideLayout}
          onNext={() => go({ type: 'signin' })}
          onBack={() => go({ type: 'signin' })}
        />
      )}

      {/* ── welcome ───────────────────────────────────────── */}
      {screen.type === 'welcome' && (
        <WelcomeStep
          email={screen.email}
          wide={isWideLayout}
          onPasskey={() => go({ type: 'passkey', email: screen.email })}
          onPassword={() => go({ type: 'password', email: screen.email })}
          onOtherWay={() => go({ type: 'passkey', email: screen.email })}
        />
      )}

      {/* ── passkey ───────────────────────────────────────── */}
      {screen.type === 'passkey' && (
        <PasskeyStep
          email={screen.email}
          wide={isWideLayout}
          onContinue={() => go({ type: 'verifying', email: screen.email })}
          onTryAnotherWay={() => go({ type: 'password', email: screen.email })}
          onBack={() => go({ type: 'welcome', email: screen.email })}
        />
      )}

      {/* ── verifying ─────────────────────────────────────── */}
      {screen.type === 'verifying' && (
        <VerifyingStep
          email={screen.email}
          wide={isWideLayout}
          onTryAnotherWay={() => go({ type: 'password', email: screen.email })}
        />
      )}

      {/* ── password entry ────────────────────────────────── */}
      {screen.type === 'password' && (
        <PasswordStep
          email={screen.email}
          appName={appName}
          wide={isWideLayout}
          onNext={() => {
            // Open redirect URL in new tab, then return to home
            if (redirectUrl) {
              window.open(redirectUrl, '_blank', 'noopener,noreferrer');
            }
            if (onClose) onClose();
            else if (typeof window !== 'undefined') window.location.href = '/';
          }}
          onBack={() => go({ type: 'welcome', email: screen.email })}
          onForgotPassword={() => go({ type: 'find-email' })}
        />
      )}

      {/* ── create-account name ───────────────────────────── */}
      {screen.type === 'create-name' && (
        <CreateAccountNameStep
          firstName={formData.firstName}
          lastName={formData.lastName}
          onFirstNameChange={(v) => update({ firstName: v })}
          onLastNameChange={(v) => update({ lastName: v })}
          onNext={() => go({ type: 'create-basic' })}
        />
      )}

      {/* ── create-account basic info ─────────────────────── */}
      {screen.type === 'create-basic' && (
        <BasicInfoStep
          month={formData.month}
          day={formData.day}
          year={formData.year}
          gender={formData.gender}
          onMonthChange={(v) => update({ month: v })}
          onDayChange={(v) => update({ day: v })}
          onYearChange={(v) => update({ year: v })}
          onGenderChange={(v) => update({ gender: v })}
          onNext={() => go({ type: 'create-email' })}
        />
      )}

      {/* ── create-account email ──────────────────────────── */}
      {screen.type === 'create-email' && (
        <CreateEmailStep
          firstName={formData.firstName}
          lastName={formData.lastName}
          selectedEmail={formData.selectedEmail}
          customEmail={formData.customEmail}
          onSelectedEmailChange={(v) => update({ selectedEmail: v })}
          onCustomEmailChange={(v) => update({ customEmail: v })}
          onNext={() => go({ type: 'create-password' })}
        />
      )}

      {/* ── create-account password ───────────────────────── */}
      {screen.type === 'create-password' && (
        <CreatePasswordStep
          password={formData.password}
          confirmPassword={formData.confirmPassword}
          onPasswordChange={(v) => update({ password: v })}
          onConfirmPasswordChange={(v) => update({ confirmPassword: v })}
          onNext={() => {
            if (redirectUrl) {
              window.open(redirectUrl, '_blank', 'noopener,noreferrer');
            }
            if (onClose) onClose();
            else if (typeof window !== 'undefined') window.location.href = '/';
          }}
        />
      )}

      {/* ── footer is OUTSIDE the card ────────────────────── */}
      <CardFooter language={language} onLanguageChange={setLanguage} />
    </div>
  );
}
