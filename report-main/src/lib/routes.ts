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
};