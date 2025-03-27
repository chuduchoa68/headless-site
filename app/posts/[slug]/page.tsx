import { fetchAPI } from '../../../lib/api';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string }[];
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params để lấy slug
  const { slug } = await params;

  let posts: Post[];
  try {
    posts = await fetchAPI(`posts?slug=${slug}&_embed`);
  } catch (error) {
    console.error('Error fetching post:', error);
    return <div className="text-center text-red-500">Lỗi khi tải bài viết. Vui lòng thử lại sau.</div>;
  }

  const post = posts[0];
  if (!post) {
    return <div className="text-center text-gray-500">Bài viết không tồn tại</div>;
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">{post.title.rendered}</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-md p-8">
          {featuredImage && (
            <div className="mb-8">
              <Image
                src={featuredImage}
                alt={post.title.rendered}
                width={800}
                height={400}
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
          )}
          <div className="text-gray-600 text-base mb-6">
            Đăng ngày: {new Date(post.date).toLocaleDateString('vi-VN')}
          </div>
          <div
            className="prose prose-lg prose-gray max-w-none leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
          <div className="mt-8">
            <Link
              href="/"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Quay lại trang chủ
            </Link>
          </div>
        </article>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>© 2025 My Headless Blog</p>
      </footer>
    </div>
  );
}

export const revalidate = 10;