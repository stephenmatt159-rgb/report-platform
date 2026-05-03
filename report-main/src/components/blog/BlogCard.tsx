import Link from 'next/link';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <div className="flex items-center space-x-2 text-sm text-gray-800 mb-3">
          <span>{formatDate(post.date)}</span>
          <span>•</span>
          <Link
            href={`/blog?category=${post.category}`}
            className="text-blue-600 hover:underline"
          >
            {post.category}
          </Link>
        </div>

        <h3 className="text-xl font-semibold mb-3 line-clamp-2">
          <Link
            href={`/blog/${post.id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        <p className="text-gray-800 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.id}`}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center space-x-1"
        >
          <span>Read More</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}