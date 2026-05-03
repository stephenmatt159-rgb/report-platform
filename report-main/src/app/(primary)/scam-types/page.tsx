import { ScamCategoryService } from '@/data/mockData';
import ScamTypeCard from '@/components/scam/ScamTypeCard';
import { Metadata } from 'next';
import { getScamTypesMetadata } from '@/lib/metadata';

export const metadata: Metadata = getScamTypesMetadata();

export default async function ScamTypesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const scamTypes = await ScamCategoryService.getAllScamCategories();

  // Filter scam types based on search params
  let filteredScamTypes = scamTypes;

  if (resolvedSearchParams.search) {
    const searchLower = resolvedSearchParams.search!.toLowerCase();
    filteredScamTypes = filteredScamTypes.filter(
      scamType => scamType.name.toLowerCase().includes(searchLower)
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Top */}
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: 'url(/images/bg/section-top.jpg)' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Scam Types</h1>
            <ul className="flex items-center justify-center space-x-2 text-lg">
              <li>
                <a href="/" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  Home
                </a>
              </li>
              <li className="text-white">/</li>
              <li className="text-white font-semibold">Scam Types</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Different Types of Scams</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn about various scam types to protect yourself and your loved ones from online fraud
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-center">
          <form className="flex-1 max-w-md">
            <input
              type="text"
              name="search"
              placeholder="Search scam types..."
              defaultValue={resolvedSearchParams.search}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        </div>

        {/* Scam Types Grid */}
        {filteredScamTypes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredScamTypes.map((scamType) => (
              <ScamTypeCard key={scamType.id} scamType={scamType} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No scam types found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}