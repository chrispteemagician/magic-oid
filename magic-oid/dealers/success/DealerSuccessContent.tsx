'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function DealerSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  
  const [dealerData, setDealerData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (sessionId) {
      processDealerSignup()
    }
  }, [sessionId])

  const processDealerSignup = async () => {
    try {
      const response = await fetch('/api/dealers/process-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process signup')
      }

      setDealerData(data.dealer)
      setLoading(false)

    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const downloadQR = () => {
    const link = document.createElement('a')
    link.href = dealerData.qrImageDataUrl
    link.download = `magic-oid-qr-${dealerData.dealerName.replace(/\s/g, '-')}.png`
    link.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🪄</div>
          <p className="text-white text-xl">Creating your dealer profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <a href="/dealers" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">
              Back to Dealers
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-4">🎩✨</div>
          <h1 className="text-4xl font-bold text-white mb-4">
            You're in! Welcome as a Founder Dealer / Bridgewalker
          </h1>
          <p className="text-purple-200 text-lg">
            Your Magic-oid dealer profile is now live
          </p>
        </div>

        {/* Dealer Info Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Your Dealer Details</h2>
          
          <div className="space-y-4 mb-8">
            <div>
              <label className="text-sm font-semibold text-gray-600">Dealer Page</label>
              <a href={dealerData.pageUrl} target="_blank" rel="noopener" 
                 className="block text-purple-600 hover:text-purple-800 font-medium break-all">
                {dealerData.pageUrl}
              </a>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-600">Your Referral Link</label>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3 font-mono text-sm break-all">
                {dealerData.referralUrl}
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="border-t pt-8">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Your QR Code</h3>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-white p-4 rounded-lg border-4 border-purple-200">
                <img src={dealerData.qrImageDataUrl} alt="QR Code" className="w-64 h-64" />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-4">
                  Print this QR code and display it at your shop counter or till. 
                  When customers scan it, they'll visit your dealer page and you'll earn kudos!
                </p>
                <button
                  onClick={downloadQR}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  📥 Download QR Code
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Your Next Steps</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Share your unique link</h3>
                <p className="text-gray-700">
                  Drop your referral link in social bios, newsletters, and at checkout. 
                  Every magician who signs up through you boosts your kudos.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Display your QR code</h3>
                <p className="text-gray-700">
                  Print and stick your QR by the till or counter so regulars can scan and find you on Magic-oid instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Feature your weekly trick & deal</h3>
                <p className="text-gray-700">
                  Check your email for login instructions to update your Trick of the Week and Special Deal. 
                  High-kudos dealers get featured placement in search.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <a href={dealerData.pageUrl} target="_blank" rel="noopener"
             className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition">
            View Your Dealer Page
          </a>
          <a href="/"
             className="bg-white hover:bg-gray-100 text-purple-900 font-bold py-3 px-8 rounded-lg transition border-2 border-purple-600">
            Back to Magic-oid
          </a>
        </div>
      </div>
    </div>
  )
}
