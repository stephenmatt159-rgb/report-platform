import Link from 'next/link';
import { Instructor } from '@/types';

interface InstructorCardProps {
  instructor: Instructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={instructor.image}
          alt={instructor.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-bold">{instructor.name}</h3>
          <p className="text-gray-300 text-sm">{instructor.role}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <span>📁</span>
            <span>{instructor.totalCourses} Course</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>👤</span>
            <span>{instructor.totalStudents} Student</span>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          {instructor.socialLinks.twitter && (
            <a
              href={instructor.socialLinks.twitter}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <span className="text-xs">𝕏</span>
            </a>
          )}
          {instructor.socialLinks.facebook && (
            <a
              href={instructor.socialLinks.facebook}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <span className="text-xs">f</span>
            </a>
          )}
          {instructor.socialLinks.linkedin && (
            <a
              href={instructor.socialLinks.linkedin}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <span className="text-xs">in</span>
            </a>
          )}
        </div>

        <Link
          href={`/instructor/${instructor.id}`}
          className="block w-full py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}