import Link from 'next/link';
import { ScamCategory } from '@/types';

interface ScamTypeCardProps {
  scamType: ScamCategory;
}

export default function ScamTypeCard({ scamType }: ScamTypeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={scamType.image}
          alt={scamType.name}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {scamType.reportCount} Reports
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          <Link
            href={`/scam-types/${scamType.id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {scamType.name}
          </Link>
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-800 mb-4">
          <div className="flex items-center space-x-1">
            <span>📋</span>
            <span>{scamType.reportCount} Verified Reports</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>⚠️</span>
            <span>High Risk</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-800">
            Learn about this scam type
          </div>
          <Link
            href={`/scam-types/${scamType.id}`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
}
