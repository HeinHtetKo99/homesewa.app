import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogPost } from "../../data/blogPosts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found | RocketSingh" };

  return {
    title: `${post.title} | RocketSingh`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: `https://www.rocketsingh.app${post.image}` }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <section className="min-h-screen bg-white py-20 px-6 sm:px-12 lg:px-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#0D5D59] hover:text-teal-900 font-medium mb-8 transition-colors"
        >
          ← Back to Blog
        </Link>

        <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
          <img src={post.image} alt={post.title} className="w-full h-64 sm:h-80 object-cover" />
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-sm text-gray-400">{post.date}</span>
          <span className="text-sm text-gray-400">{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-900 mb-8 leading-tight">
          {post.title}
        </h1>

        <div
          className="prose prose-teal max-w-none prose-h2:text-xl prose-h2:font-bold prose-h2:text-teal-800 prose-h2:mt-8 prose-h2:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-teal-900 mb-3">Need Professional Help?</h3>
          <p className="text-gray-600 mb-6">
            Book a trusted RocketSingh professional for any cleaning service in Chennai and across India.
          </p>
          <Link
            href="/book"
            className="inline-block bg-[#0E4541] text-white font-semibold px-8 py-3 rounded-lg hover:bg-teal-900 transition"
          >
            Book a Service
          </Link>
        </div>
      </div>
    </section>
  );
}