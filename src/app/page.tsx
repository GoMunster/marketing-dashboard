'use client';

import dynamic from 'next/dynamic'

const MarketingDashboard = dynamic(
  () => import('@/components/dashboard/marketing-dashboard').then(mod => mod.MarketingDashboard),
  { ssr: false }
)

export default function Home() {
  return (
    <main>
      <MarketingDashboard />
    </main>
  )
}
