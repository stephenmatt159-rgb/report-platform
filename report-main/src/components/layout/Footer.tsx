import Link from 'next/link';

const footerLinks = {
  about: [
    { label: 'About us', href: '/about' },
    { label: 'Exposed Platforms', href: '/exposed-platforms' },
    { label: 'Report a Platform', href: '/contact' },
    { label: 'Scam Types', href: '/scam-types' },
    { label: 'Asked Question', href: '/faq' },
    { label: 'Contact us', href: '/contact' },
  ],
  popularScamTypes: [
    { label: 'Phishing Scams', href: '/scam-types' },
    { label: 'Investment Scams', href: '/scam-types' },
    { label: 'Romance Scams', href: '/scam-types' },
    { label: 'Tech Support Scams', href: '/scam-types' },
    { label: 'Identity Theft', href: '/scam-types' },
    { label: 'Cryptocurrency Scams', href: '/scam-types' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Use', href: '/terms-of-use' },
  ],
};

const socialLinks = [
  { name: 'Twitter', href: '#', icon: '𝕏' },
  { name: 'Facebook', href: '#', icon: 'f' },
  { name: 'Instagram', href: '#', icon: '📷' },
  { name: 'LinkedIn', href: '#', icon: 'in' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-blue-400">
              ScamReport
            </Link>
            <p className="text-gray-400 text-sm">
              Building a safer digital world through community awareness and scam prevention.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About ScamReport</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Scam Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Scam Types</h3>
            <ul className="space-y-2">
              {footerLinks.popularScamTypes.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Contact</h3>
            <ul className="space-y-2 mb-4">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 mt-1">📍</span>
                <p className="text-gray-400 text-sm">
                  2570 Quadra Street Victoria Road, New York, Canada
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📞</span>
                <p className="text-gray-400 text-sm">+88 457 845 695</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📧</span>
                <p className="text-gray-400 text-sm">example@yourmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()}. All Rights Reserved by{' '}
            <a href="https://bestwpware.com/" className="text-blue-400 hover:underline">
              Bestwpware
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}