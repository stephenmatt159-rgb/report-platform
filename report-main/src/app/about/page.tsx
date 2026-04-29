import { Metadata } from 'next';
import { getAboutMetadata } from '@/lib/metadata';

export const metadata: Metadata = getAboutMetadata();

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Top */}
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(/images/bg/section-top.jpg)' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-4">About</h1>
            <ul className="flex items-center justify-center space-x-2 text-lg">
              <li>
                <a href="/" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  Home
                </a>
              </li>
              <li className="text-white">/</li>
              <li className="text-white font-semibold">About</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At ScamReport, we believe that everyone deserves protection from online fraud. Our mission is to create a safer digital world by empowering communities with knowledge, tools, and resources to identify, report, and prevent scams.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We're committed to building a vigilant community where members can share experiences, learn from each other, and work together to stop scammers in their tracks. Together, we can make the internet a safer place for everyone.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {[
            {
              image: '/images/e1.png',
              title: 'Vigilance',
              description: 'We maintain constant awareness of emerging scam patterns and threats to protect our community.'
            },
            {
              image: '/images/e2.png',
              title: 'Transparency',
              description: 'We believe in open sharing of scam information to help everyone stay informed and protected.'
            },
            {
              image: '/images/e3.png',
              title: 'Community',
              description: 'We build a supportive network where members can learn from each other and fight fraud together.'
            }
          ].map((value, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src={value.image}
                alt={value.title}
                className="mx-auto mb-4"
                style={{ height: '48px' }}
              />
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 2020, ScamReport started with a simple idea: create a centralized platform where people could report scams and share their experiences to help others avoid falling victim. What began as a small community of concerned individuals has grown into a powerful network protecting thousands of people worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our team of cybersecurity experts, fraud investigators, and community moderators work tirelessly to verify reports, analyze patterns, and provide actionable intelligence to help our members stay safe. We believe that collective awareness is our strongest defense against online fraud.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we're proud to serve as a trusted resource for scam prevention, offering verified reports, real-time alerts, and educational content that empowers our community to recognize and avoid fraudulent schemes.
              </p>
            </div>
            <div>
              <img
                src="/images/about1.png"
                alt="Building a Safer Digital World"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="bg-cover bg-center rounded-lg shadow-md p-8 text-white"
          style={{ backgroundImage: 'url(/images/bg/video.jpg)' }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '12,000+', label: 'Verified Reports' },
              { value: '50,000+', label: 'Community Members' },
              { value: '500+', label: 'Active Contributors' },
              { value: '100+', label: 'Countries Protected' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'John Smith',
                role: 'CEO & Founder',
                description: 'Cybersecurity expert with 15+ years in fraud prevention',
                image: '/images/team/team1.jpg'
              },
              {
                name: 'Sarah Johnson',
                role: 'Chief Investigator',
                description: 'Former law enforcement specializing in digital fraud',
                image: '/images/team/team2.jpg'
              },
              {
                name: 'Michael Chen',
                role: 'CTO',
                description: 'Technology innovator with passion for online safety',
                image: '/images/team/team3.jpg'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}