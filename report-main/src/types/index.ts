// Core types for the Eduleb education platform

export interface Course {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  totalCourses: number;
  duration: string;
  price: number;
  isFree?: boolean;
  description?: string;
  instructor?: string;
  level?: string;
  language?: string;
  enrolledStudents?: number;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  image: string;
  totalCourses: number;
  totalStudents: number;
  socialLinks: SocialLinks;
  bio?: string;
  expertise?: string[];
}

export interface SocialLinks {
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  image: string;
  rating: number;
  content: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  excerpt: string;
  content?: string;
  author?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  courseCount?: number;
}

export interface Counter {
  id: string;
  icon: string;
  value: number;
  label: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface ContactInfo {
  address: string;
  phone: string;
  whatsapp?: string;
  email: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  logo: string;
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
}

export interface Feature {
  id: string;
  number: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Scam Reporting Platform Types

export interface ScamReport {
  id: string;
  title: string;
  category: string;
  image: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  date: string;
  description: string;
  reporter: string;
  status: 'Verified' | 'Under Review' | 'Pending';
  affectedCount: number;
}

export interface Contributor {
  id: string;
  name: string;
  role: string;
  image: string;
  reportsFiled: number;
  warningsIssued: number;
  socialLinks: SocialLinks;
  bio?: string;
  expertise?: string[];
}

export interface SuccessStory {
  id: string;
  name: string;
  scamType: string;
  image: string;
  rating: number;
  content: string;
  moneySaved: string;
}

export interface AwarenessArticle {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  excerpt: string;
  content?: string;
  author?: string;
}

export interface ScamCategory {
  id: string;
  name: string;
  image: string;
  reportCount: number;
}

export interface PlatformStat {
  id: string;
  icon: string;
  value: number;
  label: string;
}

export interface PlatformFeature {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface TrustedPartner {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export interface FakeInvestmentPlatform {
  id: string;
  name: string;
  type: string;
  image: string;
  dateExposed: string;
  status: 'Active' | 'Shut Down' | 'Under Investigation';
  description: string;
  warningSigns: string[];
  estimatedLosses: string;
  victimCount: string;
  reportedBy: string;
  evidence?: string;
}