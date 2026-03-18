// ============================================
// Payload CMS Type Definitions
// ============================================

export type MediaFile = {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  filename?: string;
  mimeType?: string;
};

// ============================================
// Projects Collection
// ============================================

export type ProjectCategory = "Web App" | "Mobile" | "CMS" | "API";

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string; // one-liner
  longDescription?: Record<string, unknown>; // Payload richText (Lexical)
  thumbnail?: MediaFile;
  images?: MediaFile[];
  techStack?: { technology: string; id?: string }[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: MediaFile;
  };
  createdAt: string;
  updatedAt: string;
};

// ============================================
// Experience Collection
// ============================================

export type Experience = {
  id: string;
  company: string;
  role: string;
  startDate: string; // ISO date string
  endDate?: string | null; // null = "Present"
  description?: Record<string, unknown>; // richText
  technologies?: { technology: string; id?: string }[];
  companyLogo?: MediaFile;
  createdAt: string;
  updatedAt: string;
};

// ============================================
// Testimonials Collection
// ============================================

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: MediaFile;
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
};

// ============================================
// Posts Collection
// ============================================

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: Record<string, unknown>; // richText
  thumbnail?: MediaFile;
  publishedAt?: string;
  readingTime?: number;
  tags?: { tag: string; id?: string }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: MediaFile;
  };
  createdAt: string;
  updatedAt: string;
};

// ============================================
// Site Settings (Global)
// ============================================

export type SiteSettings = {
  id: string;
  name: string;
  hero?: {
    heading?: string;
    subheading?: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
  };
  socialProof?: {
    enabled?: boolean;
    label?: string;
    clients?: { name: string; id?: string }[];
  };
  tagline?: string;
  bio?: string;
  avatar?: MediaFile;
  branding?: {
    logo?: MediaFile;
    favicon?: MediaFile;
  };
  email?: string;
  availableForWork?: boolean;
  contact?: {
    enabled?: boolean;
    buttonLabel?: string;
    buttonUrl?: string;
  };
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  seo?: {
    defaultMetaTitle?: string;
    defaultMetaDescription?: string;
    ogImage?: MediaFile;
  };
  createdAt: string;
  updatedAt: string;
};

// ============================================
// Skills Collection
// ============================================

export type SkillGroup = {
  id: string;
  category: string;
  intro?: string;
  items?: { skill: string; id?: string }[];
  order?: number;
  createdAt: string;
  updatedAt: string;
};

// ============================================
// API Response Wrappers
// ============================================

export type PaginatedResponse<T> = {
  docs: T[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
