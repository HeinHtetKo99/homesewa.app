import Link from "next/link";
import { blogPosts } from "../data/blogPosts";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">HomeSewa Blog</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Stay updated with expert cleaning tips, professional services, and home & office hygiene advice from HomeSewa.
        </p>
      </section>

      <section className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((blog) => (
            <div
              key={blog.slug}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col justify-between h-full">
                <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-4">{blog.description}</p>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-[#0D5D59] font-semibold hover:underline mt-auto"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
