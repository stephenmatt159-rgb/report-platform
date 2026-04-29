import { ScamReportService, ContributorService, SuccessStoryService, AwarenessArticleService, ScamCategoryService, PlatformStatService } from '@/data/mockData';
import ReportCard from '@/components/scam/ReportCard';
import ContributorCard from '@/components/contributor/ContributorCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import BlogCard from '@/components/blog/BlogCard';
import CounterSection from '@/components/home/CounterSection';
import { Metadata } from 'next';
import { getHomeMetadata } from '@/lib/metadata';

export const metadata: Metadata = getHomeMetadata();

export default async function Home() {
  const [scamReports, contributors, successStories, awarenessArticles, scamCategories, platformStats] = await Promise.all([
    ScamReportService.getAllScamReports(),
    ContributorService.getAllContributors(),
    SuccessStoryService.getAllSuccessStories(),
    AwarenessArticleService.getAllAwarenessArticles(),
    ScamCategoryService.getAllScamCategories(),
    PlatformStatService.getAllPlatformStats()
  ]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white py-20 lg:py-32"
        style={{ backgroundImage: 'url(/images/bg/home-bg.jpg)' }}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold">
                <span className="text-yellow-400">ScamReport</span>
                <br />
                Where Awareness Meets Action
              </h1>
              <p className="text-lg text-black">
                Join our community to report, track, and prevent scams. Together we can build a safer digital world for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search scam reports here"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg bg-yellow-500 transition-colors">
                  Search
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/home-img2.png"
                alt="Hero illustration"
                className="w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">👤</span>
                  <div>
                    <div className="text-2xl font-bold">4500+</div>
                    <div className="text-sm text-gray-600">Active reporters</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counters Section */}
      <CounterSection stats={platformStats} />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Start your journey With us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a brand new approach to scam prevention and awareness. Join our community to protect yourself and others from online fraud.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '01', title: 'Expert Investigators', description: 'Lorem ipsum dolor sit amet, consectetur notted adipisicing elit ut labore.' },
              { number: '02', title: 'Quality Reports', description: 'Lorem ipsum dolor sit amet, consectetur notted adipisicing elit ut labore.' },
              { number: '03', title: 'Real-Time Alerts', description: 'Lorem ipsum dolor sit amet, consectetur notted adipisicing elit ut labore.' },
              { number: '04', title: 'Community Support', description: 'Lorem ipsum dolor sit amet, consectetur notted adipisicing elit ut labore.' }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={`/images/e${index + 1}.png`}
                  alt={feature.title}
                  className="mb-4"
                  style={{ height: '48px' }}
                />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/about1.png"
                alt="Quality Reports"
                className="w-full"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                We Are Building A Safer Digital World Together
              </h2>
              <p className="text-gray-600">
                We offer a brand new approach to scam prevention and awareness. Join our community to protect yourself and others from online fraud.
              </p>
              <ul className="space-y-3">
                {[
                  'Get access to 12,000+ verified scam reports',
                  'Popular scam types to watch for in our community',
                  'Find the right resources for protection'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/report"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Reports →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Find out by popular Scam Types</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a brand new approach to scam prevention and awareness. Choose from a wide range of scam types and learn how to protect yourself!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {scamCategories.slice(0, 10).map((category) => (
              <a
                key={category.id}
                href={`/report?category=${category.name}`}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
              >
                <div className="text-3xl mb-2">📚</div>
                <div className="font-medium group-hover:text-blue-600 transition-colors">
                  {category.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Scam Reports Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                Join with more than <span className="text-blue-600">80,000+</span> Verified Reports & Community Contributors.
              </h2>
            </div>
            <a
              href="/report"
              className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View all Reports →
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scamReports.slice(0, 6).map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold">
              Trusted by <span className="text-blue-600">86,000+</span> organizations worldwide
            </h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-32 h-16">
                <img
                  src={`/images/clients/${i}.png`}
                  alt={`Partner ${i}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            className="relative bg-cover bg-center rounded-lg overflow-hidden"
            style={{ backgroundImage: 'url(/images/bg/video.jpg)' }}
          >
            <div className="aspect-video flex items-center justify-center">
              <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors shadow-lg">
                <span className="text-4xl ml-1">▶</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet Our Contributors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a brand new approach to scam prevention and awareness. Join our community of dedicated contributors making a difference!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contributors.map((contributor) => (
              <ContributorCard key={contributor.id} contributor={contributor} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Why Choose Our Scam Reporting Platform
              </h2>
              <p className="text-gray-600">
                We offer a brand new approach to scam prevention and awareness. Join our community to protect yourself and others from online fraud.
              </p>
              <ul className="space-y-3">
                {[
                  'Get access to 12,000+ verified scam reports',
                  'Popular scam types to watch for in our community',
                  'Find the right resources for protection'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/report"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Join Community →
              </a>
            </div>
            <div className="relative">
              <img
                src="/images/about3.png"
                alt="Achieve Your Goals"
                className="w-full"
              />
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📚</span>
                  <div>
                    <div className="text-2xl font-bold">3300+</div>
                    <div className="text-sm text-gray-600">Verified Reports</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Community Success Stories
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <TestimonialCard key={story.id} testimonial={story} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Latest Scam Awareness Articles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a brand new approach to scam prevention and awareness. Stay informed with our latest articles and guides!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awarenessArticles.map((article) => (
              <BlogCard key={article.id} post={article} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}