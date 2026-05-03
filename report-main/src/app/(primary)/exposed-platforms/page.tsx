import { FakeInvestmentPlatformService } from '@/data/mockData';
import FakeInvestmentPlatformCard from '@/components/scam/FakeInvestmentPlatformCard';
import { Metadata } from 'next';
import { getExposedPlatformsMetadata } from '@/lib/metadata';

export const metadata: Metadata = getExposedPlatformsMetadata();

export default async function FakeInvestmentPlatformsPage() {
  const platforms = await FakeInvestmentPlatformService.getAllFakeInvestmentPlatforms();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Top */}
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(/images/bg/section-top.jpg)' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Fake Investment Platforms Exposed</h1>
            <ul className="flex items-center justify-center space-x-2 text-lg">
              <li>
                <a href="/" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  Home
                </a>
              </li>
              <li className="text-white">/</li>
              <li className="text-white font-semibold">Exposed Platforms</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Recent Fake Investment Platforms</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed about the latest fraudulent investment platforms. We expose scams to protect our community from financial losses.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">⚠️</div>
            <div>
              <h3 className="text-xl font-bold text-red-800 mb-2">Warning: These Platforms Are Fraudulent</h3>
              <p className="text-red-700">
                The platforms listed below have been identified as fraudulent investment schemes. Do not send money or provide personal information to any of these services. If you have been affected, please report immediately to authorities and our platform.
              </p>
            </div>
          </div>
        </div>

        {/* Platform Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {platforms.map((platform) => (
            <FakeInvestmentPlatformCard key={platform.id} platform={platform} />
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Impact of Exposed Scams</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '$67.6M', label: 'Total Losses Prevented', icon: '💰' },
              { value: '14,050+', label: 'Potential Victims Protected', icon: '👥' },
              { value: '6', label: 'Platforms Exposed', icon: '🚨' },
              { value: '100%', label: 'Verification Rate', icon: '✓' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-red-600 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How We Identify Scams */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">How We Identify Fake Platforms</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔍',
                title: 'Community Reports',
                description: 'We analyze reports from our community members to identify suspicious patterns and behaviors.'
              },
              {
                icon: '📊',
                title: 'Data Analysis',
                description: 'Our team uses advanced analytics to detect unrealistic promises and fraudulent business models.'
              },
              {
                icon: '🤝',
                title: 'Authority Collaboration',
                description: 'We work with financial authorities and regulatory bodies to verify and expose scams.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Report a Platform CTA */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-md p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Know About a Fake Platform?</h2>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Help protect others by reporting suspicious investment platforms. Our team will investigate and expose fraudulent schemes to prevent further victims.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Report a Platform
          </a>
        </div>
      </div>
    </div>
  );
}