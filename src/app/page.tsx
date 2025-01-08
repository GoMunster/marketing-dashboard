'use client';

import dynamic from 'next/dynamic';

const DashboardComponent = dynamic(
  () => import('@/components/dashboard/marketing-dashboard'),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <DashboardComponent />
    </main>
  );
}
