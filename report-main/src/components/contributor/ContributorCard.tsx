import Link from 'next/link';
import { Contributor } from '@/types';

interface ContributorCardProps {
  contributor: Contributor;
}

export default function ContributorCard({ contributor }: ContributorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={contributor.image}
          alt={contributor.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-bold">{contributor.name}</h3>
          <p className="text-gray-300 text-sm">{contributor.role}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-gray-800 mb-4">
          <div className="flex items-center space-x-1">
            <span>📋</span>
            <span>{contributor.reportsFiled} Reports</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>⚠️</span>
            <span>{contributor.warningsIssued} Warnings</span>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          {contributor.socialLinks.twitter && (
            <a
              href={contributor.socialLinks.twitter}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <span className="text-xs">𝕏</span>
            </a>
          )}
          {contributor.socialLinks.facebook && (
            <a
              href={contributor.socialLinks.facebook}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <span className="text-xs">f</span>
            </a>
          )}
          {contributor.socialLinks.linkedin && (
            <a
              href={contributor.socialLinks.linkedin}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <span className="text-xs">in</span>
            </a>
          )}
        </div>

        <Link
          href={`/contributor/${contributor.id}`}
          className="block w-full py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          View Contributions
        </Link>
      </div>
    </div>
  );
}
