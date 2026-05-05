import { ScamCategoryService } from '@/data/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getScamTypeDetailMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const scamType = await ScamCategoryService.getAllScamCategories().then(
    categories => categories.find(cat => cat.id === id)
  );

  if (!scamType) {
    return {};
  }

  return getScamTypeDetailMetadata(scamType.name);
}

export default async function ScamTypeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scamType = await ScamCategoryService.getAllScamCategories().then(
    categories => categories.find(cat => cat.id === id)
  );

  if (!scamType) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/scam-types" className="text-blue-600 hover:underline">
            ← Back to Scam Types
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scam Type Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={scamType.image}
                alt={scamType.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    High Risk
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {scamType.reportCount} Verified Reports
                  </span>
                </div>

                <h1 className="text-3xl font-bold mb-4">{scamType.name}</h1>

                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <span>📋</span>
                    <span>{scamType.reportCount} reports filed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>Active threat</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>🛡️</span>
                    <span>Protect yourself</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What is this scam */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">What is {scamType.name}?</h2>
              <p className="text-gray-600 leading-relaxed">
                {scamType.name} is a type of online fraud that targets unsuspecting individuals through deceptive practices. Scammers use sophisticated techniques to manipulate victims into providing personal information, financial details, or making payments under false pretenses.
              </p>
            </div>

            {/* How it works */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">How it works</h2>
              <ul className="space-y-3">
                {[
                  'Scammers create fake profiles, websites, or communications',
                  'They establish trust through emotional manipulation or false promises',
                  'Victims are pressured into making quick decisions',
                  'Personal or financial information is requested',
                  'Money is transferred or sensitive data is compromised',
                  'Scammers disappear once they achieve their goal'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">⚠️</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning signs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Warning signs to watch for</h2>
              <div className="space-y-4">
                {[
                  { title: 'Urgency', description: 'Requests for immediate action or time-sensitive offers' },
                  { title: 'Too good to be true', description: 'Promises of unrealistic returns or benefits' },
                  { title: 'Requests for personal info', description: 'Asking for sensitive data unnecessarily' },
                  { title: 'Poor communication', description: 'Grammatical errors or unprofessional language' },
                  { title: 'Unusual payment methods', description: 'Requests for wire transfers, gift cards, or cryptocurrency' }
                ].map((sign, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-red-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🚨</span>
                      <div>
                        <h3 className="font-medium">{sign.title}</h3>
                        <p className="text-sm text-gray-600">{sign.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to protect yourself */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">How to protect yourself</h2>
              <ul className="space-y-3">
                {[
                  'Verify the identity of anyone requesting money or personal information',
                  'Never share sensitive data through unsolicited communications',
                  'Research organizations and individuals before engaging',
                  'Use secure payment methods and avoid wire transfers',
                  'Trust your instincts - if something feels wrong, it probably is',
                  'Report suspicious activity to authorities and our platform'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="font-bold mb-4 text-lg">Take Action</h3>

              <button className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors mb-4">
                Report This Scam
              </button>

              <button className="w-full py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors mb-6">
                Share This Information
              </button>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Level</span>
                  <span className="font-medium text-red-600">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reports</span>
                  <span className="font-medium">{scamType.reportCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-orange-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">Today</span>
                </div>
              </div>
            </div>

            {/* Related Resources */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold mb-4">Related Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/report" className="text-blue-600 hover:underline text-sm">
                    → View Related Reports
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-blue-600 hover:underline text-sm">
                    → Learn About Our Platform
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline text-sm">
                    → Official Safety Guidelines
                  </a>
                </li>
              </ul>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-bold mb-2 text-red-800">Emergency Help</h3>
              <p className="text-sm text-red-700 mb-3">
                If you've been a victim of this scam, act immediately:
              </p>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Contact your bank</li>
                <li>• Report to authorities</li>
                <li>• Change your passwords</li>
                <li>• Monitor your accounts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}