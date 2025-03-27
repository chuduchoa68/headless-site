const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
}

export async function fetchAPI(endpoint: string): Promise<Post[]> {
  const res = await fetch(`${API_URL}/${endpoint}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }
  return await res.json();
}