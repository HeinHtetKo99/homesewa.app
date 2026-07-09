import type { Metadata } from "next";
import BlogCard from "../../components/BlogCard";
import JsonLd from "../../components/JsonLd";
import { blogPosts } from "../data/blogPosts";
import { absoluteUrl, pageMetadata, SITE_NAME, SITE_URL } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Home Service Tips & Guides",
  description:
    "Expert guides on salon, spa, repairs, renovation, and on-demand home services from HomeSewa — Nepal's trusted hyperlocal service platform.",
  path: "/blog",
});

const blogListJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog#blog`,
  name: `${SITE_NAME} Blog`,
  description:
    "Expert guides on salon, spa, repairs, renovation, and on-demand home services from HomeSewa.",
  url: absoluteUrl("/blog"),
  publisher: { "@id": `${SITE_URL}/#organization` },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl(post.image),
  })),
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
      <JsonLd data={blogListJsonLd} />
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">HomeSewa Blog</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Guides and tips on beauty, wellness, home repairs, smart home setup, renovation, and more from HomeSewa.
        </p>
      </section>

      <section className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((blog) => (
            <BlogCard
              key={blog.slug}
              slug={blog.slug}
              title={blog.title}
              description={blog.description}
              image={blog.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
