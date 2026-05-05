import { Metadata } from 'next';
import { getPrivacyPolicyMetadata } from '@/lib/metadata';

export const metadata: Metadata = getPrivacyPolicyMetadata();

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Top */}
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(/images/bg/section-top.jpg)' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <ul className="flex items-center justify-center space-x-2 text-lg">
              <li>
                <a href="/" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  Home
                </a>
              </li>
              <li className="text-white">/</li>
              <li className="text-white font-semibold">Privacy Policy</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn how we collect, use, and protect your personal information on the ScamReport platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                Last Updated: April 25, 2026
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  ScamReport ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our scam reporting community platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>

                <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide to Us</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect information you provide directly to us when you:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>Create an account on our platform</li>
                  <li>Submit scam reports or complaints</li>
                  <li>Participate in community discussions</li>
                  <li>Contact us for support or inquiries</li>
                  <li>Subscribe to our newsletters or alerts</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This information may include your name, email address, phone number, username, and any content you submit to the platform.
                </p>

                <h3 className="text-xl font-semibold mb-3">2.2 Information Automatically Collected</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We automatically collect certain information when you visit our platform, including:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Referring website and pages viewed</li>
                  <li>Time and date of your visit</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the information we collect for various purposes, including to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and verify scam reports</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues and fraud</li>
                  <li>Comply with legal obligations and cooperate with law enforcement</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li><strong>With Law Enforcement:</strong> We may disclose information to cooperate with investigations, prevent fraud, or protect our users' rights and safety.</li>
                  <li><strong>With Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf.</li>
                  <li><strong>For Legal Requirements:</strong> We may disclose information when required by law or to protect our rights and property.</li>
                  <li><strong>With Your Consent:</strong> We may share information with your consent for any other purpose.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Your Privacy Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>The right to access and obtain a copy of your personal information</li>
                  <li>The right to request correction of your personal information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to object to processing of your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To exercise these rights, please contact us at privacy@scamreport.com.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our platform is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our platform, you consent to such transfers.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@scamreport.com</p>
                  <p className="text-gray-700 mb-2"><strong>Address:</strong> 2570 Quadra Street Victoria Road, New York, Canada</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +88 457 845 695</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}