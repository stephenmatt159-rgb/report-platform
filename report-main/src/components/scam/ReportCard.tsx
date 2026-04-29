import Link from 'next/link';
import { ScamReport } from '@/types';
import { generateStars } from '@/lib/utils';

interface ReportCardProps {
  report: ScamReport;
}

export default function ReportCard({ report }: ReportCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-600';
      case 'High':
        return 'bg-orange-600';
      case 'Medium':
        return 'bg-yellow-600';
      case 'Low':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-600';
      case 'High':
        return 'text-orange-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={report.image}
          alt={report.title}
          className="w-full h-48 object-cover"
        />
        <span className={`absolute top-4 left-4 ${getSeverityColor(report.severity)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
          {report.severity}
        </span>
        <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {report.status}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-1 mb-3">
          {generateStars(5)}
        </div>

        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          <Link
            href={`/report/${report.id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {report.title}
          </Link>
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <span>📋</span>
            <span>{report.category}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>👥</span>
            <span>{report.affectedCount} affected</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className={`text-lg font-bold ${getSeverityTextColor(report.severity)}`}>
            {report.severity}
          </div>
          <Link
            href={`/report/${report.id}`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Read Full Report →
          </Link>
        </div>
      </div>
    </div>
  );
}
