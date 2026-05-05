import { mockFAQs } from '@/data/mockData';
import { Metadata } from 'next';
import { getFaqMetadata } from '@/lib/metadata';

export const metadata: Metadata = getFaqMetadata();

export default function FAQPage() {
  const categories = Array.from(new Set(mockFAQs.map(faq => faq.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Top */}
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(/images/bg/section-top.jpg)' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Faq</h1>
            <ul className="flex items-center justify-center space-x-2 text-lg">
              <li>
                <a href="/" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  Home
                </a>
              </li>
              <li className="text-white">/</li>
              <li className="text-white font-semibold">Faq</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about scam reporting, prevention, and recovery
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-6">{category}</h2>
              <div className="space-y-4">
                {mockFAQs
                  .filter(faq => faq.category === category)
                  .map((faq) => (
                    <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <details className="group">
                        <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                          <h3 className="font-semibold text-lg">{faq.question}</h3>
                          <span className="text-2xl text-gray-400 group-open:rotate-45 transition-transform">
                            +
                          </span>
                        </summary>
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </details>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '🚨',
              title: 'Report a Scam',
              description: 'Submit a detailed report about a scam you encountered',
              action: 'File Report'
            },
            {
              icon: '📧',
              title: 'Email Support',
              description: 'Get help from our scam prevention experts',
              action: 'Contact Us'
            },
            {
              icon: '📚',
              title: 'Safety Guides',
              description: 'Browse our comprehensive scam prevention resources',
              action: 'Explore'
            }
          ].map((help, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">{help.icon}</div>
              <h3 className="text-xl font-bold mb-2">{help.title}</h3>
              <p className="text-gray-600 mb-4">{help.description}</p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {help.action}
              </button>
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our scam prevention experts are here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/scam-types"
              className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors"
            >
              Learn About Scams
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}