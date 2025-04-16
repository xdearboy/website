import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start pt-12 px-4 sm:px-6"
      style={{
        background:
          "linear-gradient(108deg, rgba(85, 102, 221, 0.84) 0%, rgba(140, 134, 198, 0.90) 50%, rgba(90, 160, 152, 0.90) 100%)",
      }}
    >
      <div className="w-full max-w-[800px] p-4 sm:p-6 md:p-8 rounded-lg border border-[#9BA3D6] bg-white/50 shadow-[0_0_26px_0_rgba(0,0,0,0.3)]">
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-black hover:opacity-90 active:opacity-80 transition-all duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-bold uppercase font-mono">Блог</span>
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-black font-mono">Пока нет записей в блоге.</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block"
              >
                <div
                  className="p-4 rounded-lg bg-white/60 border border-[#B8C1D3] 
                  hover:scale-[99%] active:scale-[100%] hover:opacity-96 active:opacity-80 hover:shadow-s 
                  transition-all duration-800 cursor-pointer"
                >
                  <h2 className="font-mono font-bold text-lg text-black mb-2">
                    {post.title}
                  </h2>
                  <p className="font-mono text-sm text-black/70 mb-2">
                    {post.date}
                  </p>
                  {post.excerpt && (
                    <p className="font-mono text-black line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
