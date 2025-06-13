'use client';

import dynamic from 'next/dynamic';

const TawkToChat = dynamic(() => import('@/components/TawkToChat'), {
  ssr: false,
});

export default function TawkToChatWrapper() {
  return <TawkToChat />;
}
