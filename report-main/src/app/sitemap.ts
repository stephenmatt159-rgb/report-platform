import { MetadataRoute } from 'next';
import { routes } from '@/lib/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://scamreport.com'; // Replace with your actual domain

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl + routes.home(),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: baseUrl + routes.about(),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: baseUrl + routes.contact(),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: baseUrl + routes.faq(),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: baseUrl + routes.scamTypes(),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: baseUrl + routes.scamAwareness(),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: baseUrl + routes.exposedPlatforms(),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Dynamic routes for scam types
  const scamTypeIds = ['phishing', 'investment', 'romance', 'tech-support', 'identity-theft', 'online-shopping', 'cryptocurrency', 'banking', 'employment', 'government-impersonation'];
  const scamTypeRoutes = scamTypeIds.map((id) => ({
    url: baseUrl + routes.scamTypeDetail(id),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic routes for blog posts
  const blogPostIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const blogRoutes = blogPostIds.map((id) => ({
    url: baseUrl + routes.scamAwarenessArticle(id),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Dynamic routes for exposed platforms
  const platformIds = ['1', '2', '3', '4', '5', '6'];
  const platformRoutes = platformIds.map((id) => ({
    url: baseUrl + routes.exposedPlatformDetail(id),
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...scamTypeRoutes, ...blogRoutes, ...platformRoutes];
}