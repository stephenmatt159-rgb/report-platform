import { Metadata } from 'next';
import { getTermsOfUseMetadata } from '@/lib/metadata';

export const metadata: Metadata = getTermsOfUseMetadata();

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Top */}
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(/images/bg/section-top.jpg)' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Terms of Use</h1>
            <ul className="flex items-center justify-center space-x-2 text-lg">
              <li>
                <a href="/" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  Home
                </a>
              </li>
              <li className="text-white">/</li>
              <li className="text-white font-semibold">Terms of Use</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Use</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Understand the rules and guidelines for using the ScamReport platform safely and responsibly
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                Last Updated: April 25, 2026
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By accessing and using the ScamReport platform ("the Platform"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this Platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Purpose of the Platform</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  ScamReport is a community-driven platform dedicated to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>Collecting and sharing information about scams and fraudulent activities</li>
                  <li>Educating the public about scam prevention and awareness</li>
                  <li>Providing resources and support for scam victims</li>
                  <li>Fostering a community of individuals committed to online safety</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  As a user of the Platform, you agree to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>Provide accurate and truthful information when submitting reports</li>
                  <li>Report scams in good faith and without malicious intent</li>
                  <li>Respect the privacy and rights of other users</li>
                  <li>Not use the Platform for illegal or harmful purposes</li>
                  <li>Not submit false, misleading, or defamatory information</li>
                  <li>Not attempt to harm, disrupt, or interfere with the Platform's operation</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Content Guidelines</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Users must not post or submit content that:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>Contains false or misleading information</li>
                  <li>Violates any applicable laws or regulations</li>
                  <li>Infringes on the intellectual property rights of others</li>
                  <li>Contains hate speech, harassment, or discriminatory content</li>
                  <li>Includes personal information of individuals without consent</li>
                  <li>Promotes illegal activities or scams</li>
                  <li>Contains malware, viruses, or harmful code</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Report Submission and Verification</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When submitting scam reports:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>You must provide accurate and verifiable information to the best of your knowledge</li>
                  <li>Reports may be subject to review and verification before publication</li>
                  <li>We reserve the right to edit, remove, or reject any report at our discretion</li>
                  <li>Submitted reports become part of our community database</li>
                  <li>You acknowledge that reports may be shared with law enforcement when appropriate</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Disclaimer of Warranties</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Platform is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, including but not limited to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>The accuracy, reliability, or completeness of any information on the Platform</li>
                  <li>The effectiveness of any scam prevention advice or recommendations</li>
                  <li>The security or uninterrupted operation of the Platform</li>
                  <li>The ability to recover losses from scams</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Users are responsible for verifying any information before taking action based on content found on the Platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To the fullest extent permitted by law, ScamReport shall not be liable for:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>Any indirect, incidental, special, or consequential damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Damages resulting from reliance on information provided on the Platform</li>
                  <li>Any actions taken or not taken based on Platform content</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. User Content and Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By submitting content to the Platform, you:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>Grant us a non-exclusive, royalty-free license to use, display, and distribute your content</li>
                  <li>Represent that you have the right to submit such content</li>
                  <li>Agree that we are not responsible for the content you submit</li>
                  <li>Retain ownership of your intellectual property rights</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Privacy and Data Protection</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your use of the Platform is also governed by our Privacy Policy. By using the Platform, you consent to the collection and use of your information as described in our Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Prohibited Activities</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The following activities are strictly prohibited on the Platform:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>Attempting to gain unauthorized access to the Platform or user accounts</li>
                  <li>Using automated tools to scrape or harvest data from the Platform</li>
                  <li>Interfering with the Platform's operation or security features</li>
                  <li>Impersonating other users or entities</li>
                  <li>Engaging in fraudulent or deceptive activities</li>
                  <li>Using the Platform to promote or facilitate scams</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">11. Account Termination</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We reserve the right to suspend or terminate your access to the Platform at any time, with or without cause, including but not limited to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>Violation of these Terms of Use</li>
                  <li>Submission of false or misleading information</li>
                  <li>Engagement in prohibited activities</li>
                  <li>Activity that harms other users or the Platform</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">12. Law Enforcement Cooperation</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We cooperate with law enforcement agencies and regulatory bodies to combat fraud and protect our users. We may disclose user information when required by law or to prevent illegal activities. Users agree to cooperate with legitimate investigations.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">13. Modifications to Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting on the Platform. Your continued use of the Platform after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">14. Governing Law and Dispute Resolution</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms of Use shall be governed by and construed in accordance with the laws of Canada. Any disputes arising from these terms shall be resolved through binding arbitration in accordance with the rules of the Canadian Arbitration Association.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about these Terms of Use, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@scamreport.com</p>
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