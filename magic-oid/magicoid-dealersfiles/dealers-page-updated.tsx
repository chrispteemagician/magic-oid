'use client'

import { useState } from 'react'

export default function DealersPage() {
  const [formData, setFormData] = useState({
    dealerName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    city: '',
    country: '',
    socials: '',
    payoutMethod: 'bank',
    agreeQRDisplay: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.agreeQRDisplay) {
      setError('Please agree to display your QR code at events')
      return
    }
    
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/dealers/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      window.location.href = data.url
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Become a Magic-oid Founder Dealer
          </h1>
          <p className="text-2xl text-purple-200 mb-6">
            One membership. Every -Oid. The entire Kudos Family.
          </p>
          
          {/* Tiered Pricing Banner */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 font-bold py-6 px-8 rounded-2xl inline-block mb-4 max-w-3xl">
            <div className="text-3xl mb-2">⏰ FOUNDER TIERS - Limited Spots</div>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/90 rounded-lg p-3">
                <div className="text-sm opacity-75">First 50</div>
                <div className="text-2xl font-black">£97/year</div>
                <div className="text-xs">Ends Jan 31</div>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <div className="text-sm opacity-75">Next 50</div>
                <div className="text-2xl font-black">£174/year</div>
                <div className="text-xs">Through Feb</div>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <div className="text-sm opacity-75">After That</div>
                <div className="text-2xl font-black">£295/year</div>
                <div className="text-xs">Regular price</div>
              </div>
            </div>
          </div>
          
          <p className="text-yellow-300 text-lg font-semibold mb-8">
            🚨 Current tier: £97/year FOREVER • Lock it in before Jan 31st
          </p>
        </div>

        {/* What You Get - Massive Value Prop */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">
            This Isn't Just a Dealer Listing...
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            
            {/* All -Oids */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                🎯 ALL -Oid Apps Pro (Current + Future)
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ <strong>Magic-Oid</strong> - Effect identification</li>
                <li>✓ <strong>Guitar-Oid</strong> - Vintage guitar auth</li>
                <li>✓ <strong>Radi-Oid</strong> - CB/ham radio ID</li>
                <li>✓ <strong>Miniature-Oid</strong> - Dollhouse items</li>
                <li>✓ <strong>Designer-Oid</strong> - Fashion authentication</li>
                <li>✓ <strong>Watch-Oid</strong> - Coming soon</li>
                <li>✓ <strong>Coin-Oid</strong> - Coming soon</li>
                <li>✓ <strong>Cannabin-Oid</strong> - 420 community (coming)</li>
                <li className="text-purple-600 font-semibold">✓ Every future -Oid we launch!</li>
              </ul>
            </div>

            {/* Kudos Family Apps */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-900 mb-3 flex items-center gap-2">
                💚 Kudos Family Apps Pro
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ <strong>SpicyLister</strong> - AI listing generator</li>
                <li>✓ <strong>SpicyLister Store</strong> - Sell your inventory</li>
                <li>✓ <strong>EntertainCMS</strong> - Booking management</li>
                <li>✓ <strong>MeshCB</strong> - CB radio community</li>
                <li>✓ <strong>Van-alyst</strong> - Vehicle inspection</li>
                <li>✓ <strong>SpicyTasker</strong> - ADHD-friendly tasks</li>
                <li>✓ <strong>DnB Santa</strong> - Video service</li>
                <li>✓ <strong>One-click eBay</strong> - Coming soon</li>
              </ul>
            </div>

            {/* Dealer Superpowers */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                🚀 Your Dealer Superpowers
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Custom dealer page with referral link</li>
                <li>✓ QR code for events/conventions</li>
                <li>✓ Earn kudos when magicians find you</li>
                <li>✓ Higher kudos = featured placement</li>
                <li>✓ Track referrals & affiliate income</li>
                <li>✓ Multi-account discounts (coming)</li>
                <li>✓ Weekly "Trick of the Week" spotlight</li>
              </ul>
            </div>

            {/* Community Features */}
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-orange-900 mb-3 flex items-center gap-2">
                🌟 Community & Kudos
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Earn kudos across ALL apps</li>
                <li>✓ Gift coins to community members</li>
                <li>✓ Bridge Walker status (use multiple apps)</li>
                <li>✓ Rollover kudos to help others</li>
                <li>✓ "Pay it forward" culture</li>
                <li>✓ Trust-based reputation system</li>
                <li>✓ Priority support forever</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-6 text-center">
            <p className="text-2xl font-bold mb-2">
              Regular Price After Feb: £295/year or £49.95/month
            </p>
            <p className="text-xl">
              Founder Dealers Pay £97/year FOREVER 🔒
            </p>
          </div>
        </div>

        {/* Three Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🎯</div>
            <p className="text-white font-medium">Help magicians actually find your shop and tricks</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">💰</div>
            <p className="text-white font-medium">Earn kudos and sales when your regulars send friends</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-white font-medium">Carry less stock; let -Oids handle the discovery</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
            Lock In £97/Year FOREVER
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dealer / Shop Name *
                </label>
                <input
                  type="text"
                  name="dealerName"
                  required
                  value={formData.dealerName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Magic Shop Ltd"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="contactName"
                  required
                  value={formData.contactName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="john@magicshop.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="+44 7700 900000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL *
              </label>
              <input
                type="url"
                name="website"
                required
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://magicshop.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Tell magicians what makes your shop special..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="London"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="United Kingdom"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Links (optional)
              </label>
              <textarea
                name="socials"
                value={formData.socials}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Instagram: @magicshop, Facebook: facebook.com/magicshop"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Payout Method *
              </label>
              <select
                name="payoutMethod"
                required
                value={formData.payoutMethod}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="bank">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* QR Display Agreement */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeQRDisplay"
                  checked={formData.agreeQRDisplay}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-purple-600"
                  required
                />
                <div>
                  <p className="font-semibold text-purple-900">
                    I agree to display my Magic-oid QR code *
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    As a £97 Founder Dealer, I'll display my QR code at conventions, events, and in my shop where possible. This builds my kudos score, increases my visibility, and helps me earn affiliate income from scans and referrals.
                  </p>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
            >
              {loading ? 'Processing...' : '🎩 Become a Founder Dealer - £97/year FOREVER'}
            </button>

            <p className="text-center text-sm text-gray-500">
              Secure payment powered by Stripe • 30-day money-back guarantee
            </p>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <a href="/" className="text-purple-200 hover:text-white underline">
            ← Back to Magic-oid
          </a>
        </div>
      </div>
    </div>
  )
}
