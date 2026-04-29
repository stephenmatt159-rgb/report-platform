import { BlogService } from '@/data/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import { getBlogPostMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await BlogService.getBlogPostById(id);

  if (!post) {
    return {};
  }

  return getBlogPostMetadata(post.title, post.excerpt);
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await BlogService.getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to Scam Awareness
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Header Image */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Meta Information */}
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <Link
                href={`/blog?category=${post.category}`}
                className="text-blue-600 hover:underline"
              >
                {post.category}
              </Link>
              {post.author && (
                <>
                  <span>•</span>
                  <span>By {post.author}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content ? (
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>
              ) : (
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <h2>Key Points</h2>
                  <ul>
                    <li>First important point about the topic</li>
                    <li>Second key insight to consider</li>
                    <li>Third crucial aspect to understand</li>
                  </ul>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <h2>Conclusion</h2>
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['Scam Prevention', 'Online Safety', 'Fraud Awareness', 'Consumer Protection'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-semibold mb-4">Share this article</h3>
              <div className="flex space-x-2">
                <button className="w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  <span>f</span>
                </button>
                <button className="w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                  <span>𝕏</span>
                </button>
                <button className="w-10 h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
                  <span>in</span>
                </button>
                <button className="w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                  <span>📧</span>
                </button>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          {post.author && (
            <div className="bg-white rounded-lg shadow-md p-8 mt-8">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{post.author}</h3>
                  <p className="text-gray-600 text-sm mb-2">Scam Prevention Expert</p>
                  <p className="text-gray-600 text-sm">
                    Dedicated to educating the public about online scams and helping people protect themselves from fraud.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Related Posts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Safety Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'How to Spot Fake Websites', date: 'May 15, 2024', desc: 'Learn the telltale signs of fraudulent websites and how to verify their authenticity.' },
                { title: 'Protecting Your Financial Information', date: 'May 18, 2024', desc: 'Essential steps to safeguard your banking and financial data from online thieves.' }
              ].map((article, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 bg-gradient-to-br from-red-100 to-orange-200"></div>
                  <div className="p-4">
                    <div className="text-sm text-gray-600 mb-2">{article.date}</div>
                    <h3 className="font-semibold mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {article.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}