'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import GoogleSignInFullscreen from '@/components/GoogleSignInFullscreen';

function FullscreenContent() {
  const params = useSearchParams();
  const router = useRouter();
  const appName = params.get('app') || 'Google Sign-In Replica';
  const redirectUrl = params.get('redirect') || '';

  return (
    <GoogleSignInFullscreen
      appName={appName}
      redirectUrl={redirectUrl}
      onClose={() => router.push('/')}
    />
  );
}

export default function FullscreenPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            background: '#f1f3f4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      }
    >
      <FullscreenContent />
    </Suspense>
  );
}
