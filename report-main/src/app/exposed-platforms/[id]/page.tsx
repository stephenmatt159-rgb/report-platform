import { FakeInvestmentPlatformService } from '@/data/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getExposedPlatformDetailMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const platform = await FakeInvestmentPlatformService.getFakeInvestmentPlatformById(id);

  if (!platform) {
    return {};
  }

  return getExposedPlatformDetailMetadata(platform.name);
}

export default async function FakeInvestmentPlatformDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const platform = await FakeInvestmentPlatformService.getFakeInvestmentPlatformById(id);

  if (!platform) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-red-600';
      case 'Shut Down':
        return 'bg-green-600';
      case 'Under Investigation':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/exposed-platforms" className="text-blue-600 hover:underline">
            ← Back to Exposed Platforms
          </Link>
        </div>

        {/* Platform Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative">
            <img
              src={platform.image}
              alt={platform.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`${getStatusColor(platform.status)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                  {platform.status}
                </span>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  ⚠️ FRAUDULENT
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white">{platform.name}</h1>
              <p className="text-gray-200">{platform.type}</p>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">🚨</div>
            <div>
              <h3 className="text-xl font-bold text-red-800 mb-2">This Platform Has Been Identified as Fraudulent</h3>
              <p className="text-red-700">
                {platform.name} is a confirmed scam platform. Do not send money or provide personal information. If you have been affected, contact your bank immediately and file a report with authorities.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Impact of This Scam</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-1">{platform.estimatedLosses}</div>
              <div className="text-sm text-gray-600">Total Losses</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-1">{platform.victimCount}</div>
              <div className="text-sm text-gray-600">Victims Affected</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-1">{new Date(platform.dateExposed).toLocaleDateString()}</div>
              <div className="text-sm text-gray-600">Date Exposed</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-1">{platform.reportedBy}</div>
              <div className="text-sm text-gray-600">Reported By</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">How This Scam Works</h2>
          <p className="text-gray-600 leading-relaxed">
            {platform.description}
          </p>
        </div>

        {/* Warning Signs */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Warning Signs to Watch For</h2>
          <div className="space-y-3">
            {platform.warningSigns.map((sign, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                <span className="text-red-600 text-xl mt-1">⚠️</span>
                <span className="text-gray-700">{sign}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence */}
        {platform.evidence && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Evidence & Investigation</h2>
            <p className="text-gray-600 leading-relaxed">
              {platform.evidence}
            </p>
          </div>
        )}

        {/* What to Do If You're Affected */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">What to Do If You've Been Affected</h2>
          <div className="space-y-4">
            {[
              'Contact your bank immediately to freeze accounts and stop transactions',
              'File a police report and obtain a case number',
              'Report to financial regulatory authorities in your country',
              'Change all passwords and secure your online accounts',
              'Monitor your credit report for suspicious activity',
              'Document all communications and transactions with the platform',
              'Be wary of "recovery services" that demand upfront fees - these are often additional scams'
            ].map((action, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-gray-700">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Report Similar Scams */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-md p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Know About Similar Scams?</h2>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Help protect others by reporting similar fraudulent platforms. Your report could prevent someone else from becoming a victim.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Report a Platform
            </a>
            <a
              href="/scam-types"
              className="px-8 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 transition-colors"
            >
              Learn About Scams
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}