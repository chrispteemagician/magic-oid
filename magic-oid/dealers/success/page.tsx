import { Suspense } from 'react'
import DealerSuccessContent from './DealerSuccessContent'

export default function DealerSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-purple-900 text-white">Loading...</div>}>
      <DealerSuccessContent />
    </Suspense>
  )
}
