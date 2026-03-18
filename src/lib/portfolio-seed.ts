import type { Payload } from "payload";

type SeedLogger = (message: string) => void;

type BlogPostSeed = {
  title: string;
  slug: string;
  excerpt: string;
  readingTime: number;
  publishedDaysAgo: number;
  tags: string[];
  seoDescription: string;
  paragraphs: string[];
};

const ADMIN_USER = {
  email: "admin@example.com",
  password: "password123",
  name: "Mualif Ulil",
} as const;

const COLLECTIONS_TO_CLEAR = [
  "skills",
  "projects",
  "posts",
  "experience",
  "testimonials",
] as const;

function createParagraphNode(text: string) {
  return {
    type: "paragraph",
    children: [
      {
        type: "text",
        detail: 0,
        format: 0,
        mode: "normal",
        style: "",
        text,
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    textFormat: 0,
    textStyle: "",
    version: 1,
  };
}

function createRichText(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      children: paragraphs.map(createParagraphNode),
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

const SITE_SETTINGS = {
  name: "Mualif Ulil",
  hero: {
    heading: "Fullstack Developer for Web and Mobile Products",
    subheading:
      "I am Mualif Ulil, a fullstack developer with 7+ years of experience building products with React, Next.js, Node.js, Payload CMS, React Native, and Flutter.",
    primaryCtaLabel: "Start a Project",
    secondaryCtaLabel: "View My Work",
  },
  socialProof: {
    enabled: false,
    label: "",
    clients: [],
  },
  tagline: "Fullstack web and mobile development that ships.",
  bio: "I am a fullstack developer with more than 7 years of experience building modern web and mobile products. I specialize in React, Next.js, Node.js, Payload CMS, React Native, and Flutter, with a focus on clean architecture, maintainable code, and fast delivery for product teams and founders.",
  avatar: null,
  branding: {
    logo: null,
    favicon: null,
  },
  email: "",
  availableForWork: true,
  contact: {
    enabled: true,
    buttonLabel: "",
    buttonUrl: "",
  },
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
  },
  seo: {
    defaultMetaTitle:
      "Mualif Ulil - Fullstack Developer | React, Next.js, Node.js",
    defaultMetaDescription:
      "Mualif Ulil is a fullstack developer with 7+ years of experience building web and mobile products using React, Next.js, Node.js, Payload CMS, React Native, and Flutter.",
    ogImage: null,
  },
};

const SKILL_GROUPS = [
  {
    category: "Frontend Development",
    intro:
      "Building fast and maintainable interfaces with React, Next.js, and Tailwind CSS for product websites and SaaS applications.",
    items: [
      { skill: "React" },
      { skill: "Next.js" },
      { skill: "Tailwind CSS" },
    ],
    order: 1,
  },
  {
    category: "Backend Development",
    intro:
      "Designing APIs and application logic with Node.js, Express, and Payload CMS for content-driven and product-focused systems.",
    items: [
      { skill: "Node.js" },
      { skill: "Express" },
      { skill: "Payload CMS" },
    ],
    order: 2,
  },
  {
    category: "Mobile Development",
    intro:
      "Shipping cross-platform mobile products with Flutter and React Native while keeping performance and delivery speed in focus.",
    items: [
      { skill: "Flutter" },
      { skill: "React Native" },
    ],
    order: 3,
  },
];

const PROJECTS = [
  {
    title: "Meducation",
    slug: "meducation",
    description:
      "Gamified health education platform built to improve learner engagement and retention.",
    longDescription: createRichText([
      "Meducation is a health education platform designed to make learning more engaging through gamification. The product focuses on improving retention by combining clear content structure with lightweight reward mechanics.",
      "The application is built with Next.js, Supabase, and Tailwind CSS. That stack supports fast page delivery, flexible content presentation, and a clean user experience for lesson navigation and progress tracking.",
      "The goal of this project is to deliver a product that feels simple for users while staying scalable for future content expansion and product iteration.",
    ]),
    category: "Web App",
    techStack: [
      { technology: "Next.js" },
      { technology: "Supabase" },
      { technology: "Tailwind CSS" },
    ],
    liveUrl: "https://meducation-pi.vercel.app/",
    featured: true,
    order: 1,
    seo: {
      metaDescription:
        "Meducation is a gamified health education platform built with Next.js, Supabase, and Tailwind CSS to deliver a faster and more engaging learning experience.",
    },
  },
  {
    title: "InvoiceKu",
    slug: "invoiceku",
    description:
      "SaaS invoice generator for fast invoice creation, billing, and client-ready documents.",
    longDescription: createRichText([
      "InvoiceKu is a SaaS invoice generator focused on making invoice creation simple, fast, and practical for day-to-day business use. The product reduces manual work and helps users create client-ready invoices in minutes.",
      "It is built with Next.js, Supabase, and Tailwind CSS. The stack supports authentication, data storage, and a clean interface for invoice management without adding unnecessary complexity.",
      "The project emphasizes straightforward user flows, predictable data handling, and a polished UI that makes billing tasks feel efficient instead of repetitive.",
    ]),
    category: "Web App",
    techStack: [
      { technology: "Next.js" },
      { technology: "Supabase" },
      { technology: "Tailwind CSS" },
    ],
    liveUrl: "https://invoiceku-eta.vercel.app/",
    featured: true,
    order: 2,
    seo: {
      metaDescription:
        "InvoiceKu is a SaaS invoice generator built with Next.js, Supabase, and Tailwind CSS for fast invoice creation and a cleaner billing workflow.",
    },
  },
  {
    title: "Folio CMS",
    slug: "folio-cms",
    description:
      "Personal portfolio website powered by Next.js and Payload CMS for flexible content management.",
    longDescription: createRichText([
      "Folio CMS is a personal portfolio website built for flexible content management and long-term maintainability. It gives the portfolio owner control over projects, blog posts, and site-wide content from a single admin panel.",
      "The project uses Next.js for the frontend experience and Payload CMS for structured content management. That combination makes it easier to keep the website fast while allowing future updates without hardcoded content edits.",
      "The main focus of this project is a clean publishing workflow, reusable content models, and a professional portfolio experience that can evolve over time.",
    ]),
    category: "CMS",
    techStack: [
      { technology: "Next.js" },
      { technology: "Payload CMS" },
    ],
    featured: true,
    order: 3,
    seo: {
      metaDescription:
        "Folio CMS is a personal portfolio website built with Next.js and Payload CMS to make projects, blog content, and site-wide updates easier to manage.",
    },
  },
];

const EXPERIENCES = [
  {
    company: "Independent",
    role: "Fullstack Developer",
    startDate: "2018-01-01T00:00:00.000Z",
    description: createRichText([
      "For more than 7 years, I have been building web and mobile products across frontend, backend, CMS, and cross-platform mobile stacks.",
      "My focus is on practical architecture, maintainable delivery, and building products that can move from idea to production without unnecessary technical overhead.",
    ]),
    technologies: [
      { technology: "React" },
      { technology: "Next.js" },
      { technology: "Node.js" },
      { technology: "Payload CMS" },
      { technology: "React Native" },
      { technology: "Flutter" },
    ],
  },
];

const BLOG_POSTS: BlogPostSeed[] = [
  {
    title: "How to Build a Health Education Platform with Next.js and Supabase",
    slug: "build-health-education-platform-nextjs-supabase",
    excerpt:
      "A practical breakdown of the architecture and UX decisions behind a health education platform built with Next.js and Supabase.",
    readingTime: 8,
    publishedDaysAgo: 3,
    tags: ["Next.js", "Supabase", "Health Tech"],
    seoDescription:
      "Learn how to build a health education platform with Next.js and Supabase, including architecture, progress tracking, and gamification considerations.",
    paragraphs: [
      "Building a health education platform is not only about publishing lessons. The product also needs to guide users, reward progress, and keep the experience simple enough for consistent daily use.",
      "For products like Meducation, Next.js is a strong fit because it supports fast page delivery, clean routing, and flexible rendering for onboarding, lessons, and dashboards. Supabase covers authentication, database storage, and backend features without forcing a heavy custom setup.",
      "Gamification should support learning instead of distracting from it. I usually model streaks, completion states, and milestones around the actual educational goal so the product feels motivating but still clear.",
      "The most important technical decision is separating content, learner progress, and reporting logic in the data model. That makes the platform easier to scale when you need more lessons, deeper analytics, or different learning flows.",
    ],
  },
  {
    title: "How to Build a SaaS Invoice Generator with Next.js and Supabase",
    slug: "build-saas-invoice-generator-nextjs-supabase",
    excerpt:
      "A clean approach to building a SaaS invoice generator with fast UX, predictable data flows, and a simple fullstack setup.",
    readingTime: 7,
    publishedDaysAgo: 6,
    tags: ["SaaS", "Next.js", "Supabase"],
    seoDescription:
      "A practical guide to building a SaaS invoice generator with Next.js and Supabase, from invoice data models to user workflows.",
    paragraphs: [
      "An invoice generator looks simple on the surface, but the product becomes more useful when it handles recurring structure, clean formatting, and a workflow users can repeat without thinking too much.",
      "Next.js is a solid choice for this kind of SaaS because it gives you fast interface rendering, easy routing, and a simple way to combine product pages with authenticated application screens. Supabase makes it easier to manage auth and invoice records in one backend layer.",
      "The main product work is not the PDF export itself. The real value comes from modeling clients, invoice items, totals, due dates, and statuses in a way that keeps the user flow short and predictable.",
      "If you are building a product like InvoiceKu, focus first on speed and clarity. A clean invoice creation flow creates more value than a large feature list that slows users down.",
    ],
  },
  {
    title: "Why Payload CMS Is a Great Fit for Personal Portfolio Websites",
    slug: "why-payload-cms-fits-personal-portfolio-websites",
    excerpt:
      "Payload CMS gives portfolio websites a practical editing workflow without sacrificing control over structure and performance.",
    readingTime: 6,
    publishedDaysAgo: 10,
    tags: ["Payload CMS", "Next.js", "Portfolio"],
    seoDescription:
      "See why Payload CMS is a strong choice for personal portfolio websites that need editable content, structured data, and long-term flexibility.",
    paragraphs: [
      "A personal portfolio website often starts as a simple static site, but it becomes harder to maintain once projects, blog posts, and SEO content need regular updates. That is where a CMS starts adding real value.",
      "Payload CMS works especially well for portfolio websites because it keeps the content model close to the codebase. You can define project fields, blog content, and site settings clearly without losing the flexibility to design the frontend exactly the way you want.",
      "For a project like Folio CMS, this setup means content changes no longer require manual code edits. Projects, skills, and posts can all be updated from the admin area while the frontend still benefits from Next.js performance and routing.",
      "If you want a portfolio website that can grow over time, Payload CMS gives you a better long-term workflow than hardcoded content alone. It is a practical balance between developer control and content flexibility.",
    ],
  },
  {
    title: "React vs Next.js: What Businesses Actually Need to Know",
    slug: "react-vs-nextjs-what-businesses-need-to-know",
    excerpt:
      "The better question is not React or Next.js. It is what kind of product, traffic, and delivery workflow your business actually needs.",
    readingTime: 7,
    publishedDaysAgo: 14,
    tags: ["React", "Next.js", "Frontend"],
    seoDescription:
      "Understand the real difference between React and Next.js, and when each option makes sense for business websites and applications.",
    paragraphs: [
      "React and Next.js are often compared as if they solve the same problem, but they sit at different levels. React is a UI library, while Next.js is a framework built on top of React to handle routing, rendering, and production concerns.",
      "For businesses, the decision usually comes down to speed of delivery, SEO needs, and architecture. If you need content-rich pages, landing pages, or better out-of-the-box handling for performance and rendering, Next.js is often the better starting point.",
      "Pure React can still make sense when your team already has a stable architecture or when the application is highly interactive and mostly used after login. But many teams end up rebuilding parts of what Next.js already solves well.",
      "The best decision is based on product requirements, not trend comparisons. A business site, SaaS dashboard, and content platform may all share React, but they usually need different levels of framework support.",
    ],
  },
  {
    title: "How I Structure Fullstack Projects with Next.js, Node.js, and Payload CMS",
    slug: "how-i-structure-fullstack-projects-nextjs-nodejs-payload-cms",
    excerpt:
      "A maintainable fullstack project structure depends on clear boundaries between UI, business logic, and content workflows.",
    readingTime: 8,
    publishedDaysAgo: 18,
    tags: ["Next.js", "Node.js", "Payload CMS"],
    seoDescription:
      "A practical guide to structuring fullstack projects with Next.js, Node.js, and Payload CMS for maintainability and growth.",
    paragraphs: [
      "Project structure becomes a real problem when frontend, backend, and content logic start mixing in the same folder patterns. What feels fast in the first week becomes expensive when the product grows.",
      "My approach is to keep the rendering layer, business logic, and content models clearly separated. Next.js handles the application shell and routing, Node.js services support backend logic where needed, and Payload CMS owns structured content and admin workflows.",
      "This separation helps in three ways. It keeps features easier to find, makes testing simpler, and reduces the chance that content requirements leak into application logic in uncontrolled ways.",
      "A good structure is less about naming folders and more about reducing confusion. Every module should make it obvious whether it belongs to UI, domain logic, integrations, or content management.",
    ],
  },
  {
    title: "React Native vs Flutter for Startup MVPs",
    slug: "react-native-vs-flutter-for-startup-mvps",
    excerpt:
      "The right choice for an MVP depends on team skill, product scope, and how much platform-specific work the app will need.",
    readingTime: 7,
    publishedDaysAgo: 22,
    tags: ["React Native", "Flutter", "Mobile"],
    seoDescription:
      "Compare React Native vs Flutter for startup MVPs based on speed, team fit, product complexity, and long-term maintenance.",
    paragraphs: [
      "Choosing between React Native and Flutter for an MVP is rarely about which framework is better in the abstract. The better question is which one helps your team ship the right product fastest.",
      "React Native is often the stronger option when the team already works with React and JavaScript. It reduces the context switch and makes it easier to share thinking, components, and workflows across web and mobile efforts.",
      "Flutter is a strong choice when you want a highly controlled UI layer and a consistent rendering model across platforms. It can be especially useful when the product experience depends heavily on custom visual behavior.",
      "For startup MVPs, delivery speed matters most. Choose the stack that fits the team you actually have, the features you need now, and the maintenance path you can realistically support after launch.",
    ],
  },
  {
    title: "Tailwind CSS Best Practices for Scalable Frontend Projects",
    slug: "tailwind-css-best-practices-for-scalable-frontend-projects",
    excerpt:
      "Tailwind CSS stays productive at scale when teams treat it as a system, not just a shortcut for fast styling.",
    readingTime: 6,
    publishedDaysAgo: 27,
    tags: ["Tailwind CSS", "Frontend", "CSS"],
    seoDescription:
      "Learn Tailwind CSS best practices for scalable frontend projects, including consistency, component boundaries, and maintainability.",
    paragraphs: [
      "Tailwind CSS is often praised for speed, but speed alone is not enough on larger projects. If naming, spacing, and component patterns stay inconsistent, the codebase becomes harder to maintain even when the UI ships quickly.",
      "The first rule is to standardize design choices early. Spacing, typography, color usage, and layout patterns should feel intentional so new screens do not drift away from the existing interface.",
      "The second rule is to move repetition into reusable components instead of stacking longer and longer class strings everywhere. Tailwind works best when utility classes support a clear component strategy, not replace one.",
      "Used well, Tailwind helps teams move faster with fewer styling regressions. Used carelessly, it creates visual inconsistency. The difference comes from discipline in patterns, not the tool itself.",
    ],
  },
  {
    title: "Node.js and Express API Patterns I Use in Production",
    slug: "nodejs-and-express-api-patterns-i-use-in-production",
    excerpt:
      "Simple API patterns usually outperform clever ones when you need reliability, readability, and easier maintenance.",
    readingTime: 8,
    publishedDaysAgo: 33,
    tags: ["Node.js", "Express", "Backend"],
    seoDescription:
      "Explore practical Node.js and Express API patterns for production applications, including structure, validation, and error handling.",
    paragraphs: [
      "Production APIs do not need to feel complicated to be robust. In most cases, the biggest improvements come from predictable request handling, clean validation, and consistent error responses.",
      "With Node.js and Express, I prefer a structure where routing stays thin, request validation happens early, and business logic lives in dedicated service layers. That reduces duplication and keeps controllers easier to read.",
      "I also treat error handling as part of the design, not as cleanup after the fact. Standardized response shapes, clear status codes, and explicit validation rules make the API easier for both frontend and backend teams to work with.",
      "The goal is not to build a framework inside Express. The goal is to create an API structure that new team members can understand quickly and maintain safely under real delivery pressure.",
    ],
  },
  {
    title: "SEO Checklist for Developer Portfolio Websites Built with Next.js",
    slug: "seo-checklist-for-developer-portfolio-websites-nextjs",
    excerpt:
      "A developer portfolio needs more than clean visuals. It also needs metadata, content depth, and pages that search engines can understand clearly.",
    readingTime: 7,
    publishedDaysAgo: 40,
    tags: ["SEO", "Next.js", "Portfolio"],
    seoDescription:
      "Use this SEO checklist for developer portfolio websites built with Next.js, covering metadata, structured data, content, and social previews.",
    paragraphs: [
      "A developer portfolio often looks polished but still struggles to rank because the SEO basics are incomplete. Good design helps with trust, but search visibility depends on clear metadata, crawlable pages, and content that matches search intent.",
      "The first layer is technical: title tags, descriptions, canonical URLs, structured data, sitemap generation, and social preview metadata. These elements help search engines and sharing platforms understand the site correctly.",
      "The second layer is content: project descriptions that explain outcomes, blog posts that target relevant keywords, and copy that describes your actual specialization. Thin content makes even a technically clean site hard to rank.",
      "Next.js gives you strong SEO foundations, but the result still depends on what you publish. A portfolio becomes much more visible when technical SEO and content strategy work together instead of separately.",
    ],
  },
  {
    title: "How to Choose the Right Stack for Web and Mobile Product Development",
    slug: "how-to-choose-the-right-stack-for-web-and-mobile-product-development",
    excerpt:
      "The right stack is the one that matches product scope, team capability, and delivery speed without creating unnecessary complexity.",
    readingTime: 8,
    publishedDaysAgo: 48,
    tags: ["Fullstack", "Product Development", "Architecture"],
    seoDescription:
      "A practical framework for choosing the right stack for web and mobile product development based on product needs and team realities.",
    paragraphs: [
      "Teams often choose stacks based on popularity, but product development works better when the decision starts with constraints. The product type, timeline, internal skill set, and maintenance expectations should shape the stack more than trend cycles do.",
      "For web products, I usually look at rendering needs, content requirements, and backend complexity first. For mobile products, I look at user experience goals, platform constraints, and how much native behavior the app needs.",
      "A stack becomes a good choice when it helps the team ship quickly and stay maintainable after launch. That is why I often work with React, Next.js, Node.js, Payload CMS, React Native, and Flutter depending on the product context.",
      "The best stack is rarely the most complex one. It is the one that matches the product clearly, supports the team well, and leaves room for the product to grow without a rewrite too early.",
    ],
  },
];

function buildPosts() {
  const now = new Date();
  const daysAgo = (days: number) =>
    new Date(now.getTime() - days * 86400000).toISOString();

  return BLOG_POSTS.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: createRichText(post.paragraphs),
    publishedAt: daysAgo(post.publishedDaysAgo),
    readingTime: post.readingTime,
    tags: post.tags.map((tag) => ({ tag })),
    seo: {
      metaDescription: post.seoDescription,
    },
  }));
}

async function clearCollection(
  payload: Payload,
  collection: (typeof COLLECTIONS_TO_CLEAR)[number],
  logger: SeedLogger
) {
  const existing = await payload.find({
    collection,
    limit: 200,
  });

  for (const doc of existing.docs) {
    await payload.delete({
      collection,
      id: doc.id,
    });
  }

  logger(`Cleared ${collection}`);
}

async function ensureAdminUser(payload: Payload, logger: SeedLogger) {
  const existing = await payload.find({
    collection: "users",
    where: {
      email: {
        equals: ADMIN_USER.email,
      },
    },
    limit: 1,
  });

  if (existing.docs[0]) {
    logger(`Admin user already exists: ${ADMIN_USER.email}`);
    return existing.docs[0];
  }

  const adminUser = await payload.create({
    collection: "users",
    data: ADMIN_USER,
  });

  logger(`Created admin user: ${adminUser.email}`);
  return adminUser;
}

export async function runPortfolioSeed(
  payload: Payload,
  logger: SeedLogger = () => undefined
) {
  logger("Starting seed...");

  await ensureAdminUser(payload, logger);

  for (const collection of COLLECTIONS_TO_CLEAR) {
    await clearCollection(payload, collection, logger);
  }

  await payload.updateGlobal({
    slug: "site-settings",
    data: SITE_SETTINGS,
  });
  logger(`Updated site settings: ${SITE_SETTINGS.name}`);

  for (const skillGroup of SKILL_GROUPS) {
    await payload.create({
      collection: "skills",
      data: skillGroup,
    });
    logger(`Created skill group: ${skillGroup.category}`);
  }

  for (const project of PROJECTS) {
    await payload.create({
      collection: "projects",
      data: project,
    });
    logger(`Created project: ${project.title}`);
  }

  for (const post of buildPosts()) {
    await payload.create({
      collection: "posts",
      data: post,
    });
    logger(`Created post: ${post.title}`);
  }

  for (const experience of EXPERIENCES) {
    await payload.create({
      collection: "experience",
      data: experience,
    });
    logger(`Created experience: ${experience.role} @ ${experience.company}`);
  }

  logger("Seed complete");
}
