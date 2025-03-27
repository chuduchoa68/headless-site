const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string }[];
  };
}

export async function fetchAPI(endpoint: string): Promise<Post[]> {
  const url = `${API_URL}/${endpoint}`;
  console.log('Fetching URL:', url); // Log URL để kiểm tra
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('Fetch failed with status:', res.status, res.statusText);
      throw new Error(`Failed to fetch from ${endpoint}`);
    }
    const data = await res.json();
    console.log('Fetch successful, data length:', data.length);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Ném lỗi để hiển thị trên UI
  }
}