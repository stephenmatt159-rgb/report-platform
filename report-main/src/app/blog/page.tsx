import { BlogService } from '@/data/mockData';
import BlogCard from '@/components/blog/BlogCard';
import { Metadata } from 'next';
import { getBlogMetadata } from '@/lib/metadata';

export const metadata: Metadata = getBlogMetadata();

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const blogPosts = await BlogService.getAllBlogPosts();

  // Filter posts based on category
  let filteredPosts = blogPosts;

  if (resolvedSearchParams.category) {
    filteredPosts = blogPosts.filter(
      post => post.category.toLowerCase() === resolvedSearchParams.category!.toLowerCase()
    );
  }

  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Top */}
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(/images/bg/section-top.jpg)' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Scam Awareness</h1>
            <ul className="flex items-center justify-center space-x-2 text-lg">
              <li>
                <a href="/" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  Home
                </a>
              </li>
              <li className="text-white">/</li>
              <li className="text-white font-semibold">Scam Awareness</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Scam Awareness Articles</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest scam prevention tips, warning signs, and protective measures to keep yourself safe online
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <a
            href="/blog"
            className={`px-4 py-2 rounded-lg transition-colors ${
              !resolvedSearchParams.category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Posts
          </a>
          {categories.map((category) => (
            <a
              key={category}
              href={`/blog?category=${category}`}
              className={`px-4 py-2 rounded-lg transition-colors ${
                resolvedSearchParams.category === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </a>
          ))}
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-gray-600">
              Try selecting a different category
            </p>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md p-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get Scam Alerts & Safety Tips</h2>
            <p className="text-blue-100 mb-6">
              Subscribe to receive the latest scam warnings, prevention tips, and safety guides directly to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Stay Protected
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}