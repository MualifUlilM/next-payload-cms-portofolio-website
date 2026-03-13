import { getPayload } from "payload";

async function seed() {
  const config = (await import("./payload.config")).default;
  const payload = await getPayload({ config });
  console.log("🌱 Starting seed...");

  // ============================================
  // USERS (Create admin user first)
  // ============================================

  const adminUser = await payload.create({
    collection: "users",
    data: {
      email: "admin@example.com",
      password: "password123",
      name: "Admin User",
    },
  });
  console.log(`✅ Admin user created: ${adminUser.email}`);

  // Clear existing data
  const collections = ["projects", "posts", "experience", "testimonials"] as const;
  for (const col of collections) {
    const existing = await payload.find({ collection: col, limit: 200 });
    for (const doc of existing.docs) {
      await payload.delete({ collection: col, id: doc.id });
    }
    console.log(`🗑  Cleared ${col}`);
  }

  // ============================================
  // PROJECTS
  // ============================================

  const projects = [
    {
      title: "ShipFast — SaaS Boilerplate",
      slug: "shipfast-saas-boilerplate",
      description: "Production-ready Next.js SaaS starter with auth, billing, and CMS built-in.",
      category: "Web App",
      techStack: [
        { technology: "Next.js 15" },
        { technology: "Payload CMS" },
        { technology: "Supabase" },
        { technology: "Stripe" },
        { technology: "TypeScript" },
        { technology: "Tailwind CSS" },
      ],
      liveUrl: "https://shipfast.dev",
      githubUrl: "https://github.com/example/shipfast",
      featured: true,
      order: 1,
    },
    {
      title: "Trackr — Project Management Tool",
      slug: "trackr-project-management",
      description: "Kanban-style project tracker for remote teams with real-time updates.",
      category: "Web App",
      techStack: [
        { technology: "React" },
        { technology: "Node.js" },
        { technology: "PostgreSQL" },
        { technology: "Supabase Realtime" },
        { technology: "tRPC" },
        { technology: "Tailwind CSS" },
      ],
      liveUrl: "https://trackr.app",
      githubUrl: "https://github.com/example/trackr",
      featured: true,
      order: 2,
    },
    {
      title: "Moneywise — Personal Finance App",
      slug: "moneywise-finance-app",
      description: "Cross-platform mobile finance tracker with budgeting and analytics.",
      category: "Mobile",
      techStack: [
        { technology: "Flutter" },
        { technology: "Dart" },
        { technology: "Supabase" },
        { technology: "Riverpod" },
        { technology: "SQLite" },
      ],
      liveUrl: "https://apps.apple.com/example/moneywise",
      githubUrl: "https://github.com/example/moneywise",
      featured: true,
      order: 3,
    },
    {
      title: "Fieldr — Field Service Mobile App",
      slug: "fieldr-field-service-app",
      description: "React Native app for field technicians — job scheduling, forms, and offline sync.",
      category: "Mobile",
      techStack: [
        { technology: "React Native" },
        { technology: "Expo" },
        { technology: "Node.js" },
        { technology: "PostgreSQL" },
        { technology: "Expo Router" },
        { technology: "WatermelonDB" },
      ],
      liveUrl: "https://fieldr.io",
      githubUrl: "https://github.com/example/fieldr",
      featured: true,
      order: 4,
    },
    {
      title: "ContentHub — Headless CMS Platform",
      slug: "contenthub-cms-platform",
      description: "Multi-tenant headless CMS platform built on Payload CMS with white-label support.",
      category: "CMS",
      techStack: [
        { technology: "Payload CMS" },
        { technology: "Next.js" },
        { technology: "PostgreSQL" },
        { technology: "TypeScript" },
        { technology: "Vercel" },
      ],
      liveUrl: "https://contenthub.dev",
      githubUrl: "https://github.com/example/contenthub",
      featured: false,
      order: 5,
    },
  ];

  for (const project of projects) {
    await payload.create({ collection: "projects", data: project });
    console.log(`✅ Project: ${project.title}`);
  }

  // ============================================
  // BLOG POSTS
  // ============================================

  const now = new Date();
  const daysAgo = (n: number) => new Date(now.getTime() - n * 86400000).toISOString();

  const posts = [
    {
      title: "Why I Chose Payload CMS Over Sanity for Client Projects",
      slug: "payload-cms-vs-sanity",
      excerpt: "After shipping 12+ CMS-driven projects, here's why Payload CMS wins for fullstack developers who want control without sacrificing the editing experience.",
      publishedAt: daysAgo(2),
      readingTime: 7,
      tags: [{ tag: "Payload CMS" }, { tag: "CMS" }, { tag: "Next.js" }],
    },
    {
      title: "Building Type-Safe APIs with tRPC and Next.js 15",
      slug: "trpc-nextjs-15-type-safe-api",
      excerpt: "tRPC eliminates the REST boilerplate and gives you end-to-end type safety without a code generator. Here's how I set it up in every new project.",
      publishedAt: daysAgo(5),
      readingTime: 9,
      tags: [{ tag: "tRPC" }, { tag: "Next.js" }, { tag: "TypeScript" }],
    },
    {
      title: "React Native vs Flutter: A Fullstack Developer's Honest Take",
      slug: "react-native-vs-flutter-fullstack-dev",
      excerpt: "I've shipped apps in both. The answer isn't which framework is better — it's which one fits your team, your backend, and your timeline.",
      publishedAt: daysAgo(9),
      readingTime: 11,
      tags: [{ tag: "React Native" }, { tag: "Flutter" }, { tag: "Mobile" }],
    },
    {
      title: "Server Components in Next.js 15: When to Use Them (and When Not To)",
      slug: "nextjs-15-server-components-guide",
      excerpt: "Server Components are not a replacement for client components — they're a tool for a specific job. Understanding the boundary is the key to a fast, maintainable app.",
      publishedAt: daysAgo(14),
      readingTime: 8,
      tags: [{ tag: "Next.js" }, { tag: "React" }, { tag: "Performance" }],
    },
    {
      title: "Supabase Row Level Security: The Right Way",
      slug: "supabase-row-level-security",
      excerpt: "RLS is Supabase's superpower — and the most misunderstood feature. This is how I structure policies for multi-tenant apps without losing my mind.",
      publishedAt: daysAgo(18),
      readingTime: 10,
      tags: [{ tag: "Supabase" }, { tag: "PostgreSQL" }, { tag: "Security" }],
    },
    {
      title: "Building a Multi-Tenant SaaS with Next.js App Router",
      slug: "multi-tenant-saas-nextjs-app-router",
      excerpt: "Subdomains, per-tenant databases, and shared infrastructure — here's the architecture I use for SaaS products that need to scale from 1 to 1,000 customers.",
      publishedAt: daysAgo(22),
      readingTime: 14,
      tags: [{ tag: "Next.js" }, { tag: "SaaS" }, { tag: "Architecture" }],
    },
    {
      title: "How I Structure Large Next.js Projects in 2025",
      slug: "nextjs-project-structure-2025",
      excerpt: "Feature folders, shared modules, and server/client boundaries — the folder structure I've refined across 20+ projects that scales without turning into a mess.",
      publishedAt: daysAgo(27),
      readingTime: 6,
      tags: [{ tag: "Next.js" }, { tag: "Architecture" }, { tag: "Best Practices" }],
    },
    {
      title: "Flutter for React Developers: What to Expect",
      slug: "flutter-for-react-developers",
      excerpt: "Coming from React, Flutter's widget model feels familiar but the differences will trip you up. Here's what I wish I knew before my first Flutter project.",
      publishedAt: daysAgo(33),
      readingTime: 12,
      tags: [{ tag: "Flutter" }, { tag: "React" }, { tag: "Mobile" }],
    },
    {
      title: "Payload CMS 3.0: Everything You Need to Know",
      slug: "payload-cms-3-overview",
      excerpt: "Payload 3.0 is a full rewrite that brings native Next.js support, a new database adapter system, and Lexical as the default editor. Here's what changed and why it matters.",
      publishedAt: daysAgo(38),
      readingTime: 13,
      tags: [{ tag: "Payload CMS" }, { tag: "Next.js" }, { tag: "CMS" }],
    },
    {
      title: "Database Design Patterns for SaaS Applications",
      slug: "database-design-patterns-saas",
      excerpt: "The schema decisions you make on day one will haunt you on day 365. These are the patterns I reach for when building multi-tenant products on PostgreSQL.",
      publishedAt: daysAgo(44),
      readingTime: 11,
      tags: [{ tag: "PostgreSQL" }, { tag: "Database" }, { tag: "SaaS" }],
    },
    {
      title: "Optimistic UI Updates with React Query and Next.js",
      slug: "optimistic-ui-react-query-nextjs",
      excerpt: "Optimistic updates make apps feel instant. React Query makes them surprisingly simple to implement correctly, even with rollback on error.",
      publishedAt: daysAgo(50),
      readingTime: 8,
      tags: [{ tag: "React Query" }, { tag: "React" }, { tag: "UX" }],
    },
    {
      title: "Expo Router vs React Navigation in 2025",
      slug: "expo-router-vs-react-navigation-2025",
      excerpt: "Expo Router has matured significantly. For new React Native projects, I now default to it over React Navigation — here's why, and where React Navigation still wins.",
      publishedAt: daysAgo(56),
      readingTime: 9,
      tags: [{ tag: "React Native" }, { tag: "Expo" }, { tag: "Mobile" }],
    },
    {
      title: "TypeScript Patterns I Use on Every Project",
      slug: "typescript-patterns-every-project",
      excerpt: "Generic utility types, discriminated unions, and branded types — the TypeScript patterns that have eliminated the most bugs in my production codebases.",
      publishedAt: daysAgo(62),
      readingTime: 10,
      tags: [{ tag: "TypeScript" }, { tag: "Best Practices" }],
    },
    {
      title: "From Idea to Production: My Client Project Workflow",
      slug: "client-project-workflow",
      excerpt: "Discovery, architecture, build, handoff — the workflow I use to take a client project from first call to production in 6–8 weeks without scope creep.",
      publishedAt: daysAgo(68),
      readingTime: 7,
      tags: [{ tag: "Workflow" }, { tag: "Client Work" }, { tag: "Process" }],
    },
    {
      title: "Node.js Performance: What Actually Makes a Difference",
      slug: "nodejs-performance-tips",
      excerpt: "Worker threads, streaming responses, database connection pooling — the Node.js performance wins that are worth implementing vs the ones that are premature optimisation.",
      publishedAt: daysAgo(75),
      readingTime: 9,
      tags: [{ tag: "Node.js" }, { tag: "Performance" }, { tag: "Backend" }],
    },
    {
      title: "Building Offline-First Mobile Apps with Expo",
      slug: "offline-first-mobile-expo",
      excerpt: "Offline support isn't just a feature — for field-service and logistics apps, it's the whole product. Here's how I architect offline-first sync with Expo and WatermelonDB.",
      publishedAt: daysAgo(82),
      readingTime: 13,
      tags: [{ tag: "Expo" }, { tag: "React Native" }, { tag: "Offline" }],
    },
    {
      title: "Next.js Image Optimization: A Complete Practical Guide",
      slug: "nextjs-image-optimization-guide",
      excerpt: "next/image does a lot automatically, but knowing the right width, format, and loading strategy for each context is what separates fast sites from slow ones.",
      publishedAt: daysAgo(90),
      readingTime: 8,
      tags: [{ tag: "Next.js" }, { tag: "Performance" }, { tag: "Images" }],
    },
    {
      title: "PostgreSQL Full-Text Search vs Typesense: When to Use Each",
      slug: "postgres-full-text-search-vs-typesense",
      excerpt: "For most apps under 1M records, PostgreSQL's built-in FTS is fast enough and removes a dependency. Here's exactly when you should reach for Typesense or Meilisearch instead.",
      publishedAt: daysAgo(97),
      readingTime: 10,
      tags: [{ tag: "PostgreSQL" }, { tag: "Search" }, { tag: "Backend" }],
    },
    {
      title: "Authentication in Next.js: Payload Auth vs NextAuth vs Clerk",
      slug: "nextjs-auth-comparison",
      excerpt: "Three solid auth solutions, three different trade-offs. Here's how I choose between Payload's built-in auth, NextAuth, and Clerk depending on what the project needs.",
      publishedAt: daysAgo(105),
      readingTime: 11,
      tags: [{ tag: "Auth" }, { tag: "Next.js" }, { tag: "Payload CMS" }],
    },
    {
      title: "The Exact Stack I Use for Every New Project in 2025",
      slug: "my-tech-stack-2025",
      excerpt: "Next.js, Payload CMS, Supabase, Tailwind, and Vercel — why these tools, how they fit together, and the one thing I'd change if I were starting over.",
      publishedAt: daysAgo(114),
      readingTime: 6,
      tags: [{ tag: "Stack" }, { tag: "Next.js" }, { tag: "Payload CMS" }, { tag: "Supabase" }],
    },
  ];

  for (const post of posts) {
    await payload.create({ collection: "posts", data: post });
    console.log(`✅ Post: ${post.title}`);
  }

  // ============================================
  // EXPERIENCE
  // ============================================

  const experiences = [
    {
      company: "Freelance",
      role: "Fullstack Developer",
      startDate: "2022-01-01T00:00:00.000Z",
      technologies: [
        { technology: "Next.js" },
        { technology: "React" },
        { technology: "Payload CMS" },
        { technology: "Supabase" },
        { technology: "React Native" },
        { technology: "Flutter" },
      ],
    },
    {
      company: "TechAgency Studio",
      role: "Frontend Developer",
      startDate: "2020-03-01T00:00:00.000Z",
      endDate: "2021-12-01T00:00:00.000Z",
      technologies: [
        { technology: "React" },
        { technology: "Next.js" },
        { technology: "TypeScript" },
        { technology: "Node.js" },
      ],
    },
  ];

  for (const exp of experiences) {
    await payload.create({ collection: "experience", data: exp });
    console.log(`✅ Experience: ${exp.role} @ ${exp.company}`);
  }

  console.log("\n✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
