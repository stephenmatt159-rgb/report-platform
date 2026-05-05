import Link from 'next/link';
import { Metadata } from 'next';
import { getThankYouMetadata } from '@/lib/metadata';

export const metadata: Metadata = getThankYouMetadata();

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <span className="text-6xl">✓</span>
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your submission has been received successfully. We'll get back to you as soon as possible.
          </p>

          {/* What Happens Next */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-left">
            <h2 className="text-2xl font-bold mb-6">What happens next?</h2>
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Confirmation Email',
                  description: 'You will receive a confirmation email with your submission details.'
                },
                {
                  step: '2',
                  title: 'Review Process',
                  description: 'Our team will review your submission within 24-48 hours.'
                },
                {
                  step: '3',
                  title: 'Response',
                  description: 'We will contact you with the next steps or answer your questions.'
                }
              ].map((item) => (
                <div key={item.step} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Link
              href="/"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">🏠</div>
              <div className="font-semibold">Home</div>
            </Link>
            <Link
              href="/scam-types"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">📚</div>
              <div className="font-semibold">Browse Scam Types</div>
            </Link>
            <Link
              href="/contact"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">💬</div>
              <div className="font-semibold">Contact Us</div>
            </Link>
          </div>

          {/* Need Help */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold mb-2">Need immediate help?</h3>
            <p className="text-gray-600 mb-4">
              Our support team is available 24/7 to assist you with any questions.
            </p>
            <a
              href="mailto:support@eduleb.com"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}