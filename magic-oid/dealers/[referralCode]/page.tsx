import { notFound } from 'next/navigation'

// This would query your database
async function getDealerByCode(code: string) {
  // TODO: Implement database query
  // const dealer = await db.dealers.findOne({ referralCode: code })
  // For now, return mock data for testing
  return null
}

export default async function DealerProfilePage({ params }: { params: { referralCode: string } }) {
  const dealer = await getDealerByCode(params.referralCode)

  if (!dealer) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Dealer Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-purple-900 mb-2">
                {dealer.dealerName}
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <span>📍</span>
                {dealer.city}, {dealer.country}
              </p>
            </div>
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-full px-4 py-2">
              <span className="text-yellow-800 font-bold">⭐ {dealer.kudos} Kudos</span>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{dealer.description}</p>

          <div className="flex gap-4 flex-wrap">
            {dealer.website && (
              <a href={dealer.website} target="_blank" rel="noopener"
                 className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                🌐 Visit Website
              </a>
            )}
            <div className="bg-purple-100 text-purple-900 px-4 py-2 rounded-lg font-medium">
              🎩 Magic-oid Bridgewalker
