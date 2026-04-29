import { Metadata } from 'next';

// Site-wide metadata
export const siteMetadata = {
  name: 'ScamReport',
  description: 'Join our community to report, track, and prevent scams. Together we can build a safer digital world for everyone.',
  keywords: 'scam reporting, fraud prevention, scam awareness, online safety, scam database, fraud alerts',
  url: 'https://scamreport.com',
  ogImage: '/images/og-image.png',
};

// Common metadata configuration
export const commonMetadata = {
  metadataBase: new URL(siteMetadata.url),
  applicationName: siteMetadata.name,
  authors: [{ name: siteMetadata.name }],
  generator: 'Next.js',
  keywords: siteMetadata.keywords,
};

// Page metadata functions
export function getHomeMetadata(): Metadata {
  return {
    ...commonMetadata,
    title: 'ScamReport - Where Awareness Meets Action',
    description: siteMetadata.description,
    openGraph: {
      ...commonMetadata,
      title: 'ScamReport - Where Awareness Meets Action',
      description: siteMetadata.description,
      type: 'website',
      url: siteMetadata.url,
      siteName: siteMetadata.name,
      images: [
        {
          url: siteMetadata.ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ScamReport - Where Awareness Meets Action',
      description: siteMetadata.description,
      images: [siteMetadata.ogImage],
    },
  };
}

export function getAboutMetadata(): Metadata {
  return {
    ...commonMetadata,
    title: 'About Us - ScamReport Community',
    description: 'Learn about ScamReport\'s mission to build a safer digital world through community awareness and scam prevention. Meet our team and discover our values.',
    openGraph: {
      ...commonMetadata,
      title: 'About Us - ScamReport Community',
      description: 'Learn about ScamReport\'s mission to build a safer digital world through community awareness and scam prevention.',
      type: 'website',
      url: `${siteMetadata.url}/about`,
    },
  };
}

export function getContactMetadata(): Metadata {
  return {
    ...commonMetadata,
    title: 'Contact Us - ScamReport Support',
    description: 'Need help reporting a scam or have questions? Contact ScamReport 24/7 for emergency scam victim support and general inquiries. Our team is here to help.',
    openGraph: {
      ...commonMetadata,
      title: 'Contact Us - ScamReport Support',
      description: 'Need help reporting a scam or have questions? Contact ScamReport 24/7 for emergency scam victim support and general inquiries.',
      type: 'website',
      url: `${siteMetadata.url}/contact`,
    },
  };
}

export function getFaqMetadata(): Metadata {
  return {
    ...commonMetadata,
    title: 'FAQ - Frequently Asked Questions | ScamReport',
    description: 'Find answers to common questions about scam reporting, prevention, and recovery. Learn how to protect yourself and what to do if you\'ve been scammed.',
    openGraph: {
      ...commonMetadata,
      title: 'FAQ - Frequently Asked Questions | ScamReport',
      description: 'Find answers to common questions about scam reporting, prevention, and recovery.',
      type: 'website',
      url: `${siteMetadata.url}/faq`,
    },
  };
}

export function getPrivacyPolicyMetadata(): Metadata {
  return {
    ...commonMetadata,
    title: 'Privacy Policy - ScamReport',
    description: 'Learn how we collect, use, and protect your personal information on the ScamReport platform. Your privacy is our priority.',
    openGraph: {
      ...commonMetadata,
      title: 'Privacy Policy - ScamReport',
      description: 'Learn how we collect, use, and protect your personal information on the ScamReport platform.',
      type: 'website',
      url: `${siteMetadata.url}/privacy-policy`,
    },
  };
}

export function getTermsOfUseMetadata(): Metadata {
  return {
    ...commonMetadata,
    title: 'Terms of Use - ScamReport',
    description: 'Understand the rules and guidelines for using the ScamReport platform safely and responsibly. Read our terms and conditions.',
    openGraph: {
      ...commonMetadata,
      title: 'Terms of Use - ScamReport',
      description: 'Understand the rules and guidelines for using the ScamReport platform safely and responsibly.',
      type: 'website',
      url: `${siteMetadata.url}/terms-of-use`,
    },
  };
}

export function getScamTypesMetadata(): Metadata {
  return {
    ...commonMetadata,
    title: 'Scam Types - Learn About Different Scams | ScamReport',
    description: 'Explore different types of scams including phishing, investment, romance, tech support, and more. Learn warning signs and how to protect yourself.',
    openGraph: {
      ...commonMetadata,
      title: 'Scam Types - Learn About Different Scams | ScamReport',
      description: 'Explore different types of scams and learn how to protect yourself from online fraud.',
      type: 'website',
      url: `${siteMetadata.url}/scam-types`,
    },
  };
}

export function getScamTypeDetailMetadata(scamType: string): Metadata {
  return {
    ...commonMetadata,
    title: `${scamType} - Scam Prevention Guide | ScamReport`,
    description: `Learn about ${scamType} scams, warning signs, and how to protect yourself. Comprehensive guide to recognizing and avoiding ${scamType.toLowerCase()}.`,
    openGraph: {
      ...commonMetadata,
      title: `${scamType} - Scam Prevention Guide`,
      description: `Learn about ${scamType} scams, warning signs, and how to protect yourself.`,
      type: 'article',
      url: `${siteMetadata.url}/scam-types/${scamType.toLowerCase().replace(/\s+/g, '-')}`,
    },
  };
}

export function getBlogMetadata(): Metadata {
  return {
    ...commonMetadata,
    title: 'Scam Awareness Blog - Latest Articles | ScamReport',
    description: 'Stay informed with the latest scam prevention tips, warning signs, and protective measures. Expert advice on keeping yourself safe online.',
    openGraph: {
      ...commonMetadata,
      title: 'Scam Awareness Blog - Latest Articles | ScamReport',
      description: 'Stay informed with the latest scam prevention tips, warning signs, and protective measures.',
      type: 'website',
      url: `${siteMetadata.url}/blog`,
    },
  };
}

export function getBlogPostMetadata(title: string, excerpt: string): Metadata {
  return {
    ...commonMetadata,
    title: `${title} | ScamReport Blog`,
    description: excerpt,
    openGraph: {
      ...commonMetadata,
      title: title,
      description: excerpt,
      type: 'article',
      url: `${siteMetadata.url}/blog`,
    },
  };
}

export function getExposedPlatformsMetadata(): Metadata {
  return {
    ...commonMetadata,
    title: 'Exposed Platforms - Fake Investment Scams | ScamReport',
    description: 'View exposed fake investment platforms and fraudulent schemes. Learn about confirmed scams to protect yourself and your finances.',
    openGraph: {
      ...commonMetadata,
      title: 'Exposed Platforms - Fake Investment Scams | ScamReport',
      description: 'View exposed fake investment platforms and fraudulent schemes. Learn about confirmed scams.',
      type: 'website',
      url: `${siteMetadata.url}/exposed-platforms`,
    },
  };
}

export function getExposedPlatformDetailMetadata(platformName: string): Metadata {
  return {
    ...commonMetadata,
    title: `${platformName} - Exposed Fake Platform | ScamReport`,
    description: `${platformName} has been identified as a fraudulent platform. Learn about this scam, warning signs, and how to protect yourself.`,
    openGraph: {
      ...commonMetadata,
      title: `${platformName} - Exposed Fake Platform`,
      description: `${platformName} has been identified as a fraudulent platform. Learn about this scam and warning signs.`,
      type: 'article',
      url: `${siteMetadata.url}/exposed-platforms`,
    },
  };
}

export function getSignInMetadata(): Metadata {
  return {
    ...commonMetadata,
    title: 'Sign In - ScamReport Community',
    description: 'Sign in to your ScamReport account to access scam reports, contribute to the community, and stay protected from online fraud.',
    openGraph: {
      ...commonMetadata,
      title: 'Sign In - ScamReport Community',
      description: 'Sign in to your ScamReport account to access scam reports and contribute to the community.',
      type: 'website',
      url: `${siteMetadata.url}/signin`,
    },
  };
}

export function getSignUpMetadata(): Metadata {
  return {
    ...commonMetadata,
    title: 'Sign Up - Join ScamReport Community',
    description: 'Join the ScamReport community to report scams, access verified reports, and help protect others from online fraud. Free to join.',
    openGraph: {
      ...commonMetadata,
      title: 'Sign Up - Join ScamReport Community',
      description: 'Join the ScamReport community to report scams and help protect others from online fraud.',
      type: 'website',
      url: `${siteMetadata.url}/signup`,
    },
  };
}

export function getThankYouMetadata(): Metadata {
  return {
    ...commonMetadata,
    title: 'Thank You - ScamReport',
    description: 'Thank you for contacting ScamReport. Our team will review your submission and get back to you shortly.',
    openGraph: {
      ...commonMetadata,
      title: 'Thank You - ScamReport',
      description: 'Thank you for contacting ScamReport. Our team will review your submission and get back to you shortly.',
      type: 'website',
      url: `${siteMetadata.url}/thank-you`,
    },
  };
}