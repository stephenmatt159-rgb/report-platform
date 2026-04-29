import Link from 'next/link';
import { Course } from '@/types';
import { formatPrice, generateStars } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {course.category}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-1 mb-3">
          {generateStars(course.rating)}
        </div>

        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          <Link
            href={`/course/${course.id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {course.title}
          </Link>
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <span>📚</span>
            <span>{course.totalCourses} Course</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>⏱️</span>
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-blue-600">
            {formatPrice(course.price, course.isFree)}
          </div>
          <Link
            href={`/course/${course.id}`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}