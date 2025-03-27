import { fetchAPI } from '../lib/api';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string }[];
  };
}

export default async function Page() {
  let posts: Post[];
  try {
    // Thêm _embed để lấy hình ảnh nổi bật
    posts = await fetchAPI('posts?_embed');
  } catch (error) {
    console.error('Error fetching posts:', error);
    return <div className="text-center text-red-500">Lỗi khi tải bài viết từ WordPress: {String(error)}</div>;
  }

  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    return <div className="text-center text-gray-500">Không có bài viết nào để hiển thị</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Blog WordPress Headless</h1>
        </div>
      </header>

      {/* Danh sách bài viết */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            return (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Hình ảnh nổi bật */}
                {featuredImage && (
                  <Image
                    src={featuredImage}
                    alt={post.title.rendered}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                )}
                {/* Nội dung */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
                      {post.title.rendered}
                    </Link>
                  </h2>
                  <div
                    className="text-gray-600 mt-2"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <Link
                    href={`/posts/${post.slug}`}
                    className="mt-4 inline-block text-blue-500 font-medium hover:underline"
                  >
                    Đọc thêm
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer (tùy chọn) */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 My Headless Blog</p>
      </footer>
    </div>
  );
}

export const revalidate = 10;