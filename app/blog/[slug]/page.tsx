import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import { absoluteUrl, pageMetadata, SITE_NAME, SITE_URL } from "../../../lib/seo";
import { getAllBlogSlugs, getBlogPost } from "../../data/blogPosts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  const path = `/blog/${slug}`;
  return pageMetadata({
    title: post.title,
    description: post.description,
    path,
    image: post.image,
    ogType: "article",
    keywords: [post.category, "HomeSewa blog", "home care tips Nepal"],
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const parsedDate = new Date(post.date);
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image),
    url: absoluteUrl(`/blog/${slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    ...(Number.isNaN(parsedDate.getTime())
      ? {}
      : { datePublished: parsedDate.toISOString() }),
    articleSection: post.category,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 sm:py-16 px-6 sm:px-12 lg:px-20">
      <JsonLd data={blogPostingJsonLd} />
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#0D5D59] hover:text-teal-900 font-medium mb-8 transition-colors"
        >
          ← Back to Blog
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">{post.date}</span>
            <span className="text-sm text-gray-400">·</span>
            <span className="text-sm text-gray-500">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-teal-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            {post.description}
          </p>
        </header>

        <div className="rounded-2xl overflow-hidden mb-10 shadow-md border border-gray-100">
          <img src={post.image} alt={post.title} className="w-full h-56 sm:h-72 lg:h-80 object-cover" />
        </div>

        <div
          className="blog-content bg-white rounded-2xl border border-gray-100 shadow-sm px-6 sm:px-10 py-8 sm:py-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-10 bg-teal-50 border border-teal-200 rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-teal-900 mb-3">Need Professional Help?</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto leading-relaxed">
            Book a trusted HomeSewa professional for salon, spa, repairs, renovation, and more in Kathmandu and nearby areas.
          </p>
          <Link
            href="/book"
            className="inline-block bg-[#0E4541] text-white font-semibold px-8 py-3 rounded-lg hover:bg-teal-900 transition"
          >
            Book a Service
          </Link>
        </div>
      </article>
    </section>
  );
}