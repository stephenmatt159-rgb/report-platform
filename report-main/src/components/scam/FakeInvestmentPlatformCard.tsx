import Link from 'next/link';
import { FakeInvestmentPlatform } from '@/types';

interface FakeInvestmentPlatformCardProps {
  platform: FakeInvestmentPlatform;
}

export default function FakeInvestmentPlatformCard({ platform }: FakeInvestmentPlatformCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-red-600';
      case 'Shut Down':
        return 'bg-green-600';
      case 'Under Investigation':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={platform.image}
          alt={platform.name}
          className="w-full h-48 object-cover"
        />
        <span className={`absolute top-4 left-4 ${getStatusColor(platform.status)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
          {platform.status}
        </span>
        <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          ⚠️ SCAM ALERT
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-1">
            <span>📅</span>
            <span>Exposed: {new Date(platform.dateExposed).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>💰</span>
            <span>{platform.estimatedLosses} lost</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          <Link
            href={`/exposed-platforms/${platform.id}`}
            className="hover:text-red-600 transition-colors"
          >
            {platform.name}
          </Link>
        </h3>

        <p className="text-sm text-gray-500 mb-3">{platform.type}</p>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {platform.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="text-red-600 font-medium">{platform.victimCount}</span> victims affected
          </div>
          <Link
            href={`/exposed-platforms/${platform.id}`}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Full Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
