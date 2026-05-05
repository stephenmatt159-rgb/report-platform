// Main pages
const home = () => '/';
const about = () => '/about';
const contact = () => '/contact';
const faq = () => '/faq';
const thankYou = () => '/thank-you';
const privacyPolicy = () => '/privacy-policy';
const termsOfUse = () => '/terms-of-use';

// Authentication pages
const signIn = () => '/signin';
const signUp = () => '/signup';

// Scam Types pages
const scamTypes = () => '/scam-types';
const scamTypeDetail = (id: string) => `/scam-types/${id}`;

// Scam Awareness (Blog) pages
const scamAwareness = () => '/blog';
const scamAwarenessArticle = (id: string) => `/blog/${id}`;

// Exposed Platforms pages
const exposedPlatforms = () => '/exposed-platforms';
const exposedPlatformDetail = (id: string) => `/exposed-platforms/${id}`;

const access = () => '/access';
const login = () => '/login';

const dashboard = () => '/dashboard';

// dashboard pages
const dashboardOverview = () => `${dashboard()}/overview`;
const people = () => `${dashboard()}/people`;
const peopleDetails = (id: string | number = ':id') => `${people()}/${id}`;
const dashboardAnalytics = () => `${dashboard()}/analytics`;
const dashboardClients = () => `${dashboard()}/clients`;
const dashboardJobSearch = () => `${dashboard()}/job-search`;
const dashboardBlog = () => `${dashboard()}/blog`;
const dashboardBlogDetails = (id: string | number = ':id') =>
  `${dashboardBlog()}/${id}`;

export const routes = {
  // Main pages
  home,
  about,
  contact,
  faq,
  thankYou,
  privacyPolicy,
  termsOfUse,

  // Authentication pages
  signIn,
  signUp,

  // Scam Types pages
  scamTypes,
  scamTypeDetail,

  // Scam Awareness (Blog) pages
  scamAwareness,
  scamAwarenessArticle,

  // Exposed Platforms pages
  exposedPlatforms,
  exposedPlatformDetail,

  //
  login,
  access,
  dashboard,
  dashboardAnalytics,
  dashboardClients,
  dashboardOverview,
  dashboardJobSearch,
  dashboardBlog,
  dashboardBlogDetails,
  peopleDetails,
  people,
};
